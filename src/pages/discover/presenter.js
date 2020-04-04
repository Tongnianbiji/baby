import BaseComponent from '../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      tags: [],
      activedMenu: 2,
      activedTag: null,
      tagsOpen: false
    }
  }

  componentDidMount() {
    this.getMenus()
    this.getTags()
  }

  getMenus() {
    Model.getMenus().then(ret => {
      this.setState({
        menus: ret.data
      })
    })
  }

  getTags() {
    Model.getTags().then(ret => {
      this.setState({
        activedTag: ret.data[0],
        tags: ret.data
      })
    })
  }

  menuClick({ id }) {
    this.setState({
      activedMenu: id
    })
  }

  troggleTags() {
    this.setState(prevState => ({
      tagsOpen: !prevState.tagsOpen
    }))
  }

  toSearch() {
    this.navto({ url: '/packageA/pages/search-circle/index' })
  }
}