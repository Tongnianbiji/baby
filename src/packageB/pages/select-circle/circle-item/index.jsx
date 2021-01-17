import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './circle-item.scss'
import AvatarHelper from '@common/utils/avatarHelper'

export default class CircleItem extends Component {

  static defaultProps = {
    model: {},
    onSubscribe: () => { },
    onGetCircleDetail: () => { }
  }

  subscribe = (model, e) => {
    e.stopPropagation();
    this.props.onSubscribe(model)
  }
  getCircleDetail = (model) => {
    this.props.onGetCircleDetail(model)
  }


  render() {
    const { model, model: { name, description, imgUrl, isSubscribe, subscribe, posts, questions, cid }, isSimpleMode } = this.props;
    return (
      <View className='comp-circle-item' onClick={this.getCircleDetail.bind(this, model)}>
        <View className='infos'>
          <View className='avatar-wrapper'>
            {AvatarHelper.getAvatar(imgUrl, name)}
          </View>
          <View className='title'>{name}</View>
        </View>
      </View>
    )
  }
}
