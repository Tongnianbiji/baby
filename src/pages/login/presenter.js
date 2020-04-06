import BaseComponent from '../../common/baseComponent'
import Utils from '../../common/utils'

export default class Presenter extends BaseComponent {

  _phoneNumReg = /^1\d{10}$/

  constructor() {
    super()

    this.state = {
      canUseLogin: this.canIUse('button.open-type.contact'),
      loging: false,
      loginType: 1, //1: 授权登录  2: 验证码登录
      countDown: 0,
      phoneNum: '',
      verifyCode: ''
    }
  }

  onGetUserInfo = ({ detail }) => {
    const { errMsg, userInfo } = detail;
    if (errMsg === "getUserInfo:ok" && userInfo) {
      this.login({
        success(res) {
          console.log(res, 'login res')
        }
      })
    } else {
      this.showToast('用户未授权, 登录失败.')
    }
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
      return
    }
    if (!this._phoneNumReg.test(phoneNum)) {
      this.showToast('请输入正确的手机号码')
      return
    }
    if (!verifyCode) {
      this.showToast('请输入手机验证码')
      return
    }
    // api.login.alert-success
    this.return2caller()
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
    // api . then . success
    Utils.countDown(10, num => {
      this.setState({
        countDown: num
      })
    })
  }

  return2caller() {
    // jump to caller page.
  }
}
