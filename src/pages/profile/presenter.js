import Taro from '@tarojs/taro'
import BaseComponent from '../../common/baseComponent'
import Model from './model'
import { ERR_MSG } from '../../common/constant';
import staticData from '@src/store/common/static-data'

export default class ProfilePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: {},
      isLogin:false
    }
  }

  componentDidMount() {
    this.getProfile();
  }
  componentDidShow(){
    const {isLogin} = staticData
    this.setState({
      isLogin:isLogin
    })
  }

  getProfile() {
    this.showLoading();
    Model.profile().then((ret) => {
      if (!ret.code) {
        this.hideLoading();
        this.setState({ profileInfo: ret.data });
      }
      else {
        this.hideLoading();
        this.showToast(ERR_MSG);
      }
    })
  }

  login = ()=>{
    this.navto({
      url:'/pages/login/index'
    })
  }

  onClickNavTo(type) {
    const {isLogin} = staticData
    switch (type) {
      case 'profile-home'://个人主页
        this.navto({ url: '/packageA/pages/profile-home/index' })
        break;
      case 'fans'://粉丝
        this.navto({ url: '/packageA/pages/fans/index' })
        break;
      case 'circle'://圈子
         this.navto({ url: '/packageA/pages/user-circles/index' })
        break;
      case 'focus'://关注
         this.navto({ url: '/packageA/pages/attentions/index' })
        break;
     
      case 'collects-message'://被收赞/点赞
        this.showToast('暂不支持跳转')
        //this.navto({ url: '/packageA/pages/collects-message/index' })
        break;
      case 'collects'://收赞/获赞
        if(isLogin){
          this.navto({ url: '/packageA/pages/collects/index' })
        }else{
          this.showToast('请先登录')
        }
        break;
      case 'mypost'://帖子
        if(isLogin){
          this.navto({ url: '/packageB/pages/my-post/index' })
        }else{
          this.showToast('请先登录')
        }
        break;
      case 'question'://问答
        if(isLogin){
          this.navto({ url: '/packageA/pages/qa-list/index' })
        }else{
          this.showToast('请先登录')
        }
        break;
      case 'family'://我的家
        if(isLogin){
          this.navto({ url: '/packageA/pages/profile-family/index' })
        }else{
          this.showToast('请先登录')
        }
        break;

      case 'baby'://宝宝信息
        if(isLogin){
          this.navto({ url: '/packageA/pages/profile-baby/index' })
        }else{
          this.showToast('请先登录')
        }
        break;
      case 'share'://分享
        this.navto({ url: '/packageA/pages/profile-share/index' })
        break;
      case 'setting'://设置
        if(isLogin){
          this.navto({ url: '/packageA/pages/profile-setting/index' })
        }else{
          this.showToast('请先登录')
        }
        break;
      case 'about'://关于我们
        this.navto({ url: '/packageA/pages/profile-about/index' })
        break;
      case 'contact'://联系我们
        this.navto({ url: '/packageA/pages/profile-contact/index' })
        break;
      case 'mypost': //我的帖子
        this.navto({ url: '/packageB/pages/my-post/index' })
        break;
      default:
        break;
    }
  }
}
