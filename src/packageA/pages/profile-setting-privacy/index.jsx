import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtSwitch } from 'taro-ui'
import Presenter from './presenter'
import './index.scss'

export default class ProfileSettingPrivacy extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '隐私设置',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    const { checked } = this.state;
    return (
      <View className='profile-setting-privacy-viewport'>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>其他用户可见家庭成员信息</View>
          </View>
          <View className='item-value'>
            <AtSwitch color='#FF473A' checked={checked} onChange={this.handleChange} />
          </View>
        </View>

        <View className='btn-wrapper'>
          <View className='btn flex-center'>提交</View>
        </View>
      </View>
    )
  }
}
