import BaseComponent from '@common/baseComponent'
import React from 'react'
import Model from './model'
import Taro from '@tarojs/taro'
import postDetail from './store/post-detail'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentModel: {},
      replys: 0,
      postDetail:postDetail
    }
    
  }
  componentDidMount() {
    this.showNavLoading()
    this.getData()
    this.getReplyList()
  }

  //回复帖子
  replyPost = (model) => {
    const { postDetail:{getCurrentReplyPostData,updateCurrentplaceholder,updateFocusStatus,updateActiveFocusStatus,updateIsToPostOwnerStatus} } = this.state;
    console.log('回帖', model);
    getCurrentReplyPostData(model);
    updateCurrentplaceholder(`回复  李庭语妈妈: ${model.content}`);
    updateFocusStatus(true);
    updateActiveFocusStatus(true);
    updateIsToPostOwnerStatus(false)
  }
  
  //复制帖子内容
  copyContent = () => {
    const { postDetail:{currentReplyPost:{content}} } = this.state;
    Taro.setClipboardData({
      data: content,
      success: function (res) {
        Taro.getClipboardData({
          success: function (res) {
            Taro.showToast({
              title: '复制成功',
              icon:'success'
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
    const { currentReplyPost: { pid, replyId },updateFocusStatus } = this.state.postDetail;
    const {content} = this.state.currentModel
    const d = await Model.subReply(pid, replyId, content);
    Taro.showLoading();
    if (d) {
      this.getReplyList();
      updateFocusStatus(false);
     setTimeout(() => {
       Taro.hideLoading()
       Taro.showToast({
        title: '回复成功',
        icon: 'success',
        duration:2e3
      })
     }, 1e3);
      
     
      
    }
  }


  async getData(pid = this.$router.params.pid) {
    const { postDetail: { getDetail } } = this.state;
    const d = await getDetail(pid);
    if (d) {
      this.setState({
        replys: d.replys,
        // currentModel:d
      })
    }
    this.hideNavLoading()
    this.setNavBarTitle(d ? d.cName : '查询失败')
  }

  getReplyList = async (sortType = 1, pid = this.$router.params.pid) => {
    const { postDetail:{getReplyList} } = this.state;
    await getReplyList(sortType, pid);
  }
}