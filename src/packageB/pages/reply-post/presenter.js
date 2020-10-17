import BaseComponent from '@common/baseComponent'
import Model from './model'
import Taro from '@tarojs/taro'
import postDetailData from '../post-detail/store/post-detail'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      files: []
    }
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
    
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

  contentInput = (e)=>{
    this.setState({
      content:e.detail.value
    },()=>{
      this.setState({
        canSave:!!this.state.content
      })
    })
  }

  async doSubmit() {
    const { currentReplyPost, currentReplyPost: { pid, replyId }, updateFocusStatus, updateActiveFocusStatus, files } = postDetailData;
    const content = this.state.content;
    const d = await Model.subReply(pid, replyId, content, files);
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