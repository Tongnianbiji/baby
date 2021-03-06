import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileBaby extends Presenter {

  render() {
    const { babyList,isToFamily } = this.state;
    return (
      <View className='profile-baby-viewport'>
        {
          babyList.map((item, index) => {
            return (
              <View key={`item_${item.id}_${index}`} className='item' onClick={this.onClickNavTo.bind(this, item)}>
                <View className='item-txt'>{item.officeName}</View>
                <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
              </View>
            )
          })
        }
        {
          !isToFamily &&
          <View className='btn-wrapper'>
            <View className='btn flex-center' onClick={this.onClickNavToAction.bind(this)}>添加新宝宝</View>
          </View>
        }
        
      </View>
    )
  }
}
