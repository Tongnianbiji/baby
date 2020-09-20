import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import './circle-item.scss'

export default class CircleItem extends Component {
  render() {
    return (
      <View className='comp-circle-item'>
        <View className='infos'>
          <View className='avatar'></View>
          <View className='title'>浏阳三村幼儿园</View>
          <View className='btn'>
            <View className='btn-join'>加入</View>
          </View>
        </View>
        <View className='desc'>
          简介：济阳三村幼儿园地址位于上海市,学校创始于1865年的龙门书院，曾先后江苏省立第二师曾先后江苏省立第二师范曾先后江苏省立第二师范
        </View>
        <View className='nums'>
          <View className='num-item'>关注:2001</View>
          <View className='num-item'>帖子:12535</View>
          <View className='num-item'>问答:123</View>
        </View>
      </View>
    )
  }
}
