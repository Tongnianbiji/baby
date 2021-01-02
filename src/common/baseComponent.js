import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { SHAREOPTIONS, CURRENT_CITY_KEY, USER_INFO_KEY, USER_INFO_KEY_USERID, CURRENT_LOCATION_INFO, IS_COLLECT_MINI } from '../common/constant'
import Dto from '../common/localStorage'
import { View, Button, Text, Icon, Image } from '@tarojs/components'
import BaseRequest from '@common/baseRequest'
import { GMAP_API_KEY } from '@common/constant'
import { ICONS } from '@common/constant'
import staticData from '@src/store/common/static-data.js'
// TODO - 整理globalData
const defaultPositon = {
  lat: '31.245944',
  lon: '121.567706',
}
const request = new BaseRequest();
let hasCheckedRegist = false;
/**
 * 所有 页面视图 都应该继承自这个类
 * 提供一些基础动作和封装
 */
export default class BaseComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pageState: 'loading',
    }

    this.__local_dto = Dto.getInstance();

    this.taro = Taro;

    this.$router = getCurrentInstance().router;
  }

  /**
   * 不应该被业务代码访问的属性..
   */
  _private_var = {
    _is_loading: false,
    _loading_interval: 300,
    _loading_timer: null
  }

  /**
   * 小程序原生 Toast
   * @param {*} title 文本内容
   * @param {*} duration 停留毫秒数
   */
  showToast(title, duration = 2000) {
    Taro.showToast({
      title,
      icon: 'none',
      duration
    })
  }

  /**
   * 显示导航栏上的loading效果
   */
  showNavLoading() {
    Taro.showNavigationBarLoading()
  }

  /**
   * 隐藏导航栏上的loading效果
   */
  hideNavLoading() {
    Taro.hideNavigationBarLoading();
  }

  /**
   * 盖住全屏的Loading效果
   * 如果在意图展示loading效果的0.3秒内, 又调用了hideloading, 那么loading效果根本不会展示.
   * 这样就不会闪屏~!
   */
  showLoading() {
    if (!this._private_var._is_loading) {
      this._private_var._is_loading = true;
      this._private_var._loading_timer = setTimeout(() => {
        Taro.showLoading();
      }, this._private_var._loading_interval);
    }
  }

  /**
   * 关闭全屏Loading
   */
  hideLoading() {
    this._private_var._loading_timer && clearTimeout(this._private_var._loading_timer);
    this._private_var._is_loading = false;
    Taro.hideLoading();
  }

  /**
   * 用户是否登录
   */
  isLogin() {
    const token = this.__local_dto.getToken();
    return token
  }

  logout() {
    this.__local_dto.setToken('')
  }

  /**
   * 去登录
   * @param {*} options 
   */
  login() {
    const { path } = getCurrentInstance().router
    this.navto({
      url: `/pages/login/index?from=${path}`
    })
  }

  /**
   * 当前微信客户端是否可以使用 指定的schema
   * @param {*} schema 
   * @example
   * 
   * schema
   * 用户信息授权:: button.open-type.contact
   */
  canIUse(schema) {
    return Taro.canIUse(schema)
  }

  /**
   * 是否得到了 指定权限 的授权 (异步)
   * @param {*} permissionName 权限名称
   */
  hasPermission(permissionName) {
    return Taro.getSetting().then(res => {
      return res.authSetting[permissionName]
    })
  }

  /**
   * 导航
   */
  navto(obj) {
    console.log(1111)
    Taro.navigateTo(obj)
  }

  /**
   * 回退页面
   * @param {*} num 回退的层数
   */
  navback(num = 1, success) {
    Taro.navigateBack({ delta: num, success })
  }

  setNavBarTitle(txt) {
    Taro.setNavigationBarTitle({
      title: txt
    })
  }

  /**
   * 设置分享信息
   */
  setShareOptions() {
    return SHAREOPTIONS
  }

  /**
   * 获取定位信息
   */
  getLocation() {
    const permissionName = 'scope.userLocation'
    return new Promise((resolve, reject) => {
      Taro.getSetting().then(res => {
        if (!res.authSetting[permissionName]) {
          Taro.authorize({
            scope: permissionName
          }).then(() => {
            Taro.getLocation().then(resolve)
          }, reason => {
            reject(reason)
          })
        } else {
          Taro.getLocation().then(resolve)
        }
      })
    })
  }

  /**
   * 获取当前城市名
   */
  getCurrentCity() {
    return staticData.currentCity;
  }

  /**
   * 设置城市名称
   * @param {*} cityname 城市名称
   */
  setCurrentCity(cityname) {
    staticData.updateCurrentCity(cityname)
  }


  // /**
  // * 获取当前定位信息
  // */
  getCurrentLocation() {
    return staticData.loactionInfo;
  }

  // /**
  //  * 设置定位信息
  //  * @param {*} location 定位信息
  //  */
  // setCurrentLocation(location) {
  //   this.__local_dto.setValue(CURRENT_LOCATION_INFO, location)
  // }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return staticData.userInfo;
    // if (!this.__local_dto.getValue(USER_INFO_KEY)) {
    //   return this.__local_dto.getValue(USER_INFO_KEY_USERID)
    // } else {
    //   return this.__local_dto.getValue(USER_INFO_KEY)
    // }
  }

  /**
  * 获取当前是否小程序收藏
  */
  getCurrentIsCollentMini() {
    return this.__local_dto.getValue(IS_COLLECT_MINI)
  }

  setCurrentIsCollentMini(status) {
    this.__local_dto.setValue(IS_COLLECT_MINI, status)
  }

  registe = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }
  onAutoLogin() {
    if (staticData.isLogin || hasCheckedRegist) {
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      // 有token说明已注册，可自动登录。没token可以去接口判断是否已注册， 有则获取token, 无则自动登录失败
      this.getLoginInfo().then(
        loginInfo => {
          request.get('/profile/get', { userId: loginInfo.userId }, { token: loginInfo.token }).then(res => {
            // 登录token过期，重新登录
            if (res.code === 2 && res.message == '登录过期,请重新登录') {


              return;
            }

            // 登录未超时
            if (res.errMsg === request.okMsg) { // TODO - 这个奇怪的判断是什么？
              this.__local_dto.setValue('__TN_LOGIN_TOKEN_', loginInfo.token); // 为了让requet模块能拿到token, 本不应该这样设计
              const userInfo = res.data.data;
              staticData.updateUserInfo(userInfo || {});
            }
            // 获取位置信息
            this.getLatAndLon().then(res => {
              this.setCityInfo(res.longitude, res.latitude).then(data => {
                const c = data.district || data.city;
                staticData.updateCurrentCity(this.getSubCityName(c));
                staticData.updateIsLoginStatus(true);
                staticData.updateIsRegisteStatus(true);
                resolve(); // 完成登录
              })
            })
          })
        },
        err => {
          staticData.updateIsRegisteStatus(false);
          staticData.updateIsLoginStatus(false);
          setTimeout(() => {
            staticData.updateGuideStatus(true)
          }, 2e3)

          const pages = Taro.getCurrentPages();
          const currentPage = pages[pages.length - 1];
          const whiteList = ['pages/index/index', 'pages/discover/index', 'pages/message/index',
            'pages/profile/index', 'packageB/pages/post-detail/index', 'packageB/pages/issue-detail/index'];
          if (whiteList.indexOf(currentPage.route) == -1) { // 落地页只允许访问部分页面
            Taro.redirectTo({
              url: '/pages/login/index'
            });
          } else {
            resolve();
          }
        }
      )
    })

  }
  getLoginInfo() {
    let loginInfo = this.__local_dto.getValue('loginInfo');
    if (loginInfo) {
      return Promise.resolve(loginInfo);
    }
    return Taro.login().then(({ errMsg, code }) => {

      return request.get('/user/checkregist', { code }).then((e) => {
        hasCheckedRegist = true;
        const { userId, token, regist } = e.data.data;
        // 判断是否为已注册的用户，已注册则自动登录
        if (regist) {
          loginInfo = {
            token,
            userId,
          };
          this.__local_dto.setValue('loginInfo', loginInfo);
          return loginInfo;
        } else {
          return Promise.reject();
        }
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
  // 获取城市信息
  async setCityInfo(lon = '121.54409', lat = '31.22114') {
    return request.get('https://restapi.amap.com/v3/geocode/regeo', {
      key: GMAP_API_KEY,
      location: `${lon},${lat}`
    }).then(data => {
      if (data.data && data.data.infocode === '10000') {
        console.log('定位信息', data.data)
        const { regeocode = {} } = data.data
        const { addressComponent = {} } = regeocode
        const { province, city, adcode, citycode, country, district, towncode } = addressComponent;

        return request.postWithToken('/poi/update', {
          districtCode: adcode,
          districtName: district,
          lat: lat,
          lng: lon
        }).then(
          res => {
            staticData.setLocationInfo({
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
          },
          err => {

          });
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

  //全局引导
  guide() {
    return (
      <View>
        {
          <View className='guide-button' onClick={this.registe.bind(this)}>
            <View>美好童年，翘首可及</View>
            <View className="button">登陆/注册</View>
          </View>
        }
      </View>
    )
  }

  renderLoading() {
    return <View className='base-loading'></View>
  }

  renderEmptyPage(pt = '30vh') {
    return (
      <View className='noTemplate-wrap' style={{ paddingTop: pt }}>
        <Image src={ICONS.NODATA} mode='widthFix' />
        <Text>当前暂无数据</Text>
      </View>
    )
  }
  renderServerError() {
    return (
      <View className='net-error-wrap'>
        <Image src={ICONS.NODATA} mode='widthFix' />
        <Text>当前暂无数据</Text>
      </View>
    )
  }
}
