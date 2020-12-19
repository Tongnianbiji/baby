import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtSwipeAction } from 'taro-ui'
import Presenter from './presenter'
import './index.scss'

export default class MessageSystemView extends Presenter {
  config = {
    navigationBarTitleText: '系统消息'
  }

  render() {
    const { content} = this.state;
    return (
      <View className='message-content'>{content}</View>
    )
  }
}