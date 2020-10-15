import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Textarea, ScrollView, Image } from '@tarojs/components'
import PhotoPicker from '@components/photo-picker'
import Presenter from './presenter'
import { observer, inject } from 'mobx-react'
import { ICONS } from '@common/constant'
import './index.scss'
import postDetail from '../post-detail/store/post-detail'

export default class ReplyPost extends Presenter {
  config = {
    navigationBarTitleText: ''
  }

  render() {
    const { content, canSave } = this.state;
    const {placeholder} = postDetail;
    return (
      <View className='create-issue-view'>
        <View className='input-wrapper'>
          <Textarea
            value={content}
            onInput={this.contentInput.bind(this)}
            className='content'
            placeholder={placeholder}
          ></Textarea>
          {/* {
            showTip &&
            <View className='tip'>
              <View>1.请尽量保持文字简洁</View>
              <View>2.高质量的提问，会提高问题的回答率</View>
              <View>3.确保问题没有被重复提问过</View>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png' className='btn-close' onClick={this.hideTip} />
            </View>
          } */}
        </View>
        <View className='photo-picker-wrapper'>
          <PhotoPicker onGetFiles={this.getFiles.bind(this)} />
        </View>
        {/* <View className="reply-tools">
          <Image onClick={this.handleLike.bind(this)} src={ICONS.LIKE}></Image>
          <Image onClick={this.handleDisLike.bind(this)} src={ICONS.DISLIKE}></Image>
          <Image onClick={this.copyContent.bind(this)} src={ICONS.COPY}></Image>
          <Image onClick={this.report.bind(this)} src={ICONS.WARNING}></Image>
        </View> */}
        <View className='btn-wrapper'>
          <View className="reply-tools">
            <Image onClick={this.report.bind(this,)} src={ICONS.WARNING}></Image>
          </View>
          <View className={`btn-save${canSave ? '' : ' can-not-save'}`} onClick={this.doSubmit.bind(this)}>提交</View>
        </View>
      </View>
    )
  }
}