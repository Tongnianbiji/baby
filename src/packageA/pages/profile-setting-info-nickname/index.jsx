import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Textarea, Input } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'
import staticDataStore from '@src/store/common/static-data'

export default class ProfileSettingInfoNickName extends Presenter {

  render() {
    const {isRegiste} = staticDataStore;
    const {nickName} = this.state;
    return (
      <View className='profile-setting-info-nickname-viewport'>
        <View className='item-input-wrapper'>
          <Input className='item-input width-100' value={nickName} placeholderClass='item-input-placeholder' placeholder='请输入' onInput={this.inputValue.bind(this)}	
></Input>
        </View>
        {
          isRegiste &&
            <View className='item-label-wrapper'>
              一个月只能修改一次昵称，请谨慎修改
            </View>
        }
        
        <View className='btn-wrapper'>
          <View className='btn flex-center' onClick={this.submit.bind(this)}>确认</View>
        </View>
      </View>
    )
  }
}
