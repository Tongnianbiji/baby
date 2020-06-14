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
      currentCity: '定位中'
    }
  }

  componentDidShow() {
    this.getLocation().then(info => {
      const city = this.getCurrentCity()
      if (!city) {
        Model.getCityInfo(info.longitude, info.latitude).then(data => {
          const c = data.district || data.city
          this.setState({ currentCity: this.getSubCityName(c) })
          this.setCurrentCity(c)
        })
      } else {
        this.setState({ currentCity: this.getSubCityName() })
      }
      
    }).catch(() => {
      this.setState({ currentCity: '请选择' })
    })
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

  getSubCityName = (name = undefined) => {
    const city = name || this.getCurrentCity() || '请选择'
    return city.length > 3 ? `${city.substr(0, 3)}...` : city
  }

  jump2circle = () => {
    this.navto({ url: '/packageA/pages/circle-detail/index' })
  }
}
