import BaseComponent from '../../common/baseComponent'
import Model from './model'

/**
 * 只写业务逻辑, 和view分离
 */
export default class SplashPresenter extends BaseComponent {
  constructor(props) {
      super(props);
  }

  config = {
    navigationBarTitleText: '开屏欢迎页'
  }

  componentDidMount() {
    Model.getAdminData().then(data => {
      this.setState({ dataList: data })
    })
  }
}