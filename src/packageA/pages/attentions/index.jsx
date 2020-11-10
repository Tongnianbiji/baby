import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'

import UserCard from '@components/user-card'
import './index.scss'

export default class AttentionsView extends Presenter {
 
  render() {
    const { listData,isSelf } = this.state;
    return (
      <View className='fans-vewport'>
        {
          listData.length ?
          listData.map((item, n) => {
              return (
                <UserCard tip='关注' isShowTip={isSelf} onGetUserDetail={this.getUserDetail.bind(this,item)} onSubscr={this.handleSubscr.bind(this)} model={item}></UserCard>
              )
            }) : null
        }
      </View>
    )
  }
}