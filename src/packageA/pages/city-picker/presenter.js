import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      anchor: '',
      allcity: Model.allCity,
      letters: Model.getLetter(),
      currentList: Model.allCity,
      currentCity: this.getCurrentCity() || '未设置',
      locationCity: '定位中...'
    }
  }

  componentDidMount() {
    this.doLocation()
    // Model.getData()
  }

  doLocation() {
    this.getLocation().then(info => {
      // console.log(info, '...$$')
      Model.getCityInfo(info.longitude, info.latitude).then(data => {
        // console.log(data, 'nb')
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

  jumpToKey(key) {
    const stat = { anchor: '' }
    if (key === '热门') {
      stat.anchor = '__my_id_letter_hot'
    } else {
      stat.anchor = `__my_id_letter_${key}`
    }
    this.setState(stat)
  }

  goBack = () => {
    this.navback()
  }

  pickCity(city) {
    this.setState({
      currentCity: city
    }, () => {
      this.setCurrentCity(city)
      this.goBack()
    })
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