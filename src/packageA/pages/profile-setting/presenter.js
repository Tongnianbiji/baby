import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import Storage from '@common/localStorage'
import staticData from '@src/store/common/static-data'

export default class ProfileSettingPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      headImg:''
    }
    this.storage = Storage.getInstance()
  }

  componentWillMount() { }

  componentDidMount() { 
    const {headImg} = this.$router.params;
    this.setState({
      headImg:headImg
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClickNavTo(type) {
    const {updateIsLoginStatus} = staticData;
    switch (type) {
      case 'logout':
        this.storage.setToken('');
        updateIsLoginStatus(false);
        this.showToast('退出登陆');
        this.navback();
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
