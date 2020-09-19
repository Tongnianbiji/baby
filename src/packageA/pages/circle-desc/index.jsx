import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

export default class CircleDescriptionView extends Component {
  config = {
    navigationBarTitleText: '圈子描述'
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '市光路第三小幼儿园'
    })
  }

  render() {
    return (
      <View className='circle-desc-view'>
        <View className='info-panel'>
          简介: 我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.
          我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.
          我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.
          我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.
          我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.
          我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.我是圈子的简介,可能会非常的长. 所以新开一个页面用来展示.
        </View>
      </View>
    )
  }
}