import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      attentionsList:[]
    }
  }

  componentDidMount() {
    this.getFansList()
  }

  //获取关注列表
  getFansList = async ()=>{
    let token = this.isLogin();
    let userInfo = this.getUserInfo();
    

    if(token && userInfo.userId){
      let res = await Model.getData(token,userInfo.userId);
      this.setState({
        attentionsList:res
      })
    }else{
      this.showToast('请先登录')
    }
  }
}