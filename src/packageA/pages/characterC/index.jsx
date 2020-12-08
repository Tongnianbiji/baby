import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image, Button } from '@tarojs/components'
import Presenter from './presenter'
import staticData from '@src/store/common/static-data'
import './index.scss'

export default class CharacterB extends Presenter {
  render() {
    const { chatacterList, inviter, babyName, newInvtKey } = this.state;
    const {isRegiste} = staticData;
    return (
      <View>
        {
          (isRegiste || newInvtKey) &&
          <View className='characterB-viewport'>
            <View className='header-wrapper'>{inviter}邀请你一起使用“童年”，共同关注{babyName}的成长</View>
            <View className='header-wrapper'></View>
            <View className='body-wrapper'>
              {
                chatacterList.map((item, index) => {
                  return (
                    <Button openType="getUserInfo" className='item flex-between' key={item.role} onGetUserInfo={this.selectRole.bind(this, item)}>
                      <View>{item.roleText}</View>
                      <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png'></Image>
                    </Button>
                  )
                })
              }
            </View>
            {/* {
              newInvtKey && 
              <View className='next-btn-wrapper'>
                <Button openType="getUserInfo" className={['next-btn', 'active']} onGetUserInfo={this.nextStep.bind(this)}>下一步</Button>
              </View>
            } */}
          </View>
        }
      </View>

    )
  }
}
