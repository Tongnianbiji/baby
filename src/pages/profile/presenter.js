import Taro from '@tarojs/taro'
import BaseComponent from '../../common/baseComponent'
import Model from './model'

export default class ProfilePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    Model.profile().then((res) => { console.log('res', res); })
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
