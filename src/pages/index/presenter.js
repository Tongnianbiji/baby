import BaseComponent from '../../common/baseComponent'
import React from 'react'
import Model from './model'
import staticData from '../../store/common/static-data'
export default class HomePage extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      topTabs: Model.tabConfig.top,
      currentTopTab: 1,
      attentionType: 1, //1: 关注的用户   2: 关注的圈子
      hotTabType: 1, //1: 24小时   2: 7天
      currentCity: this.getCurrentCity(),
      tabId:110000
    }
  }

  componentDidMount(){}

  componentDidShow() {
    // this.getLocation().then(info => {
    //   const city = this.getCurrentCity()
    //   if (!city) {
    //     Model.getCityInfo(info.longitude, info.latitude).then(data => {
    //       const c = data.district || data.city
    //       console.log('c',c)
    //       this.setState({ currentCity: this.getSubCityName(c) })
    //       this.setCurrentCity(c)
    //     })
    //   } else {
    //     this.setState({ currentCity: this.getSubCityName() })
    //   }
      
    // }).catch(() => {
    //   this.setState({ currentCity: '请选择' })
    // })
    console.log('当前城市',this.getCurrentCity());
    const { 
      lat,
      lon,
      provinceCode,
      cityCode,
      countryCode
    } = this.getCurrentLocation();
    const {tabId} = this.state;
    getApp().sensors.registerApp({
      lat:lat,
      lon:lon,
      provinceCode:provinceCode,
      cityCode:cityCode,
      countryCode:countryCode,
      tabId:tabId,
      uid:this.getUserInfo().userId || 'guest'
    })
    this.setState({
      currentCity:this.getCurrentCity()
    })
  }

  topTabChange = (current) => {
    console.log('当前',current)
    const { attentionType,hotTabType} =this.state;
    let tabId = null;
    switch(current){
      case 0:
        if(attentionType ===1){
          tabId=100100;
        }
        else if(attentionType ===2){
          tabId=100204;//目前关注圈子只有圈子（其他暂时隐藏）
        }
        break;
      case 1:
        tabId=110000;
        break;
      case 2:
        if(hotTabType ===1){
          tabId=130100;
        }
        else if(hotTabType ===2){
          tabId=130200;
        }
        break;
    }
    this.setState({
      currentTopTab: current,
      tabId:tabId
    },()=>{
      //const {tabId} = this.state;
      getApp().sensors.registerApp({
        tabId:tabId,
        eventType:2
      })
    })
  }

  attentionTabChange = attentionType => {
    let tabId = null;
    this.setState({ attentionType },
      ()=>{
        if(attentionType === 1){
          this.getAttentionUsers()
        }
      })
      if(attentionType ===1){
        tabId=100100;
        this.setState({
          tabId:100100
        })
      }
      else if(attentionType ===2){
        tabId=100204;
        this.setState({
          tabId:100204//目前关注圈子只有圈子（其他暂时隐藏）
        })
      }
      getApp().sensors.registerApp({
        tabId:tabId,
        eventType:2
      })
  }

  hotTabChange = hotTabType => {
    let tabId = null;
    this.setState({ hotTabType })
    if(hotTabType ===1){
      tabId=130100;
      this.setState({
        tabId:130100
      })
    }
    else if(hotTabType ===2){
      tabId=130200;
      this.setState({
        tabId:130200
      })
    }
    getApp().sensors.registerApp({
      tabId:tabId,
      eventType:2
    })
  }

  goSearch = () => {
    this.navto({url: '/packageA/pages/home-search-panel/index?searchScope=all'})
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

  getAttentionUsers = async()=>{
    let userId = this.getUserInfo().userId;
    await Model.getAttentionUsers(userId)
  }
}
