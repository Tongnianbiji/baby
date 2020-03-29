import BaseComponent from '../../common/baseComponent'
import Model from './model'

export default class HomePage extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      topTabs: Model.tabConfig.top,
      currentTopTab: 0
    }
  }

  topTabChange = (current) => {
    this.setState({
      currentTopTab: current
    })
  }
}