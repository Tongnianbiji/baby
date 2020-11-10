import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import UserCard from '@components/user-card'
import './index.scss'

export default class FansView extends Presenter {
  render() {
    const { listData,isSelf } = this.state;
    return (
      <View className='fans-vewport'>
        {
          listData.length ?
            listData.map((item, n) => {
              return (
                <UserCard onGetUserDetail={this.getUserDetail.bind(this,item)} isShowTip={isSelf} onSubscr={this.handleSubscr.bind(this)} model={item}></UserCard>
              )
            }) : null
        }
      </View>
    )
  }
}