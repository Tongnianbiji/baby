import Taro, {getCurrentInstance} from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileHomePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: Model.tabs,
      tabsCurrent: 0,
      userInfo:{
        nickName:'小于妈妈',
        headImg:'#',
        sex:'FEMALE',
        flow:0,
        funs:0,
        circle:0,
        marked:0,
        stared:0
      }
    }
  }

  componentWillMount() { }

  componentDidMount() {
    
   }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * tab 点击
   * @param {Number} value 索引
   */
  onClickForTabs(value) {
    this.setState({
      tabsCurrent: value,
    })
  }

  //获取个人信息
  getProfileInfo = async ()=>{
    const { userId } = getCurrentInstance().router.params;
    let token = this.isLogin();
    if(userId){
      let res = await Model.getData(token,userId);
      this.setState({
        userInfo:res
      })
    }else{
      let uid = this.getUserInfo().userId;
      let res = await Model.getData(token,uid);
      this.setState({
        userInfo:res
      })
    }
  }
}
