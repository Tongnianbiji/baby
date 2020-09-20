import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { ICONS } from '@common/constant'
import './index.scss'

export default class MainPanelComponent extends Component {
  static defaultProps = {
    info: {}
  }

  render() {
    const {
      imgprofile: avatar,
      title,
      content,
      views = 0,
      replys = 0,
      markes = 0
    } = this.props.info
    return (
      <View className='main-panel-view'>
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
              <Image className='btn-share' src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
            </View>
            <Text className='times'>2020-03-29 21:29:00</Text>
          </View>
        </View>
        <View className='title'>{title}</View>
        <View className='content'>{content}</View>
        <View className='tags'>
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
      </View>
    )
  }
}