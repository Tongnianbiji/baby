import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileSettingInfoPresenter extends BaseComponent {
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
      case 'nickname':
        this.navto({ url: `/packageA/pages/profile-setting-info-nickname/index` })
        break;
      case 'signature':
        this.navto({ url: `/packageA/pages/profile-setting-info-signature/index` })
        break;
      default:
        break;
    }
  }
}
