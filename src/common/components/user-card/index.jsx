import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import { ICONS } from '../../constant'
import './styles.scss'

export default class UserInfoCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className='ui-user-info-card'>
        <View className='avatar-wrapper'>
          <View className='avatar'></View>
        </View>
        <View className='info-wrapper'>
          <View className='name-area'>
            <Text className='name'>张三李四王二</Text>
            <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
            <View className='tags-warpper'>
              <View className='tag'>大宝:两岁一个月</View>
              <View className='tag'>小宝:九个月</View>
            </View>
          </View>
          <View className='sub-title'>上海 浦东 | 家有碎钞机</View>
          <View className='nubmers'>
            <View className='num'>粉丝: 20</View>
            <View className='num'>发布: 20</View>
            <View className='num'>收藏: 20</View>
          </View>
        </View>
      </View>
    )
  }
}