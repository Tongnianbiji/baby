import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import './styles.scss'

export default class NoDataShowCreate extends Component {
  createCircle = ()=>{
    Taro.showToast({
      title:'即将开放，敬请期待',
      icon:'none',
      duration:2e3
    })
  }
  render() {
    return (
      <View className='car-no-data'>
        <View className='no-data-content'>
          没有找到想要的圈子
          <View onClick={this.createCircle.bind(this)} className='create-circle'>创建圈子</View>
        </View>
      </View>
    )
  }
}