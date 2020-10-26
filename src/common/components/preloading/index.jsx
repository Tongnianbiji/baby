import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import loading from '@ass/img/loading.gif'

export default class Preloading extends Component {
  static defaultProps = {
    showLoading: false,
    isToBottom:false
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { showLoading, isToBottom } = this.props
    return (
      <View>
        {
          showLoading ?
            <View className='preloading flex-center'>
              <Image className="preloading-img" src={loading}></Image>
              <Text className="preloading-text">加载中</Text>
            </View>
            : null
        }
        {
          isToBottom ?
            <View className='is-to-bottom flex-center'>
              <Text className="is-to-bottom-text">公平·真实·善良·美好</Text>
            </View>
            : null
        }
      </View>
    )
  }
}