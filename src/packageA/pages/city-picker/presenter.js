import React from 'react'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.locationStatus = {
      Locating: '定位中...',
      LocationFaild: '定位失败'
    }

    this.state = {
      currentCity: this.getCurrentCity() || '未设置',
      locationCity: this.locationStatus.Locating,
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
      this.setState({ locationCity: this.locationStatus.LocationFaild })
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

  async selectedCity(record) {
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
        console.log('****',record,record.code)
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
        this.hideNavLoading()
      })
    } else { // town
      record.center.split(',')
      await Model.updateCityInfo({
        districtCode:record.code,
        districtName:record.name,
        lat:record.center.split(',')[1],
        lng:record.center.split(',')[0],
      })
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
    if (locationCity === this.locationStatus.LocationFaild) {
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

  onOpenSettings = ({ detail }) => {
    if (detail && detail.errMsg === 'openSetting:ok') {
      const reTry = detail.authSetting['scope.userLocation']
      if (reTry) {
        this.doLocation()
      }
    }
  }

  selectedSearchCity = async (e)=>{
    e.center.split(',')
    await Model.updateCityInfo({
      districtCode:e.code,
      districtName:e.name,
      lat:e.center.split(',')[1],
      lng:e.center.split(',')[0],
    })
    this.pickCity(e.name)
  }
}