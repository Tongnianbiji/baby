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

  toFans = () => {
    this.navto({ url: '/packageA/pages/fans/index' })
  }

  toPostReply = () => {
    this.navto({ url: '/packageA/pages/postReply/index' })
  }

  toQaList = () => {
    this.navto({ url: '/packageA/pages/qa-list/index' })
  }

  toCollect = () => {
    this.navto({ url: '/packageA/pages/collects/index' })
  }

  toSysMessage = () => {
    this.navto({ url: '/packageA/pages/system-message/index' })
  }
}