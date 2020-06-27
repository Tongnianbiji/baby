import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileSetting extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '设置',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    return (
      <View className='profile-setting-viewport'>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'edit')}>
          <View className='item-label'>
            <View className='item-txt'>编辑信息</View>
          </View>
          <View className='item-value'>
            <View className='item-circle'></View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'privacy')}>
          <View className='item-label'>
            <View className='item-txt'>隐私设置</View>
          </View>
          <View className='item-value'>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center' onClick={this.onClickNavTo.bind(this, 'logout')}>退出登陆</View>
        </View>
      </View>
    )
  }
}
