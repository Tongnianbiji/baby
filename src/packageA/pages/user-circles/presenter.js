import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      circlesList:[]
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
}