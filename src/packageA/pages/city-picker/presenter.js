import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentCity: this.getCurrentCity() || '未设置',
      locationCity: '定位中...',
      tabsData: [{ title: '选择省', useable: false }, { title: '选择市', useable: false }, { title: '选择区/县', useable: false }],
      currentTab: 0,
      provinceData: [],
      cityData: [],
      townData: [],
      searchResult: null
    }
    this.timer = null
  }

  componentDidMount() {
    this.doLocation()
    this.showNavLoading()
    Model.getCity().then(ret => {
      if (ret.code === 0) {
        const d = this.state.tabsData
        d[0].useable = true
        this.setState({
          provinceData: ret.data,
          tabsData: d
        })
      }
      this.hideNavLoading()
    })
  }

  doLocation() {
    this.getLocation().then(info => {
      Model.getCityInfo(info.longitude, info.latitude).then(data => {
        this.setState({ locationCity: data.district || data.city })
      })
    }).catch(() => {
      this.setState({ locationCity: '定位失败' })
    })
  }

  kwChange = e => {
    const kw = e.target.value
    clearTimeout(this.timer)
    if (kw) {
      this.timer = setTimeout(() => {
        Model.searchCity(kw).then(({ code, data }) => {
          if (code === 0 && data.length) {
            this.setState({
              searchResult: data
            })
          }
        })
      }, 300)
    } else {
      this.setState({
        searchResult: null
      })
    }
  }

  goBack = () => {
    this.navback()
  }

  selectedCity(record) {
    const { currentTab } = this.state
    if (currentTab === 0) { // province
      const prevData = this.state.tabsData
      prevData[0].title = record.name
      prevData[1].title = '选择市'
      prevData[1].useable = false
      prevData[2].title = '选择区/县'
      prevData[2].useable = false
      this.setState({
        tabsData: prevData,
        currentTab: 1,
        cityData: [],
        townData: []
      })
      this.showNavLoading()
      Model.getCity(record.code, 'province').then(({ code, data }) => {
        if (code === 0) {
          prevData[1].useable = true
          this.setState({
            cityData: data,
            tabsData: prevData
          })
        }
        this.hideNavLoading()
      })
    } else if (currentTab === 1) { // city
      const prevData = this.state.tabsData
      prevData[1].title = record.name
      prevData[2].title = '选择区/县'
      prevData[2].useable = false
      this.setState({
        tabsData: prevData,
        currentTab: 2
      })
      this.showNavLoading()
      Model.getCity(record.code, 'city').then(({ code, data }) => {
        if (code === 0) {
          prevData[2].useable = true
          this.setState({
            townData: data,
            tabsData: prevData
          })
        }
        this.showNavLoading()
      })
    } else { // town
      this.pickCity(record.name)
    }
  }

  pickCity = city => {
    this.setState({
      currentCity: city
    }, () => {
      this.setCurrentCity(city)
      this.goBack()
    })
  }

  tabChange = currentTab => {
    const { provinceData, cityData, townData } = this.state
    if (currentTab === 0) {
      if (provinceData.length) {
        this.setState({ currentTab })
      }
    } else if (currentTab === 1) {
      if (cityData.length) {
        this.setState({ currentTab })
      }
    } else if (currentTab === 2) {
      if (townData.length) {
        this.setState({ currentTab })
      }
    }
  }

  reLocation = () => {
    const {locationCity} = this.state
    if (locationCity === '定位失败') {
      this.hasPermission('scope.userLoaction').then(ok => {
        if (ok) {
          this.doLocation()
        } else {
          this.showToast('没有定位权限')
        }
      })
    } else {
      this.pickCity(locationCity)
    }
  }
}