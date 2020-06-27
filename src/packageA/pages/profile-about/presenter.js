import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileAboutPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClickNavTo(type) {
    switch (type) {
      case 'base':
        this.navto({ url: `/packageA/pages/profile-about-base/index` })
        break;
      case 'agreements':
        this.navto({ url: `/packageA/pages/profile-about-agreements/index` })
        break;
      case 'privacy':
        this.navto({ url: `/packageA/pages/profile-about-privacy/index` })
        break;
      default:
        break;
    }
  }
}
