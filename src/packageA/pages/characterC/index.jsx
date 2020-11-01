import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class CharacterB extends Presenter {
  render() {
    const { chatacterList,inviter, babyName} = this.state;
    return (
      <View className='characterB-viewport'>
        <View className='header-wrapper'>{inviter}邀请你一起使用“童年”，共同关注{babyName}的成长</View>
        <View className='header-wrapper'></View>
        <View className='body-wrapper'>
          {
            chatacterList.map((item, index) => {
              return (
                <View className='item flex-between' key={item.role} onClick={this.selectRole.bind(this,item)}>
                  <View>{item.roleText}</View>
                  <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png'></Image>
                </View>
              )
            })
          }
        </View>
        {/* <View>暂不接受邀请，直接浏览</View> */}
      </View>
    )
  }
}
