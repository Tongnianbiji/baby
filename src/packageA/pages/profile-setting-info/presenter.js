import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileSettingInfoPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickName:'小净妈妈',
      signature:'家有两只吞金兽',
      headImg:'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/male.png',
      theme:'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/male.png',
      canSave:false
    }
  }

  componentWillMount() { }

  componentDidMount() {}

  componentWillUnmount() { }

  componentDidShow() { 
    this.getProfileInfo()
  }

  componentDidHide() { }

  onClickNavTo(type) {
    const {nickName,signature} = this.state;
    switch (type) {
      case 'nickname':
        this.navto({ url: `/packageA/pages/profile-setting-info-nickname/index?nickName=${nickName}` })
        break;
      case 'signature':
        this.navto({ url: `/packageA/pages/profile-setting-info-signature/index?signature=${signature}` })
        break;
      default:
        break;
    }
  }

  
  getProfileInfo = async ()=>{
    const uid = this.getUserInfo().userId;
    const token = this.isLogin();
    let res = await Model.getProfileInfo(token,uid);
    if(res){
      this.setState({
        nickName:res.nickName,
        signature:res.signature,
        headImg:res.headImg,
        theme:res.theme
      })
    }
  }
  nextStep = ()=>{
    this.navto({
      url:'/packageA/pages/interest/index'
    })
  }
}
