import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileBabyDetai extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '大宝',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    return (
      <View className='profile-baby-viewport'>
        <View className='item'>
          <View className='item-label item-txt'>宝宝小名</View>
          <View className='item-value'>
            <View className=' item-txt'>宝宝小名</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png' />
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center'>添加新宝宝</View>
        </View>
      </View>
    )
  }
}
