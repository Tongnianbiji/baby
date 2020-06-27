import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileAbout extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '关于我们',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    return (
      <View className='profile-baby-viewport'>
        <View className='logo-wrapp'>
          <Image className='img-logo' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/tn_logo.png' />
        </View>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'base')}>
          <View className='item-label'>
            <View className='item-txt'>关于童年</View>
          </View>
          <View className='item-value'>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'agreements')}>
          <View className='item-label'>
            <View className='item-txt'>用户协议</View>
          </View>
          <View className='item-value'>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'privacy')}>
          <View className='item-label'>
            <View className='item-txt'>隐私政策</View>
          </View>
          <View className='item-value'>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
      </View>
    )
  }
}
