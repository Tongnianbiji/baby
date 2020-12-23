import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import React, { Component } from 'react'
import AvatarHelper from '@common/utils/avatarHelper'
import './style.scss'

export default class CircleItem extends Component {
  static defaultProps = {

  }

  constructor(props) {
    super(props)
  }

  findMore = () => {
    const { cid, name } = this.props
    Taro.navigateTo({ url: `/packageA/pages/more-circle/index?cid=${cid}&cname=${name}&isSearch=1`})
  }

  gotoCircleDetail = () => {
    const { cid, name } = this.props
    Taro.navigateTo({ url: `/packageA/pages/circle-detail/index?cid=${cid}&cname=${name}` })
  }

  render() {
    const { name, subscribe, posts, questions, leaf, descript, imgUrl, isMiddleAvatar} = this.props;
    return (
      <View className='comp-circle-item' onClick={this.gotoCircleDetail}>
        <View className='base-info'>
          <View className='avatar-wrapper'>
            {AvatarHelper.getAvatar(imgUrl, name, isMiddleAvatar?'middle':'big')}
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
          !leaf && <View className='more' onClick={this.findMore.bind(this)}>发现更多&gt;</View>
        }
      </View>
    )
  }
}