import BaseComponent from '../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      tags: [],
      circles: [],
      activedMenu: null,
      activedTag: null,
      tagsOpen: false,
    }
  }

  componentDidMount() {
    this.getMenus()
  }

  /**
   * 一级
   */
  getMenus() {
    Model.getMenus().then(ret => {
      this.setState({
        menus: ret.data,
        activedMenu: ret.data && ret.data.length && ret.data[0]
      }, () => { this.getTags() })
    })
  }

  /**
   * 二级
   * @param {*} sid 
   */
  getTags() {
    const { sid } = this.state.activedMenu;
    Model.getTags({ sid }).then(ret => {
      this.setState({
        tags: ret.data,
        activedTag: ret.data && ret.data.length && ret.data[0],
      }, () => {
        this.getCircles()
      })
    })
  }

  /**
   * 列表
   * @param {*} param0 
   */
  getCircles() {
    const { activedMenu, activedTag } = this.state;
    const param = { psid: activedMenu.sid, sid: activedTag.sid, cid: 0 };
    Model.getCircle(param).then(ret => {
      this.setState({ circles: ret.data.circles })
    })
  }

  menuClick(menu) {
    this.setState({
      activedMenu: menu
    }, () => { this.getTags(menu) })
  }

  tagsClick(tag) {
    this.setState({
      activedTag: tag
    }, () => { this.getCircles() })
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