import BaseComponent from '../../../common/baseComponent';
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setNavigationBarTitle()
  }

  /**
   * 根据name设置nav bar title
   */
  setNavigationBarTitle() {
    const { name, id } = this.$router.params;
    wx.setNavigationBarTitle({
      title: name
    })
  }
}