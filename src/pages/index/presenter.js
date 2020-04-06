import Taro from '@tarojs/taro'
import BaseComponent from '../../common/baseComponent'
import Model from './model'

export default class IndexPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      topTabsCurrent: 0,
      topTabs: Model.topTabs,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClickForTopTab(value) {
    this.setState({
      topTabsCurrent: value,
    })
  }
}
