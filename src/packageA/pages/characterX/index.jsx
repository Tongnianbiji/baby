import React from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Textarea } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class CharacterX extends Presenter {
  render() {
    const { role, from} = this.state;
    return (
      <View className='characterX-viewport'>
        <View className='character-input-wrapper'>
          <Textarea className='character-input width-100' placeholderClass='character-input-placeholder' onInput={this.inputRole.bind(this)} value={role} placeholder='填写身份'></Textarea>
        </View>
        {
          from == 'me' ? 
            <View openType="getUserInfo" className='character-btn-wrapper' onClick={this.setRole.bind(this)}>
              <View className='character-btn flex-center'>确认</View>
            </View>
          :
            <Button openType="getUserInfo" className='character-btn-wrapper' onGetUserInfo={this.nextStep.bind(this)}>
              <View className='character-btn flex-center'>确认</View>
            </Button>
        }
    
      </View>
    )
  }
}
