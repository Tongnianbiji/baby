import BaseComponent from '@common/baseComponent'
import Model from './model'
import Taro from '@tarojs/taro'
import postDetailData from '../post-detail/store/post-detail'
import staticData from '@src/store/common/static-data'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      files: []
    }
    this.circleList = [];
    this.circleTriggerStr = '[]';
  }

  componentDidShow() {
    if (staticData.tempCircleItem) {
      this.circleList.push(staticData.tempCircleItem);
      let content = this.state.content;
      this.setState({
        content: content.replace(this.circleTriggerStr, `[${staticData.tempCircleItem.name}]`),
      })
    }
    staticData.setTempCircleItem(null);
  }

  // copyContent = () => {
  //   const { currentReplyPost: { content } } = postDetail;
  //   Taro.setClipboardData({
  //     data: content,
  //     success: function (res) {
  //       Taro.getClipboardData({
  //         success: function (res) {
  //           Taro.showToast({
  //             title: '复制成功',
  //             icon: 'success'
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

  // handleLike = async () => {
  //   const { handleLike } = postDetail;
  //   handleLike()
  // }

  // handleDisLike = async () => {
  //   const { handleDisLike } = postDetail;
  //   handleDisLike()

  // }

  report = () => {
    const {currentReplyPost,isToPostOwner} = postDetailData;
    console.log(isToPostOwner);
    if(isToPostOwner){
      Taro.navigateTo({
        url:'/packageB/pages/report/index?contentType=1&pid=' + currentReplyPost.pid
      })
    }else{
      Taro.navigateTo({
        url:'/packageB/pages/report/index?contentType=2&replyId=' + currentReplyPost.replyId
      })
    }
    
  }


  getFiles = (file) => {
    const {getFilesData} = postDetailData
    getFilesData(file);
  }

  contentInput = (e) => {
    const value = e.detail.value;
    if (value.indexOf(this.circleTriggerStr) > -1) {
      Taro.navigateTo({
        url: '/packageA/pages/user-circles/index?mode=select'
      })
    }

    this.setState({
      content:value
    },()=>{
      this.setState({
        canSave:!!this.state.content
      })
    })
  }

  async doSubmit() {
    const { currentReplyPost, currentReplyPost: { pid, replyId }, updateFocusStatus, updateActiveFocusStatus, files } = postDetailData;
    const content = this.state.content;
    const p = /\[(.*?)\]/g;
    const replaceValue = content.replace(p, (item, $1) => {
      const circleItem = this.circleList.find(item => item.name == $1);
      return `_##_${JSON.stringify({
        name: circleItem.name,
        cid: circleItem.cid,
      })}_##_`
    })

    const d = await Model.subReply(pid, replyId, replaceValue, files);
    if (content) {
      Taro.showLoading();
      if (d.code === 0) {
        //this.getReplyList();
        // updateFocusStatus(false);
        // updateActiveFocusStatus(false)
        setTimeout(() => {
          Taro.hideLoading();
          setTimeout(() => {
            Taro.navigateBack()
          }, 2000)
          Taro.showToast({
            title: '回复成功',
            icon: 'success',
            duration: 2e3
          })
        }, 1e3);
      }else{
        Taro.hideLoading();
        Taro.showToast({
          title: `${d.message}`,
          icon: 'none',
          duration: 2e3
        })
      }
    } else {
      Taro.showToast({
        title: '不能输入为空',
        icon: 'none',
        duration: 2e3
      })
    }
  }
}