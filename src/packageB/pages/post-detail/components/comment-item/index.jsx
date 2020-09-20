import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { ICONS } from '@common/constant'
import './index.scss'

export default class CommentItem extends Component {
  static defaultProps = {
    model: {},
    needLine: false,
    hasChildren: false,
    last: false
  }
  render() {
    const { avatar, children, needLine, hasChildren, last } = this.props
    return (
      <View className={`comment-item${needLine ? ' need-line' : ''}`}>
        <View className='info-wrapper'>
          <View className='user-info'>
            <View className='avatar'>
              {
                avatar ?
                  <Image src={avatar} className='avatar-img' /> :
                  null
              }
            </View>
            <View className='infos'>
              <View className='name-area'>
                <Text className='name'>李庭语妈妈</Text>
                <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
                <Text className='years-old'>上海 嘉定</Text>
                <Text className='years-old'>3岁9个月</Text>
                <View className='like-btns'>
                  <View className='btns-wrapper'>
                    <View className='like-btn'>
                      <Image src={ICONS.LIKE} className='like-btn-img' />
                    18
                  </View>
                    <View className='like-btn'>
                      <Image src={ICONS.DISLIKE} className='like-btn-img' />
                    18
                  </View>
                  </View>
                </View>
              </View>
              <Text className='times'>贴主 2小时前</Text>
            </View>
            {!needLine && <View className='line' />}
          </View>
          <View className='contents'>求解答，在线等</View>
          {hasChildren && <View className='vertical-line' />}
        </View>
        <View className='children-nodes'>
          {children}
          {hasChildren && <View className='vertical-line-bottom' />}
        </View>
        {last && <View className='hide-more-line' />}
      </View>
    )
  }
}