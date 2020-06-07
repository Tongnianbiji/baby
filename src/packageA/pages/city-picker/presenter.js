import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      anchor: '',
      currentCity: this.getCurrentCity() || '未设置',
      locationCity: '定位中...',
      tabsData: [{ title: '选择省', id: 0 }, { title: '选择市', id: 1 }, { title: '选择区/县', id: 2 }],
      currentTab: 0
    }
  }

  componentDidMount() {
    this.doLocation()
    Model.getCity()
  }

  doLocation() {
    this.getLocation().then(info => {
      Model.getCityInfo(info.longitude, info.latitude).then(data => {
        this.setState({ locationCity: data.city })
      })
    }).catch(() => {
      // console.log(reason, 'sss')
      this.setState({ locationCity: '定位失败' })
    })
  }

  kwChange = e => {
    const kw = e.target.value
    const stat = { currentList: [] }
    if (kw) {
      const newArr = []
      this.state.allcity.map(g => {
        const tmpArr = []
        g.item.map(city => {
          if (city.name.indexOf(kw) > -1) {
            tmpArr.push(city)
          }
        })
        if (tmpArr.length) {
          newArr.push({
            title: g.title,
            type: g.type,
            item: tmpArr
          })
        }
      })
      stat.currentList = newArr
    } else {
      stat.currentList = this.state.allcity
    }
    this.setState(stat)
  }

  goBack = () => {
    this.navback()
  }

  selectedCity(record) {
    const { currentTab } = this.state
    if (currentTab === 0) { // province
      Model.getCity(record.code, 'province')
    } else if (currentTab === 1) { // city
      Model.getCity(record.code, 'city')
    } else { // town
      this.setState({
        currentCity: record
      }, () => {
        this.setCurrentCity(record)
        this.goBack()
      })
    }
  }

  tabChange = currentTab => {
    if (currentTab === 1) {
      this.setState(prevState => {
        const data = prevState.tabsData
        data[0].title = '上海'
        return {
          tabsData: data
        }
      })
    }
    this.setState({ currentTab })
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