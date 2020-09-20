import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import DTO from '../../../common/localStorage'
import './index.scss'

export default class CircleDescriptionView extends Component {
  config = {
    navigationBarTitleText: '圈子描述'
  }
  constructor() {
    this.state = {
      content: DTO.getInstance().getValue(this.$router.path)
    }
  }

  componentDidMount() {
    const { name } = this.$router.params
    Taro.setNavigationBarTitle({
      title: name
    })
  }

  config = {
    navigationBarTitleText: ''
  }

  render() {
    return (
      <View className='circle-desc-view'>
        <View className='info-panel'>
          简介: {this.state.content}
        </View>
      </View>
    )
  }
}