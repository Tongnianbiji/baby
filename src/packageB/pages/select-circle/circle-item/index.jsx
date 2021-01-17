import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './circle-item.scss'
import staticData from '@src/store/common/static-data'
import AvatarHelper from '@common/utils/avatarHelper'

export default class CircleItem extends Component {
  getCircleDetail = (model) => {
    staticData.setTempSelectCircleItem(model);
    Taro.navigateBack();
  }

  render() {
    const { model } = this.props;
    return (
      <View className='comp-circle-item' onClick={this.getCircleDetail.bind(this, model)}>
        <View className='infos'>
          <View className='avatar-wrapper'>
            {AvatarHelper.getAvatar(model.imgUrl, model.name)}
          </View>
          <View className='title'>{model.name}</View>
        </View>
      </View>
    )
  }
}
