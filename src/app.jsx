import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { Provider } from 'mobx-react'
import BaseComponent from '@common/baseComponent'
import { setGlobalData } from './global_data'
import GoEasy from './libs/goeasy-1.0.17'
import BaseRequest from '@common/baseRequest'
import { GMAP_API_KEY } from '@common/constant'
import circleDetailStore from './store/circle-detail'
import staticDataStore from './store/common/static-data'
import { USER_INFO_KEY_USERID } from '@common/constant'
import Storage from '@common/localStorage'
import './app.scss'

const request = new BaseRequest()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  circleDetailStore,
  staticDataStore
}

class App extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      isGuide:false
    }
    this.storage = Storage.getInstance()
  }
  componentDidMount() {
    // console.log('app did mounted')
    // Taro.login().then(({ errMsg, code }) => {
    //   console.log('code', code)
    //   if (errMsg === 'login:ok') {
    //     setGlobalData('loginCode', code)
    //   }
    // })

    new GoEasy({
      host: 'hangzhou.goeasy.io',
      appkey: 'BC-d71d87e7f5f54b519e77da2c5a1e1bba',
      onConnected() {
        console.log('连接成功')
      },
      onDisconnected() {
        console.log('断开连接')
      },
      onConnectFailed(error) {
        console.log('连接失败', error)
      }
    })
  }

  componentDidShow() {
    this.isRegiest();
  }

  componentDidHide() { }

  componentDidCatchError() { }

  //判断是否是游客还是用户
  isRegiest = () => {
    const {updateIsRegisteStatus, updateIsLoginStatus} = staticDataStore;
    Taro.login().then(({ errMsg, code }) => {
      console.log('code', code);
      request.get('/user/checkregist',{code}).then((e)=>{
        const {userId,token,regist} = e.data.data;
        
        if(regist){
          updateIsRegisteStatus(true);
          updateIsLoginStatus(true);
          this.storage.setToken(token);
          this.storage.setValue(USER_INFO_KEY_USERID, userId)
        }else{
          this.guideRegiste();
          updateIsRegisteStatus(false);
          updateIsLoginStatus(false);
        }
      })
      //本地模拟
      this.getCurrentLocation();
      // Taro.showModal({
      //   title: '测试使用',
      //   content: '登陆模式',
      //   cancelText: '用户',
      //   confirmText: '游客',
      //   success: (res) => {
      //     if (res.confirm) {//游客模式
      //       this.guideRegiste();
      //       updateIsRegisteStatus(false);
      //     } else if (res.cancel) {//用户模式
      //       updateIsRegisteStatus(true);
      //     }
      //   }
      // })
      if (errMsg === 'login:ok') {
        setGlobalData('loginCode', code)
      }
    })
  }

  //获取定位
  getCurrentLocation = () => {
    const permissionName = 'scope.userLocation';
    Taro.getSetting().then(res => {
      if (!res.authSetting[permissionName]) {
        Taro.authorize({
          scope: permissionName
        }).then(() => {
          this.getLocation()
        }, reason => {

        })
      } else {
        this.getLocation()
      }
    })
  }

  getLocation = () => {
    const { updateCurrentCity } = staticDataStore;
    Taro.getLocation().then((info) => {
      this.getCityInfo(info.longitude, info.latitude).then(data => {
        const c = data.district || data.city
        updateCurrentCity(this.getSubCityName(c))
        this.setCurrentCity(c)
      })
    })
  }

  //获取城市信息
  getCityInfo(lon, lat) {
    return request.get('https://restapi.amap.com/v3/geocode/regeo', {
      key: GMAP_API_KEY,
      location: `${lon},${lat}`
    }).then(data => {
      if (data.data && data.data.infocode === '10000') {
        const { regeocode = {} } = data.data
        const { addressComponent = {} } = regeocode
        const { province, city, adcode, citycode, country, district } = addressComponent
        return {
          msg: 'ok',
          province,
          city: city[0] || province,
          adcode,
          citycode,
          country,
          district
        }
      } else {
        return {
          msg: '逆地址解析失败'
        }
      }
    })
  }

  getSubCityName = (name = undefined) => {
    const city = name || this.getCurrentCity() || '请选择'
    return city.length > 3 ? `${city.substr(0, 3)}...` : city
  }

  //5s提示
  guideRegiste = ()=>{
    const {updateGuideStatus} = staticDataStore
    setTimeout(()=>{
      updateGuideStatus(true)
    },2e3)
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider {...store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
