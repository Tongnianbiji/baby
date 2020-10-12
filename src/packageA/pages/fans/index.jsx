import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'
import NoData from '@components/no-data'

export default class FansView extends Presenter {
  config = {
    navigationBarTitleText: '粉丝'
  }

  render() {
    const {fansList} = this.state;
    return (
      <View className='fans-vewport'>
        {
          fansList.length ?
          fansList.map((item,n) => {
            return (
              <View key={n.userId} className='fans-card'>
                <View className='avatar-wrapper'>
                  <View className='avatar'></View>
                </View>
                <View className='contents'>
                  <View className='title'>{n.nickName}</View>
            <View className='msg'>{item.createDt}关注了你</View>
                </View>
                <View className={`btn-attention${item.isSubscr ? ' attentioned' : ''}`}>{n.attention ? '已关注' : '关注'}</View>
              </View>
            )
          }) : <NoData></NoData>
        }
      </View>
    )
  }
}