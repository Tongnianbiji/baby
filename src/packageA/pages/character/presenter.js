import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'

export default class CharacterPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      topTabsCurrent: 0,
      subTabsCurrent: 0,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  topTabhandleClick(value) {
    this.setState({
      topTabsCurrent: value
    })
  }

  subTabsHandleClick(value) {
    this.setState({
      subTabsCurrent: value
    })
  }
}
