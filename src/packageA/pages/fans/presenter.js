import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      listData:[],
      postLock:false,
      isToBottom:false,
      showLoading:true,
      pageNum:1,
      isSelf:true
    }
  }

  componentDidMount() {
    const { userId } = this.$router.params;
    if(this.getUserInfo().userId === userId  || !userId){
      this.setState({
        isSelf:true
      })
    }else{
      this.setState({
        isSelf:false
      })
    }
    this.getListData();
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if(prevPage.route === 'pages/message/index'){
      Model.clearMessage('funs')
    }
  }

  onReachBottom(){
    const {postLock, isToBottom} = this.state;
    if(!postLock && !isToBottom){
      this.setState((pre)=>({
        pageNum:pre.pageNum+1
      }),()=>{
        this.getListData()
      })
    }
  }

  //获取粉丝列表
  getListData = async ()=>{
    const {listData,pageNum} = this.state;
    const { userId } = this.$router.params;
    let uid = null;
    if (userId) {
      uid = userId;
    } else {
      uid = this.getUserInfo().userId;
    }
    this.setState({
      postLock:true
    })
    let res = await Model.getData(uid,pageNum);
    this.setState({
      postLock:false
    })
    if(res && res.items){
      const {total,items} = res;
      if (!listData.length) {
        this.setState({
          listData : items || []
        })
        
      } else {
        this.setState((pre)=>({
          listData:pre.listData.concat(items || [])
        }))
      }
      if (total <= this.state.listData.length) {
        this.setState({
          showLoading:false,
          isToBottom:true
        })
      }
    }else{
      // this.showToast('暂无我的粉丝')
    }
  }

  //关注/取消
  handleSubscr = async (model)=>{
    let {postLock,listData} = this.state;
    let preIndex = listData.findIndex(item=>item.userInfo.userId === model.userId)
    if(!postLock){
     if(model.isSubscribe){
       this.setState({
         postLock:true
       })
       let res = await Model.cancelAttentionUser(model.userId);
       this.setState({
         postLock:false
       })
       listData[preIndex].userInfo.isSubscribe = false
       if(res){
         this.showToast('已取消');
       }
     }else{
       this.setState({
         postLock:true
       })
       let res = await Model.attentionUser(model.userId);
       this.setState({
         postLock:false
       })
       listData[preIndex].userInfo.isSubscribe = true
       if(res){
         this.showToast('已关注');
       }
     }
    }
    this.setState({
      listData:listData
    })
   }

   //跳转到个人主页
   getUserDetail =(item)=>{
     this.navto({
      url:'/packageA/pages/profile-home/index?userId=' + item.userId
     })
   }

   //初始化参数
   initData = ()=>{
    this.setState({
      listData:[],
      postLock:false,
      isToBottom:false,
      showLoading:true,
      pageNum:1,
    })
  }
}