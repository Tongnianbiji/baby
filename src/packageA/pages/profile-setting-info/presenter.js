import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'

export default class ProfileSettingInfoPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickName:'',
      signature:'',
      headImg:'',
      theme:'',
      canSave:false,
      isShowNext:false
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.getWxProfileInfo()
  }

  componentWillUnmount() { }

  componentDidShow() { 
    const {newUser} = this.$router.params;
    if(newUser){
      this.setState({
        isShowNext:true
      })
    }else{
      this.setState({
        isShowNext:false
      })
    }
    this.getProfileInfo();
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
    if(res&&res.nickName){
      this.setState({
        nickName:res.nickName,
        signature:res.signature,
        headImg:res.headImg,
        theme:res.theme
      })
    }
  }

  getWxProfileInfo =()=>{
    const {wxUserInfo} = staticData;
    const {newUser} = this.$router.params;
    if(wxUserInfo.nickName && newUser){
      let res= wxUserInfo;
      this.setState({
        nickName:res.nickName,
        headImg:res.avatarUrl,
      })
    }
  }



  getHeadFile = async (file)=>{
    this.setState({
      headImg:file.url
    })
    let res = await Model.updateHeadImgInfo(file.url);
    if(res){
      this.showToast('更新成功');
    }else{
      this.showToast('系统异常');
    }
  }

  getThemeFile = async (file)=>{
    this.setState({
      theme:file.url
    });
    let res = await Model.updateThemeInfo(file.url);
    if(res){
      this.showToast('更新成功');
    }else{
      this.showToast('系统异常');
    }
  }

  nextStep = ()=>{
    this.navto({
      url:'/packageA/pages/interest/index'
    })
  }

  confrim= ()=>{
    this.navback()
  }
}
