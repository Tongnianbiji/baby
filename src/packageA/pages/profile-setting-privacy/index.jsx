import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtSwitch } from 'taro-ui'
import Presenter from './presenter'
import { ICONS } from '@common/constant'
import './index.scss'

export default class ProfileSettingPrivacy extends Presenter {
  render() {
    const { checked } = this.state;
    return (
      <View className='profile-setting-privacy-viewport'>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>把他（她）推荐给朋友</View>
          </View>
          <Button className='item-button' openType='share'>
            <Image src={ICONS.ARROW_RIGHT_P}></Image>
          </Button>
        </View>

        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>加入黑名单</View>
          </View>
          <View className='item-value'>
            <AtSwitch color='#FF473A' checked={checked} onChange={this.handleChangeBlock.bind(this)} />
          </View>
        </View>

        {/* <View className='btn-wrapper'>
          <View className='btn flex-center'>提交</View>
        </View> */}
      </View>
    )
  }
}
