import BaseComponent from '@common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [{ title: '我的帖子' }, { title: '我的回复' }],
      currentTab: 0,
      postData:[],
      replyData:[],
      postLock:false,
      isPostToBottom:false,
      isReplyToBottom:false,
      showPostLoading:true,
      showReplyLoading:true,
      postPageNum:1,
      replyPageNum:1
    }
  }

  componentDidMount() {
   this.getMyPostData()
  }
  
  componentDidShow(){}

  onReachBottom(){
    const {postLock, isPostToBottom,isReplyToBottom,currentTab} = this.state;
    if(currentTab ===0){
      if(!postLock && !isPostToBottom){
        this.setState((pre)=>({
          postPageNum:pre.postPageNum+1
        }),()=>{
          this.getMyPostData()
        })
      }
    }else{
      if(!postLock && !isReplyToBottom){
        this.setState((pre)=>({
          replyPageNum:pre.replyPageNum+1
        }),()=>{
          this.getMyReplyData()
        })
      }
    }
  }

  tabChange = index => {
    this.setState({ currentTab: index });
    this.initData();
    if(index ===0 ){
      this.getMyPostData()
    }else{
      this.getMyReplyData()
    }
  }

  //初始化参数
  initData = ()=>{
    const {currentTab} = this.state;
    if(currentTab === 0){
      this.setState({
        postData:[],
        postLock:false,
        isPostToBottom:false,
        showPostLoading:true,
        postPageNum:1,
      })
    }else{
      this.setState({
        replyData:[],
        postLock:false,
        isReplyToBottom:false,
        showReplyLoading:true,
        replyPageNum:1
      })
    }
  }

  //获取我的帖子数据
  getMyPostData = async ()=>{
    const {postData,postPageNum} = this.state;
    const {userId} = this.getUserInfo();
    this.setState({
      postLock:true
    })
    let res = await Model.getPostData(userId,postPageNum);
    this.setState({
      postLock:false
    })
    if(res && res.items && res.items.length){
      const {total,items} = res;
      if (!postData.length) {
        this.setState({
          postData : items || []
        })
        
      } else {
        this.setState((pre)=>({
          postData:pre.postData.concat(items || [])
        }))
      }
      if (total <= this.state.postData.length) {
        this.setState({
          showPostLoading:false,
          isPostToBottom:true
        })
      }
    }else{
      // this.showToast('暂无我的帖子')
    }
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
    if(res && res.items && res.items.length){
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
    }else{
      // this.showToast('暂无我的回复')
    }
  }

   //点击帖子详情
   handlePostDetail(pid) {
    this.navto({
      url:'/packageB/pages/post-detail/index?pid='+pid
    })
  }
}