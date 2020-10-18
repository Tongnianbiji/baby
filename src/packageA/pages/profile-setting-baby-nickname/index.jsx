import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Textarea, Input } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'


export default class ProfileSettingBabyNickName extends Presenter {

  render() {
    const {babyNickname} = this.state;
    return (
      <View className='profile-setting-info-nickname-viewport'>
        <View className='item-input-wrapper'>
          <Input className='item-input width-100' placeholderClass='item-input-placeholder' value={babyNickname} placeholder='请输入' onInput={this.inputValue.bind(this)}	
></Input>
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center' onClick={this.submit.bind(this)}>确认</View>
        </View>
      </View>
    )
  }
}
