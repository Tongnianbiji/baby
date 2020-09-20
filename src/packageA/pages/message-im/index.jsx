import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class MessageIMView extends Presenter {

  config = {
    navigationBarTitleText: '聊天'
  }

  render() {
    return (
      <View className='message-im-viewport'></View>
    )
  }
}