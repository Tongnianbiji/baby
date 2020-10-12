import Taro, {getCurrentInstance} from '@tarojs/taro'
import React, { Component } from 'react'
import { SHAREOPTIONS, CURRENT_CITY_KEY, USER_INFO_KEY } from '../common/constant'
import Dto from '../common/localStorage'

/**
 * 所有 页面视图 都应该继承自这个类
 * 提供一些基础动作和封装
 */
export default class BaseComponent extends Component {

  constructor(props) {
    super(props)

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
    return Taro.getSetting().then(ret => {
      return ret.authSetting[permissionName]
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
    return this.__local_dto.getValue(CURRENT_CITY_KEY)
  }

  /**
   * 设置城市名称
   * @param {*} cityname 城市名称
   */
  setCurrentCity(cityname) {
    this.__local_dto.setValue(CURRENT_CITY_KEY, cityname)
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return this.__local_dto.getValue(USER_INFO_KEY)
  }
}
