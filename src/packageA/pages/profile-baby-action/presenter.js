import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileBabyActionPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: Model.tabs,
      tabsCurrent: 0,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClickNavTo(id) {
    this.navto({ url: `/packageA/pages/profile-baby-detail/index?id=${id}` })
  }

  /**
   * tab 点击
   * @param {Number} value 索引
   */
  onClickForTabs(value) {
    this.setState({
      tabsCurrent: value,
    })
  }
}
