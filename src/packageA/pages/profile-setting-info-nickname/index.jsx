import Taro, { Component } from '@tarojs/taro'
import { View, Image, Textarea } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileSettingInfoNickName extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '昵称',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    return (
      <View className='profile-setting-info-nickname-viewport'>
        <View className='item-input-wrapper'>
          <Textarea className='item-input width-100' placeholderClass='item-input-placeholder' placeholder='小静妈妈'></Textarea>
        </View>
        <View className='item-label-wrapper'>
          一个月只能修改一次昵称，请谨慎修改
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center'>提交</View>
        </View>
      </View>
    )
  }
}
