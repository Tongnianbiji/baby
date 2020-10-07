import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import { ICONS } from '../../constant'
import './styles.scss'

export default class UserInfoCard extends Component {

  static defaultProps = {
    model:{},
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { circle ,flow, funs,marked,stared} = this.props.model;
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
            <View className='num'>粉丝: {funs}</View>
            <View className='num'>发布: {circle}</View>
            <View className='num'>收藏: {flow}</View>
          </View>
        </View>
      </View>
    )
  }
}