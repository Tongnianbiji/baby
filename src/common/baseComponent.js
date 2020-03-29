import Taro from '@tarojs/taro'

/**
 * 所有 页面视图 都应该继承自这个类
 * 提供一些基础动作和封装
 */
export default class BaseComponent extends Taro.Component {

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
    return Taro.checkSession().then(() => {
      return true
    }, reason => {
      return reason
    })
  }

  login(options) {
    return Taro.login(options)
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
   * 导航
   */
  navto(url) {
    Taro.navigateTo({
      url
    })
  }
  
}
