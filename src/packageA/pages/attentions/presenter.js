import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      listData:[{
        userId:1,
        nickName:'张三',
        createDt:'2019/03/02',
        isSubscr:true,
        funs:10,
        posts:10,
        mark:10,
        child:['大宝两岁一个月','二宝一岁一个月'],
        sex:'MALE'
      }],
      postLock:false,
      isToBottom:false,
      showLoading:true,
      pageNum:1,
    }
  }

  componentDidMount() {
    this.getListData()
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
    let userInfo = this.getUserInfo();
    this.setState({
      postLock:true
    })
    let res = await Model.getData(userInfo.userId,pageNum);
    this.setState({
      postLock:false
    })
    if(res && res.items && res.items.length){
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
    let preIndex = listData.findIndex(item=>item.userId === model.userId)
    if(!postLock){
     if(model.isSubscr){
       this.setState({
         postLock:true
       })
       let res = await Model.cancelAttentionUser(model.userId);
       this.setState({
         postLock:false
       })
       listData[preIndex].isSubscr = false
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
       listData[preIndex].isSubscr = true
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