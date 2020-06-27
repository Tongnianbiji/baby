import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileSettingPresenter extends BaseComponent {
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
      case 'logout':
        this.showToast('退出登陆')
        break;
      case 'edit':
        this.navto({ url: `/packageA/pages/profile-setting-info/index` })
        break;
      case 'privacy':
        this.navto({ url: `/packageA/pages/profile-setting-privacy/index` })
        break;
      default:
        break;
    }
  }
}
