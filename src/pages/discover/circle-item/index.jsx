import Taro from '@tarojs/taro'
import React from 'react'
import { Component } from 'react'
import { View } from '@tarojs/components'
import './style.scss'

export default class CircleItem extends Component {
  static defaultProps = {

  }

  constructor(props) {
    super(props)
  }

  findMore = () => {
    Taro.navigateTo({ url: '/packageA/pages/more-circle/index' })
  }

  render() {
    const { name, subscribe, posts, questions, leaf } = this.props;
    return (
      <View className='comp-circle-item'>
        <View className='base-info'>
          <View className='avatar-wrapper'>
            <View className='avatar'></View>
          </View>
          <View className='infos'>
            <View className='title'>{name}</View>
            <View className='subtitle'>简介:</View>
          </View>
        </View>
        <View className='numbers'>
          <View className='number'>关注: {subscribe}</View>
          <View className='number'>帖子: {posts}</View>
          <View className='number'>问答: {questions}</View>
        </View>
        {
          leaf && <View className='more' onClick={this.findMore}>发现更多&gt;</View>
        }

      </View>
    )
  }
}