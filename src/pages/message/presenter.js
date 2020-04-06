import BaseComponent from '../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      tabList: Model.tabsList,
      currentTab: 0
    }
  }

  getMessage() {
    Model.getMessage()
  }

  tabChange = index => {
    this.setState({ currentTab: index })
  }
}