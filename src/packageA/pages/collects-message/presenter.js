import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabList: Model.tabList,
      currentTab: 0
    }
  }

  componentDidMount() {
    // Model.getData()
  }

  tabChange = index => {
    this.setState({ currentTab: index })
  }
}