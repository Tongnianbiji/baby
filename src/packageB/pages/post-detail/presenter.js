import BaseComponent from '@common/baseComponent'
import React from 'react'
import Model from './model'
import Taro from '@tarojs/taro'
import postDetail from './store/post-detail'
import staticDataStore from '@src/store/common/static-data'
import circleIsReload from '@src/common/utils/circleIsReload'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentModel: {},
      replys: 0,
      postDetail: postDetail,
      reLoad:null,
      statusBarHeight:0,
      isCanEntranceCircle:true,
      isShowBack:true
    }
  }

  componentDidMount() {
    this.showNavLoading()
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]
    if(!prevPage){
      this.setState({
        isShowBack:false
      })
    }else{
      if(prevPage.route === 'packageA/pages/circle-detail/index'){
        this.setState({
          isCanEntranceCircle:false
        })
      }else{
        this.setState({
          isCanEntranceCircle:true,
        })
      }
    }
    this.getInviter()
  }

  componentDidShow() {
    this.getData();
    this.getReplyList();
  }

  componentWillUnmount(){
    const {initPageList} = postDetail;
    initPageList();
    circleIsReload();
  }

  //自定义进入圈子
  entrancePage = ()=>{
    const {cid,cName} = postDetail.detailData;
    this.navto({
      url:`/packageA/pages/circle-detail/index?cid=${cid}&cname=${cName}`
    })
  }

  //回复帖子
  replyPost = (model) => {
    const { postDetail: { getCurrentReplyPostData, updateCurrentplaceholder, updateFocusStatus, updateActiveFocusStatus, updateIsToPostOwnerStatus } } = this.state;
    const { isRegiste } = staticDataStore;
    if (isRegiste) {
      getCurrentReplyPostData(model);
      updateCurrentplaceholder(`回复  ${model.userSnapshot && model.userSnapshot.nickName || '李语婷妈妈'}: ${model.content}`);
      updateIsToPostOwnerStatus(false)
      Taro.navigateTo({
        url: '/packageB/pages/reply-post/index'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }

  }

  //复制帖子内容
  copyContent = () => {
    const { postDetail: { currentReplyPost: { content } } } = this.state;
    Taro.setClipboardData({
      data: content,
      success: function (res) {
        Taro.getClipboardData({
          success: function (res) {
            Taro.showToast({
              title: '复制成功',
              icon: 'success'
            })
          }
        })
      }
    })
  }

  //发帖回复输入
  inputReply = (content) => {
    this.setState((pre) => {
      pre.currentModel.content = content
    })
  }

  //发布回复
  submitReply = async () => {
    const { currentReplyPost, currentReplyPost: { pid, replyId }, updateFocusStatus, updateActiveFocusStatus, files } = this.state.postDetail;
    const { content } = this.state.currentModel
    console.log('content', currentReplyPost)
    const d = await Model.subReply(pid, replyId, content, files);
    if (content) {
      Taro.showLoading();
      if (d) {
        this.getReplyList();
        updateFocusStatus(false);
        updateActiveFocusStatus(false)
        setTimeout(() => {
          Taro.hideLoading();
          Taro.showToast({
            title: '回复成功',
            icon: 'success',
            duration: 2e3
          })
        }, 1e3);
      }
    } else {
      Taro.showToast({
        title: '不能输入为空',
        icon: 'none',
        duration: 2e3
      })
    }
  }

  getInviter(){
    const { updateInviter } = staticDataStore;
    const { inviter } = this.$router.params;
    if(inviter){
      updateInviter(inviter)
    }
  }

  async getData(pid = this.$router.params.pid) {
    const { postDetail: { getDetail } } = this.state;
    const d = await getDetail(pid);
    if (d) {
      this.setState({
        replys: d.replys,
      })
    }
    this.hideNavLoading()
    this.setNavBarTitle(d ? d.cName : '查询失败')
  }

  getReplyList = async (sortType = 1, pid = this.$router.params.pid) => {
    const { postDetail: { getReplyList } } = this.state;
    await getReplyList(sortType, pid);
  }
}