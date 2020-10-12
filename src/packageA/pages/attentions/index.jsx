import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'
import NoData from '@components/no-data'

export default class AttentionsView extends Presenter {
  config = {
    navigationBarTitleText: '关注'
  }

  render() {
    const {attentionsList} = this.state;
    return (
      <View className='fans-vewport'>
        {
          attentionsList.length ?
          attentionsList.map((item,n) => {
            return (
              <View key={n.userId} className='fans-card'>
                <View className='avatar-wrapper'>
                  <View className='avatar'></View>
                </View>
                <View className='contents'>
                  <View className='title'>{n.nickName}</View>
            <View className='msg'>{item.createDt}关注了他（她）</View>
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