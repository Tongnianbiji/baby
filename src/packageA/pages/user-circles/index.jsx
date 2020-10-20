import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'
import NoData from '@components/no-data'
import CircleItem from './circle-item'

export default class CirclesView extends Presenter {
  config = {
    navigationBarTitleText: '圈子'
  }

  render() {
    const {circlesList} = this.state;
    return (
      <View className='circles-vewport'>
        {
          circlesList.length ?
          circlesList.map((item,n) => {
            return (
             <CircleItem onGetCircleDetail={this.getCircleDetail.bind(this)} onSubscribe={this.onUpdateCircle.bind(this)} key={n} model={item}></CircleItem>
            )
          }) : <NoData></NoData>
        }
      </View>
    )
  }
}