import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'
import PhotoPickerSetting from '@components/photo-picker-setting'

export default class ProfileSettingInfo extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '设置',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  constructor(props){
    super(props);
    this.state = {
      nickName:'',
      signature:'',
      headImg:'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/male.png',
      theme:'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/male.png'
    }
  }

  getHeadFile = (file)=>{
    this.setState({
      headImg:file.url
    })
  }

  getThemeFile = (file)=>{
    this.setState({
      theme:file.url
    })
  }

  render() {
    const {headImg, theme, nickName, signature} = this.state;
    return (
      <View className='profile-setting-info-viewport'>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>头像</View>
          </View>
          <View className='item-value'>
            <View className='item-circle' style={{backgroundImage:`url(${headImg})`}}>
              <PhotoPickerSetting onGetFiles={this.getHeadFile.bind(this)}></PhotoPickerSetting>
            </View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'nickname')}>
          <View className='item-label'>
            <View className='item-txt'>昵称</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>{nickName}</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.onClickNavTo.bind(this, 'signature')}>
          <View className='item-label'>
              <View className='item-txt'>{signature}</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>家有两只吞金兽</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>设置主页背景</View>
          </View>
          <View className='item-value'>
            <View className='item-range' style={{backgroundImage:`url(${theme})`}}>
              <PhotoPickerSetting onGetFiles={this.getThemeFile.bind(this)}></PhotoPickerSetting>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
