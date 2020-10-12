import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './circle-item.scss'

export default class CircleItem extends Component {

  static defaultProps = {
    model: {}
  }

  render() {
    const { model: { name, description, imgUrl, isSubscribe, subscribe, posts, questions } } = this.props;
    return (
      <View className='comp-circle-item'>
        <View className='infos'>
          <View className='avatar'>
            <Image src={imgUrl}></Image>
          </View>
          <View className='title'>{name}</View>
          <View className='btn'>
            {
              isSubscribe ? <View className='btn-join'>已关注</View> : <View className='btn-join'>关注</View>
            }
          </View>
        </View>
        <View className='desc'>
          简介：{description}
        </View>
        <View className='nums'>
          <View className='num-item'>关注:{subscribe}</View>
          <View className='num-item'>帖子:{posts}</View>
          <View className='num-item'>问答:{questions}</View>
        </View>
      </View>
    )
  }
}
