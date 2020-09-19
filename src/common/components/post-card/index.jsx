import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { ICONS } from '../../constant'
import './styles.scss'

export default class UserInfoItem extends Component {
  static defaultProps = {
    // 数据
    model: {},
    // 是否显示 [分享] 按钮
    needShared: false,
    // 是否显示 [距离]
    needDistance: false,
    // 是否显示左下角 [圈子信息]
    countryAble: true,
    // 是否在头像左边显示 [排位]
    showOrder: false,
    // 最上面 预留的槽位
    preContent: null,
    // 是否关闭 发布信息 那一行
    closeRelease: false,
    // 是否为问答 卡
    isAnwser: false,
    onClick: () => {}
  }

  cardClick = () => {
    this.props.onClick(this.model)
  }
  
  render() {
    return (
      <View className='ui-user-info-item' onClick={this.cardClick}>
        { this.props.children }
        <View className='main-wrapper'>
          {
            !this.props.closeRelease &&
            <View className='release-info'>
              <Text className='release'>李庭语妈妈发布了贴子 | 2小时前</Text>
              <View className='info'>
                {
                  this.props.needDistance && <View className='distance-info'>0.9km</View>
                }
                {
                  this.props.needShared && <Image className='btn-share' src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                }
              </View>
            </View>
          }
          <View className='user-info'>
            {
              this.props.showOrder &&
                <View className='order'>
                  <Image className='icon-order' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/ranking.png' />
                  <Text>1</Text>
                </View>
            }
            <View className='avatar'></View>
            <View className='infos'>
              <View className='name-area'>
                <Text className='name'>李庭语妈妈</Text>
                <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
                <Text className='years-old'>3岁9个月</Text>
                {
                  this.props.closeRelease && this.props.needShared &&
                  <Image className='btn-share' src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                }
              </View>
              <Text className='times'>2020-03-29 21:29:00</Text>
            </View>
          </View>
          {
            this.props.isAnwser ?
            <View className='content answer-wrapper'>
              <View className='answer'>
                <View className='icon'>问</View>
                <View className='txt'>济阳三村最近可以交娃的社保了吗？</View>
              </View>
              <View className='answer'>
                <View className='icon'>答</View>
                <View className='txt'>可以了，11月以后就可以交了</View>
              </View>
            </View> : <Text className='content'>济阳三村幼儿园怎么样，算比较好的幼儿园吗？</Text>
          }
          <View className='tags'>
            {
              this.props.countryAble &&
              <View className='community-area'>
                <Text className='community-name'>上海 新城</Text>
              </View>
            }
            <View className='tips'>
              <View className='views'>
                <Image className='img' src={ICONS.PREVIEW} />
                <Text>12</Text>
              </View>
              <View className='comment'>
                <Image className='img' src={ICONS.COMMENT} />
                <Text>12</Text>
              </View>
              <View className='favorite'>
                <Image className='img' src={ICONS.FAVORITE} />
                <Text>12</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}