import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Textarea } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileSettingInfoSignature extends Presenter {

  render() {
    const {signature} = this.state;
    return (
      <View className='profile-setting-info-signature-viewport'>
        <View className='item-input-wrapper'>
          <Textarea className='item-input width-100' value={signature} placeholderClass='item-input-placeholder' placeholder='请输入' onInput={this.inputValue.bind(this)}></Textarea>
        </View>
        {/* <View className='item-label-wrapper'>
          一个月只能修改一次昵称，请谨慎修改
        </View> */}
        <View className='btn-wrapper'>
          <View className='btn flex-center' onClick={this.submit.bind(this)}>确认</View>
        </View>
      </View>
    )
  }
}
