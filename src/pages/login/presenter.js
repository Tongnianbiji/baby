import Taro from '@tarojs/taro'
import BaseComponent from '../../common/baseComponent'
import Utils from '../../common/utils'
import Model from './model'
import Storage from '../../common/localStorage'
import { setGlobalData, getGlobalData } from '../../global_data'
import { USER_INFO_KEY } from '../../common/constant'
import staticDataStore from '@src/store/common/static-data'

export default class Presenter extends BaseComponent {

  _phoneNumReg = /^1\d{10}$/

  appBars = ['/pages/index/index', '/pages/discover/index', '/pages/message/index', '/pages/profile/index']

  constructor() {
    super();

    this.state = {
      canUseLogin: this.canIUse('button.open-type.contact'),
      loging: false,
      loginType: 1, //1: 授权登录  2: 验证码登录
      countDown: 0,
      phoneNum: '',
      verifyCode: ''
    }

    this.storage = Storage.getInstance()
  }

  componentDidMount() {
    const { isLogin } = staticDataStore;
    if (isLogin) {
      if (this.isLogin()) {
        this.showToast('登录成功, 即将跳转')
        setTimeout(() => {
          this.return2caller()
        }, 2000)
      }
    }
  }

  onGetPhoneNumber = ({ detail }) => {
    const { errMsg: phoneStatus, encryptedData, iv } = detail || {}
    Taro.login().then(({ errMsg, code }) => {
      if (errMsg === 'login:ok') {
        setGlobalData('loginCode', code);
        if (phoneStatus === 'getPhoneNumber:ok' && encryptedData) {
          // app 启动时, 如果login失败, 这里要有补偿的~! 现在没有
          this.taro.checkSession().then(() => {
            this.authLogin(getGlobalData('loginCode'), encryptedData, iv)
          }, () => {
            this.taro.login().then(({ errMsg, code }) => {
              if (errMsg === 'login:ok') {
                setGlobalData('loginCode', code)
                this.authLogin(code, encryptedData, iv)
              } else {
                this.showToast('登录失败, 请重试.')
              }
            })
          })
        } else {
          this.showToast('用户未授权, 登录失败.')
        }
      }
    })
  }

  authLogin(code, phone, iv) {
    const { isRegiste, updateIsLoginStatus, inviter,invtKey,updateWxUserInfo } = staticDataStore;
    this.setState({ loging: true })
    Model.getToken({
      oauthCode: code,
      mobile: phone,
      iv,
      inviter
    }).then(({ errMsg: msg, data }) => {
      console.log(data, 'data...')
      this.setState({ loging: false })
      const { data: ret, code: status } = data
      if (msg === 'request:ok' && status === 0) {
        this.storage.setToken(ret.token)
        this.storage.setValue(USER_INFO_KEY, ret.profile)
        // 改版
        this.storage.setValue('loginInfo', {
          token: ret.token,
          userId: ret.profile.userId,
        });
        staticDataStore.updateUserInfo(ret.profile || {});
        staticDataStore.updateIsLoginStatus(true);
        staticDataStore.updateIsRegisteStatus(true);


        //updateWxUserInfo(ret.profile)
        if (isRegiste) {
          updateIsLoginStatus(true)
          this.return2caller()
        } else {
          if(invtKey){
            Taro.navigateTo({
              //url: `/packageA/pages/profile-setting-info/index?newUser=true&wxInfo=${false}`
              url:`/packageA/pages/characterC/index?newInvtKey=${invtKey}`
            })
          }else{
            Taro.navigateTo({
              url: '/packageA/pages/characterA/index'
            })
          }
        }
      } else {
        this.showToast('登录失败, 请稍候再试.')
      }
    })
  }

  changeLoginType() {
    this.setState(prevState => {
      return {
        loginType: prevState.loginType === 1 ? 2 : 1
      }
    })
  }

  phoneNumInput({ detail }) {
    this.setState({ phoneNum: detail.value || '' })
  }

  verifyCodeInput({ detail }) {
    this.setState({ verifyCode: detail.value || '' })
  }

  verifyCodeLogin() {
    const { phoneNum, verifyCode } = this.state;
    if (!phoneNum) {
      this.showToast('请输入手机号码')
      return false
    }
    if (!this._phoneNumReg.test(phoneNum)) {
      this.showToast('请输入正确的手机号码')
      return false
    }
    if (!verifyCode) {
      this.showToast('请输入手机验证码')
      return false
    }

    return true
  }

  doLogin = () => {
    const { isRegiste, updateIsLoginStatus, inviter,invtKey,updateWxUserInfo } = staticDataStore;
    const { phoneNum, verifyCode, loging } = this.state
    if (this.verifyCodeLogin() && !loging) {
      Model.getToken({
        mobile: phoneNum,
        msgCode: verifyCode,
        inviter
      }).then(({ errMsg: msg, data }) => {
        this.setState({ loging: false })
        const { data: ret, code: status } = data
        console.log(status, data, 'cdoe , data')
        if (msg === 'request:ok' && status === 0) {
          this.storage.setToken(ret.token)
          this.storage.setValue(USER_INFO_KEY, ret.profile)
          //updateWxUserInfo(ret.profile)
          if (isRegiste) {
            updateIsLoginStatus(true)
            this.return2caller()
          } else {
            if(invtKey){
              Taro.navigateTo({
                //url: `/packageA/pages/profile-setting-info/index?newUser=true&wxInfo=${false}`,
                url:`/packageA/pages/characterC/index?newInvtKey=${invtKey}`
              })
            }else{
              Taro.navigateTo({
                url: '/packageA/pages/characterA/index'
              })
            }
          }
        } else if (status === 3) {
          this.showToast('验证码错误')
        } else {
          this.showToast('登录失败, 请稍候再试')
        }
      })
    }
  }

  sendVerifyCode() {
    const { phoneNum, countDown } = this.state;
    if (countDown) {
      // is counting down
      return
    }
    if (!phoneNum) {
      this.showToast('请输入手机号码')
      return
    }
    if (!this._phoneNumReg.test(phoneNum)) {
      this.showToast('请输入正确的手机号码')
      return
    }

    Model.sendSms(phoneNum).then(ret => {
      if (!ret.code) {
        Utils.countDown(60, num => {
          this.setState({
            countDown: num
          })
        })
        this.showToast('验证码发送成功')
      } else {
        this.showToast('验证码发送失败, 请重试')
      }
    })
  }

  return2caller() {
    // jump to caller page.
    const { from } = Taro.getCurrentInstance().router.params;
    const reg = /^\//
    console.log(from, 'from..')
    if (from) {
      const goto = `${reg.test(from) ? '' : '/'}${from}`
      if (this.appBars.includes(goto.split('?')[0])) {
        this.taro.switchTab({
          url: goto
        })
      } else {
        this.navto({
          url: goto
        })
      }
    } else {
      this.taro.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
