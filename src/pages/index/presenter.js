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
      currentCity: this.getSubCityName()
    }
  }

  componentDidShow() {
    // console.log('index page show...')
    this.setState({ currentCity: this.getSubCityName() })
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

  goSearch() {
    this.navto({url: '/packageA/pages/home-search-panel/index'})
  }

  onLongPressForDebug(){
    this.navto({url:'/test/index'})
  }

  selectCity = () => {
    this.navto({ url: '/packageA/pages/city-picker/index' })
  }

  getSubCityName = () => {
    const city = this.getCurrentCity() || '未知'
    return city.length > 3 ? `${city.substr(0, 3)}...` : city
  }

  jump2circle = () => {
    this.navto({ url: '/packageA/pages/circle-detail/index' })
  }
}
