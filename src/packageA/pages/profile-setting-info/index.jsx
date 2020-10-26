import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image,Canvas } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'
import PhotoPickerSetting from '@components/photo-picker-setting'

export default class ProfileSettingInfo extends Presenter {

  constructor(props){
    super(props);
  }

  render() {
    const {headImg, theme, nickName, signature,canSave,isShowNext} = this.state;
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
              <View className='item-txt'>签名</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>{signature}</View>
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

      {
        isShowNext ? 
        <View className='next-btn-wrapper'>
          <View className={['next-btn','active']} style={{opacity:(nickName&&headImg) ? 1 : .49}} onClick={this.nextStep.bind(this)}>下一步</View>
        </View>

        : 
        <View className='next-btn-wrapper'>
          <View className={['next-btn','active']} style={{opacity:(nickName&&headImg) ? 1 : .49}} onClick={this.confrim.bind(this)}>确认</View>
        </View>
      }
        
      </View>
    )
  }
}
