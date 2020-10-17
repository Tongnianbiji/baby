import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, RadioGroup, Radio } from '@tarojs/components'
import { GENDER_LIST } from '../../../common/enums';
import Presenter from './presenter'
import './index.scss'

export default class ProfileBabyDetail extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '大宝',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    return (
      <View className='profile-baby-detail-viewport'>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝小名</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>小福</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝性别</View>
          </View>
          <View className='item-value'>

            <RadioGroup className='width-100 radio-group'>
              {
                GENDER_LIST.map((item, index) => {
                  return <Radio key={index} color='#ff473a' checked={item.id} value={item.id}>{item.name}</Radio>
                })
              }
            </RadioGroup>
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝出生年月</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>2019-06-18</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝所在年级</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>请选择</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝所在学校</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>请输入</View>
            <Image className='item-search' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/search.png' />
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center'>确认修改</View>
        </View>
      </View>
    )
  }
}
