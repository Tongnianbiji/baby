import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import sa from 'sa-sdk-miniprogram'
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
const systemInfo = Taro.getSystemInfoSync()
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  circleDetailStore,
  staticDataStore
}
//神策数据埋点设置
sa.setPara({
	name: 'sensors',
	server_url: 'https://www.tongnian.world/tn-api/data/report/exposure',
	// 全埋点控制开关
	autoTrack:{ 
		appLaunch:true, // 默认为 true，false 则关闭 $MPLaunch 事件采集
		appShow:true, // 默认为 true，false 则关闭 $MPShow 事件采集
		appHide:true, // 默认为 true，false 则关闭 $MPHide 事件采集
		pageShow:true, // 默认为 true，false 则关闭 $MPViewScreen 事件采集
		pageShare:true, // 默认为 true，false 则关闭 $MPShare 事件采集
		mpClick: false, // 默认为 false，true 则开启 $MPClick 事件采集 
		mpFavorite: true // 默认为 true，false 则关闭 $MPAddFavorites 事件采集
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
  channel:1,
  deviceId:'',
  mobileModel:systemInfo.model,
  eventType:1,
  uid:'guest',
  lat:0.0,
  lon:0.0,
  provinceCode:'',
  cityCode:'',
  countryCode:'',
  version:systemInfo.version,
});

class App extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      isGuide:false
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
    if(!this.getCurrentIsCollentMini()){
      this.setCurrentIsCollentMini(1)
    }
    Taro.login().then(({ errMsg, code }) => {
      console.log('code', code);
      request.get('/user/checkregist',{code}).then((e)=>{
        const {userId,token,regist} = e.data.data;
        if(regist){
          updateIsRegisteStatus(true);
          updateIsLoginStatus(true);
          this.storage.setToken(token);
          this.storage.setValue(USER_INFO_KEY_USERID, {userId:userId})
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
          console.log('未授权')
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

    //更新城市信息
  async updateCityInfo(params){
    const ret = await request.postWithToken('/poi/update', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }

  //获取城市信息
  getCityInfo(lon, lat) {
    return request.get('https://restapi.amap.com/v3/geocode/regeo', {
      key: GMAP_API_KEY,
      location: `${lon},${lat}`
    }).then(data => {
      if (data.data && data.data.infocode === '10000') {
        console.log('定位信息',data.data)
        const { regeocode = {} } = data.data
        const { addressComponent = {} } = regeocode
        const { province, city, adcode, citycode, country, district } = addressComponent;
        this.updateCityInfo({
          districtCode:adcode,
          districtName:district,
          lat:lat,
          lng:lon
        })
        this.setCurrentLocation({
          lat:lat,
          lon:lon,
          provinceCode:province,
          cityCode:city,
          countryCode:district,
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
