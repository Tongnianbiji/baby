import React, { Component } from 'react'
import { View, Text, Button, Input, Image } from '@tarojs/components'
import Presenter from './presenter'
import './style.scss'

export default class Login extends Presenter {
  config = {
    navigationBarTitleText: '登录'
  }
  render() {
    const { countDown } = this.state;
    return (
      <View className='login-viewport'>
        <View className='logo-wrapp'>
          <Image className='img-logo' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/tn_logo.png' />
        </View>
        <View className='invite-tip'>
          <Text>小富爸爸邀请你一起使用“童年”，共同关注小福的成长</Text>
        </View>
        {
          this.state.loginType === 1 ?
            <View>
              {/* <Button className='btn-wechat' loading={this.state.loging} openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>微信一键登陆</Button> */}
              <Button className='btn-wechat' loading={this.state.loging} openType='getPhoneNumber' onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}>微信一键登陆</Button>
              <Button className='btn-phone' onClick={this.changeLoginType.bind(this)}>手机号验证登陆</Button>
            </View> :
            <View>
              <Input placeholder='输入手机号' type='number' className='inp-phone' onInput={this.phoneNumInput.bind(this)} />
              <View className='verify-code-wrapper'>
                <View className='verify-code-inp'>
                  <Input className='inp-verify-code' onInput={this.verifyCodeInput.bind(this)} type='number' placeholder='请输入手机验证码' />
                </View>
                <View className={`verify-code-btn${countDown ? ' counting-down' : ''}`} onClick={this.sendVerifyCode.bind(this)}>
                  {countDown ? `${countDown}后重新发送` : '发送验证码'}
                </View>
              </View>
              <Button className='confirm-btn' loading={this.state.loging} onClick={this.doLogin.bind(this)}>确认</Button>
              <Button className='confirm-btn' onClick={this.changeLoginType.bind(this)}>返回</Button>
            </View>
        }
      </View>
    )
  }
}