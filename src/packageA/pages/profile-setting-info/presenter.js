import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'
import getSex from '@common/utils/roleToSex'
import model from '../plot/model'

export default class ProfileSettingInfoPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickName:'',
      signature:'',
      headImg:'',
      theme:'',
      canSave:false,
      isShowNext: false,
      selectedPlot: '',
      plotName: '',
    }
  }

  componentWillMount() { }

  componentDidMount() {
    const {wxInfo} = this.$router.params;
    const { wxUserInfo, sex, role, selectedPlot } = staticData;
    // console.log('*****',wxUserInfo,sex,role)
    if(wxInfo){
      this.getWxProfileInfo()
    }else{
      this.getProfileInfo()
    }
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
  }

  componentDidHide() { }

  onClickNavTo(type) {
    // const {nickName,signature} = this.state;
    const {nickName,signature} = staticData;
    switch (type) {
      case 'nickname':
        this.navto({ url: `/packageA/pages/profile-setting-info-nickname/index?nickName=${nickName}` })
        break;
      case 'signature':
        this.navto({ url: `/packageA/pages/profile-setting-info-signature/index?signature=${signature}` })
        break;
      case 'plot':
        this.navto({ url: `/packageA/pages/plot/index` })
        break;
      default:
        break;
    }
  }

  
  getProfileInfo = async ()=>{
    const uid = this.getUserInfo().userId;
    const token = this.isLogin();
    const {updateNickName,updateSignature} = staticData;
    let res = await Model.getProfileInfo(token,uid);
    if(res&&res.nickName){
      updateNickName(res.nickName);
      updateSignature(res.signature);
      this.setState({
        // nickName:res.nickName,
        // signature:res.signature,
        headImg:res.headImg,
        theme: res.theme,
        plotName: res.plotName,
      })
    }
  }

  getWxProfileInfo =()=>{
    const {wxUserInfo,updateNickName,updateSignature} = staticData;
    const {newUser} = this.$router.params;
    if(wxUserInfo.nickName && newUser){
      let res= wxUserInfo;
      updateNickName(res.nickName);
      updateSignature(res.signature);
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
    let url = await Model.getOssUrl(file.url);
    let res = await Model.updateHeadImgInfo(url);
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

  nextStep = async ()=>{
    const {nickName,signature,role} = staticData;
    const {headImg} = this.state;
    const headUrl = await Model.getOssUrl(headImg);
    await Model.updateInfo(headUrl,nickName,signature,getSex(role));
    this.navto({
      url:'/packageA/pages/interest/index'
    })
  }

  confrim = async () => {
    let p = null;
    if (!this.state.isShowNext) {
      p= Model.updatePlotInfo(staticData.selectedPlot.plotId);
    } else {
      p = Promise.resolve(true);
    }
    p.then(res => {
      if (res) {
        // this.showToast('更新成功');
        staticData.setSelectedPlot({});
        this.navback()
      } else {
        this.showToast('系统异常');
      }
    })
  }
}
