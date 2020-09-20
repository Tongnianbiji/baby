import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './styles.scss'

export default class PostTitleBar extends Component {
  static defaultProps = {
    title: '帖子列表'
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className='ui-post-title-bar'>
        <View className='title'>{this.props.title}</View>
        <View className='tabs'>
          <View className='tab-item actived'>
            最相关
            <View className='actived-underscore'></View>
          </View>
          <View className='tab-item'>最热</View>
          <View className='tab-item'>最新</View>
        </View>
      </View>
    )
  }
}