import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Textarea } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileSettingInfoNickName extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '联系我们',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    return (
      <View className='profile-setting-info-nickname-viewport'>
        <View className='item-label-wrapper'>
          十分期待您的宝贵意见和建议～
        </View>
        <View className='item-input-wrapper'>
          <Textarea className='item-input width-100 height-345' onInput={this.inputSuggest.bind(this)} placeholderClass='item-input-placeholder' placeholder='请输入您的意见反馈'></Textarea>
        </View>
        <View className='item-input-wrapper'>
          <Textarea className='item-input width-100 height-100' onInput={this.inputContact.bind(this)} placeholderClass='item-input-placeholder' placeholder='可留下联系方式，我们将第一时间联系您'></Textarea>
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center' onClick={this.submit.bind(this)}>提交</View>
        </View>
      </View>
    )
  }
}
