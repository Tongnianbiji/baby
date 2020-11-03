import React, { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileBaby extends Presenter {
 
  
  render() {
    const { familyMember, otherMember } = this.state;
    return (
      <View className='profile-family-viewport'>
        {
          familyMember.map((item, index) => {
            return (
              <View key={`item_${item.userId}_${index}`} className='item' onClick={this.onClickNavTo.bind(this, item.userId)}>
                <View style="display:flex;align-items:center;">
                  <Image className='item-avatar' src={item.avatar} />
                  <View className='item-txt'>
                    <View>{item.roleText ? `${item.nickName}(${item.roleText})` : item.nickName}</View>
                    <View>{item.createDt}</View>
                  </View>
                </View>
                <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
              </View>
            )
          })
        }
        <View className='other-wrapper '>
          <View className='other-tips'>您还可以邀请</View>
          <View className='other-items'>
            {
              otherMember.map((item, index) => {
                return (
                  <View style="margin-right:5px">
                    <Button open-type="share" className='other-item' key={`item_${item.role}_${index}`}>{item.roleText || '其他'}</Button>
                  </View>
                  
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
