import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Textarea, ScrollView, Image } from '@tarojs/components'
import { AtCheckbox } from 'taro-ui'
import PhotoPicker from '@components/photo-picker'
import Presenter from './presenter'
import { observer, inject } from 'mobx-react'
import { ICONS } from '@common/constant'
import './index.scss'
import postDetail from '../post-detail/store/post-detail'

export default class ReplyPost extends Presenter {
  render() {
    const {checkedList,checkboxOption,reason} = this.state;
    return(
      
      <View className='profile-setting-info-viewport'>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>选择原因</View>
          </View>
          <View className='item-value'>
            <AtCheckbox
              options={checkboxOption}
              selectedList={checkedList}
              onChange={this.handleChange.bind(this)}
            />
          </View>
        </View>

        <View className='item' style={{marginTop:'18px'}}>
          <View className='item-value'>
            <Textarea value={reason} onInput={this.inputReason.bind(this)} className='text-area' placeholder='请输入补充说明' autoHeight/>
          </View>
        </View>
        <View className='next-btn-wrapper'>
          <View className={['next-btn','active']} onClick={this.submit.bind(this)}>提交</View>
        </View>
      </View>
    )
    
  }
}