import BaseComponent from '../../common/baseComponent'
import Model from './model'

export default class HomePage extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      topTabs: Model.tabConfig.top,
      currentTopTab: 0,
      attentionType: 1, //1: 关注的用户   2: 关注的圈子
      hotTabType: 1, //1: 24小时   2: 7天
    }
  }

  topTabChange = (current) => {
    this.setState({
      currentTopTab: current
    })
  }

  attentionTabChange = attentionType => {
    this.setState({ attentionType })
  }

  hotTabChange = hotTabType => {
    this.setState({ hotTabType })
  }
}