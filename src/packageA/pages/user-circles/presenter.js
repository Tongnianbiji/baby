import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      circlesList:[],
      postLock:false
    }
  }

  componentDidMount() {
    this.getCirclesList()
  }

  //获取关注圈子列表
  getCirclesList = async ()=>{
    let userInfo = this.getUserInfo();
    if(userInfo.userId){
      let res = await Model.getData(userInfo.userId);
      this.setState({
        circlesList:res.items
      })
    }else{
      this.showToast('请先登录')
    }
  }

  //更新圈子状态
  onUpdateCircle = async (model)=>{
   let {postLock,circlesList} = this.state;
   let preIndex = circlesList.findIndex(item=>item.cid === model.cid)
   if(!postLock){
    if(model.isSubscribe){
      this.setState({
        postLock:true
      })
      let res = await Model.leaveCircle(model.cid);
      this.setState({
        postLock:false
      })
      circlesList[preIndex].isSubscribe = false
      if(res){
        this.showToast('已离开');
      }
    }else{
      this.setState({
        postLock:true
      })
      let res = await Model.joinCircle(model.cid);
      this.setState({
        postLock:false
      })
      circlesList[preIndex].isSubscribe = true
      if(res){
        this.showToast('已加入');
      }
    }
   }
   this.setState({
    circlesList:circlesList
   })
  }

  getCircleDetail =(model)=>[
    this.navto({
      url:'/packageA/pages/circle-detail/index?cid=' + model.cid
    })
  ]
}