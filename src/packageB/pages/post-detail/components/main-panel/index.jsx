import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
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
      markes = 0,
      isMark = false,
      createTime = '2020-03-29 21:29:00',
      
      userSnapshot: {
        city,
        country = '宝山',
        headImg = '',
        nickName = '昵称1',
        sex = 'MALE',
        customLevel : [{desc='3岁9个月'}]
      }
    } = this.props.info
    console.log('数据',this.props.info)
    return (
      <View className='main-panel-view'>
        <View className='user-info'>
          <View className='avatar'>
            {
              headImg ?
                <Image src={headImg} className='avatar-img' /> :
                null
            }
          </View>
          <View className='infos'>
            {
              <View className='name-area'>
                <Text className='name'>{nickName}</Text>
                <Image className='sex' src={sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON}></Image>
                <Text className='years-old'>{ city + ' ' + country}</Text>
                <Text className='years-old'>{desc}</Text>
                <Image className='btn-share' src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
              </View>
            }
            <Text className='times'>{createTime}</Text>
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
              <Image className='img' onClick={this.handleFavorite} src={isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE} />
              <Text>{markes}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}