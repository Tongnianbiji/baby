import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { ICONS } from '../../../../common/constant'
import './index.scss'

export default class QACardView extends Component {

  static defaultProps = {
    model: {}
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title, views, replys, markes } = this.props.model;
    return (
      <View className='qa-card-view'>
        <View className='anwser'>
          {/** 
            <View>
            <View className='icon'>答</View>
            <View className='txt'>张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三</View>
            <View className='share-btn'>
            <Image src={ICONS.SHARE_BTN_GRAY} alt='' className='share-icon' />
          </View>
          </View>
          */
          }

        </View>
        <View className='questions'>
          <View className='icon'>问</View>
          <View className='txt'>{title}</View>
          <View className='share-btn'>
            <Image src={ICONS.SHARE_BTN_GRAY} alt='' className='share-icon' />
          </View>
        </View>
        <View className='tips'>
          <View className='views'>
            <Image className='img' src={ICONS.PREVIEW} />
            <Text>{views}</Text>
          </View>
          <View className='comment'>
            <Image className='img' src={ICONS.COMMENT} />
            <Text>{replys}</Text>
          </View>
          <View className='favorite'>
            <Image className='img' src={ICONS.FAVORITE} />
            <Text>{markes}</Text>
          </View>
        </View>
      </View>
    )
  }
}