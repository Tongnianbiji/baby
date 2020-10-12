import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      fansList:[]
    }
  }

  componentDidMount() {
    this.getFansList()
  }

  //获取粉丝列表
  getFansList = async ()=>{
    let token = this.isLogin();
    let userInfo = this.getUserInfo();
    

    if(token && userInfo.userId){
      let res = await Model.getData(token,userInfo.userId);
      this.setState({
        fansList:res
      })
    }else{
      this.showToast('请先登录')
    }
  }
}