import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Textarea } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class CharacterX extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '填写身份'
  }

  render() {
    const {role} = this.state;
    return (
      <View className='characterX-viewport'>
        <View className='character-input-wrapper'>
          <Textarea className='character-input width-100' placeholderClass='character-input-placeholder' onInput={this.inputRole.bind(this)} value={role} placeholder='填写身份'></Textarea>
        </View>

        <View className='character-btn-wrapper' onClick={this.nextStep.bind(this)}>
          <View className='character-btn flex-center'>下一步</View>
        </View>
      </View>
    )
  }
}
