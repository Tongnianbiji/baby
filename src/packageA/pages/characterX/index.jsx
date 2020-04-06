import Taro, { Component } from '@tarojs/taro'
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
    return (
      <View className='characterX-viewport'>
        <View className='character-input-wrapper'>
          <Textarea className='character-input width-100' placeholderClass='character-input-placeholder' placeholder='填写身份'></Textarea>
        </View>

        <View className='character-btn-wrapper'>
          <View className='character-btn flex-center'>下一步</View>
        </View>
      </View>
    )
  }
}
