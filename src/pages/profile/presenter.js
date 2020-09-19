import Taro from '@tarojs/taro'
import BaseComponent from '../../common/baseComponent'
import Model from './model'
import { ERR_MSG } from '../../common/constant';

export default class ProfilePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: {}
    }
  }

  componentDidMount() {
    this.getProfile();
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

  onClickNavTo(type) {
    switch (type) {
      case 'profile-home'://个人主页
        this.navto({ url: '/packageA/pages/profile-home/index' })
        break;

      case 'fans'://粉丝
        this.navto({ url: '/packageA/pages/fans/index' })
        break;
      case 'circle'://圈子
        this.showToast('圈子跳转链接未设置');
        // this.navto({ url: '/packageA/pages/profile-baby/index' })
        break;
      case 'focus'://关注
        this.showToast('关注跳转链接未设置');
        // this.navto({ url: '/packageA/pages/profile-baby/index' })
        break;
      case 'collects'://收赞/获赞
        this.navto({ url: '/packageA/pages/collects/index' })
        break;
      case 'post'://帖子
        this.showToast('帖子跳转链接未设置');
        // this.navto({ url: '/packageA/pages/post/index' })
        break;
      case 'question'://问答
        this.navto({ url: '/packageA/pages/qa-list/index' })
        break;
      case 'family'://我的家
        this.navto({ url: '/packageA/pages/profile-family/index' })
        break;

      case 'baby'://宝宝信息
        this.navto({ url: '/packageA/pages/profile-baby/index' })
        break;
      case 'share'://分享
        this.navto({ url: '/packageA/pages/profile-share/index' })
        break;
      case 'setting'://设置
        this.navto({ url: '/packageA/pages/profile-setting/index' })
        break;
      case 'about'://关于我们
        this.navto({ url: '/packageA/pages/profile-about/index' })
        break;
      case 'contact'://联系我们
        this.navto({ url: '/packageA/pages/profile-contact/index' })
        break;

      default:
        break;
    }
  }
}
