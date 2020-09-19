import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileSettingInfo extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '设置',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    return (
      <View className='profile-setting-info-viewport'>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>头像</View>
          </View>
          <View className='item-value'>
            <View className='item-circle'></View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'nickname')}>
          <View className='item-label'>
            <View className='item-txt'>昵称</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>小静妈妈</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'signature')}>
          <View className='item-label'>
            <View className='item-txt'>签名</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>家有两只吞金兽</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>设置主页背景</View>
          </View>
          <View className='item-value'>
            <View className='item-range'></View>
          </View>
        </View>
      </View>
    )
  }
}
