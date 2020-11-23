import BaseComponent from '@common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      replyData:[],
      postLock:false,
      isReplyToBottom:false,
      showReplyLoading:true,
      replyPageNum:1
    }
  }

  componentDidMount() {
   this.getMyReplyData();
   Model.clearMessage('reply')
  }
  
  componentDidShow(){}

  onReachBottom(){
    const {postLock,isReplyToBottom} = this.state;
    if(!postLock && !isReplyToBottom){
      this.setState((pre)=>({
        replyPageNum:pre.replyPageNum+1
      }),()=>{
        this.getMyReplyData()
      })
    }
  }

  //初始化参数
  initData = ()=>{
    this.setState({
      replyData:[],
      postLock:false,
      isReplyToBottom:false,
      showReplyLoading:true,
      replyPageNum:1
    })
  }


  //获取我的回复数据
  getMyReplyData = async ()=>{
    const {replyData,replyPageNum} = this.state;
    const {userId} = this.getUserInfo();
    this.setState({
      postLock:true
    })
    let res = await Model.getReplyData(userId,replyPageNum);
    this.setState({
      postLock:false
    })
    if(res && res.items){
      const {total,items} = res;
      if (!replyData.length) {
        this.setState({
          replyData : items || []
        })
        
      } else {
        this.setState((pre)=>({
          replyData:pre.replyData.concat(items || [])
        }))
      }
      if (total <= this.state.replyData.length) {
        this.setState({
          showReplyLoading:false,
          isReplyToBottom:true
        })
      }
    }
  }

   //点击帖子详情
   handlePostDetail(pid) {
    this.navto({
      url:'/packageB/pages/post-detail/index?pid='+pid
    })
  }
}