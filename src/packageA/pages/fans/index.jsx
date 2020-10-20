import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import NoData from '@components/no-data'
import UserCard from '@components/user-card'
import './index.scss'

export default class FansView extends Presenter {
  render() {
    const { listData } = this.state;
    return (
      <View className='fans-vewport'>
        {
          listData.length ?
            listData.map((item, n) => {
              return (
                <UserCard onGetUserDetail={this.getUserDetail.bind(this)} onSubscr={this.handleSubscr.bind(this)} model={item}></UserCard>
              )
            }) : <NoData></NoData>
        }
      </View>
    )
  }
}