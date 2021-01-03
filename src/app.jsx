import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import sa from 'sa-sdk-miniprogram'
import { Provider } from 'mobx-react'
import BaseComponent from '@common/baseComponent'
import { setGlobalData } from './global_data'
// import GoEasy from './libs/goeasy-1.0.17'
import GoEasyIM from 'goeasy-im'
import BaseRequest from '@common/baseRequest'
import { GMAP_API_KEY } from '@common/constant'
import circleDetailStore from './store/circle-detail'
import staticDataStore from './store/common/static-data'
import { USER_INFO_KEY_USERID } from '@common/constant'
import Storage from '@common/localStorage'
import './app.scss'

const v = '1.1.11'

const request = new BaseRequest()
const systemInfo = Taro.getSystemInfoSync()
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// TODO - 整理globalData
const defaultPositon = {
  lat: '31.245944',
  lon: '121.567706',
}
const store = {
  circleDetailStore,
  staticDataStore
}
//神策数据埋点设置
sa.setPara({
  name: 'sensors',
  server_url: 'https://www.tongnian.world/tn-api/data/report/exposure',
  // 全埋点控制开关
  autoTrack: {
    appLaunch: false, // 默认为 true，false 则关闭 $MPLaunch 事件采集
    appShow: false, // 默认为 true，false 则关闭 $MPShow 事件采集
    appHide: false, // 默认为 true，false 则关闭 $MPHide 事件采集
    pageShow: false, // 默认为 true，false 则关闭 $MPViewScreen 事件采集
    pageShare: false, // 默认为 true，false 则关闭 $MPShare 事件采集
    mpClick: false, // 默认为 false，true 则开启 $MPClick 事件采集 
    mpFavorite: false // 默认为 true，false 则关闭 $MPAddFavorites 事件采集
  },
  // 自定义渠道追踪参数，如source_channel: ["custom_param"]
  source_channel: [],
  // 是否允许控制台打印查看埋点数据(建议开启查看)
  show_log: true,
  // 是否允许修改 onShareAppMessage 里 return 的 path，用来增加(登录 ID，分享层级，当前的 path)，在 app onShow 中自动获取这些参数来查看具体分享来源、层级等
  allow_amend_share_path: true
});

// 初始化 SDK
sa.init();

sa.registerApp({
  ...defaultPositon,
  channel: 1,
  deviceId: '',
  mobileModel: systemInfo.model,
  eventType: 1,
  uid: 'guest',
  provinceCode: '上海',
  cityCode: '310100',
  countryCode: '31011500',
  version: systemInfo.version,
});

class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isGuide: false
    }
    this.storage = Storage.getInstance()
  }
  componentDidMount() {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })

    const { getGoEasy } = staticDataStore;
    getGoEasy(
      GoEasyIM.getInstance({
        host: 'hangzhou.goeasy.io',
        appkey: 'BC-6ad253de75d242f5a8917e75e14e1eca',
      })
    )
  }

  componentDidShow() {
    // this.isRegiest();
  }

  componentDidHide() { 
    staticDataStore.setHasCheckedRegist(false);
  }

  componentDidCatchError() { }

  //判断是否是游客还是用户
  isRegiest = () => {

    const { updateIsRegisteStatus, updateIsLoginStatus } = staticDataStore;
    if (!this.getCurrentIsCollentMini()) {
      this.setCurrentIsCollentMini(1)
    }
    Taro.login().then(({ errMsg, code }) => {
      console.log('code', code);
      request.get('/user/checkregist', { code }).then((e) => {
        const { userId, token, regist } = e.data.data;
        if (regist) {
          updateIsRegisteStatus(true);
          updateIsLoginStatus(true);
          this.storage.setToken(token);
          this.storage.setValue(USER_INFO_KEY_USERID, { userId: userId })
          this.requestUserInfo(token, userId);
          // const pages = getCurrentPages();
          // pages.forEach(item => {
          //   item.onLogin && item.onLogin();
          // })
        } else {
          this.guideRegiste();
          updateIsRegisteStatus(false);
          updateIsLoginStatus(false);
        }
      })
      //本地模拟
      this.loadLocationInfo();
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

  requestUserInfo(token, userId) {
    return request.get('/profile/get', { token, userId }, { token}).then(ret => {
      if (ret.errMsg === request.okMsg) {
        // return ret.data
        const userInfo = ret.data.data;
        const { updateUserInfo } = staticDataStore;
        if (userInfo) {
          console.log('---updateUserInfo---', userInfo)
          updateUserInfo(userInfo);
        }
      }
    })
  }
  //获取定位
  loadLocationInfo = () => {
    // 获取经纬度
    this.getLatAndLon().then(res => {
      console.log('---getLatAndLon---', res)
      const { updateCurrentCity } = staticDataStore;
      this.getCityInfo(res.longitude, res.latitude).then(data => {
        const c = data.district || data.city
        updateCurrentCity(this.getSubCityName(c))
        this.setCurrentCity(c)
      })
    })
  }

  getLatAndLon() {
    const permissionName = 'scope.userLocation';
    return Taro.getSetting().then(res => {
      if (!res.authSetting[permissionName]) {
        return Taro.authorize({
          scope: permissionName
        }).then((res) => {
          console.log('---成功授权---', res)
          return Taro.getLocation();
        }, err => {
          console.log('---拒绝授权---', err)
          return Promise.resolve({ longitude: defaultPositon.lon, latitude: defaultPositon.lat });
        })
      } else {
        return Taro.getLocation();
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

  //更新城市信息
  async updateCityInfo(params) {
    const ret = await request.postWithToken('/poi/update', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }

  getCity(id, type) {
    const query = type ? `?${type}=${id}` : ''
    return request.get('/poi/locate' + query).then(request.standardResponse)
  }

  //获取城市信息
  getCityInfo(lon = '121.54409', lat = '31.22114') {
    return request.get('https://restapi.amap.com/v3/geocode/regeo', {
      key: GMAP_API_KEY,
      location: `${lon},${lat}`
    }).then(data => {
      if (data.data && data.data.infocode === '10000') {
        console.log('定位信息', data.data)
        const { regeocode = {} } = data.data
        const { addressComponent = {} } = regeocode
        const { province, city, adcode, citycode, country, district, towncode } = addressComponent;

        this.updateCityInfo({
          districtCode: adcode,
          districtName: district,
          lat: lat,
          lng: lon
        })
        this.setCurrentLocation({
          lat: lat,
          lon: lon,
          provinceCode: province,
          cityCode: city,
          countryCode: district,
          cityCodeCode: adcode,
          countryCodeCode: towncode
        })
        return {
          msg: 'ok',
          province,
          city: city || province,
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
  guideRegiste = () => {
    const { updateGuideStatus } = staticDataStore
    setTimeout(() => {
      updateGuideStatus(true)
    }, 2e3)
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
