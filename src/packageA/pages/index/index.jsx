import Taro from '@tarojs/taro'
import React, { Component } from 'react'

import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    return (
      <View className='index'>
        首页
      </View>
    )
  }
}
