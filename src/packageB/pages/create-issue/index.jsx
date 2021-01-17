import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Textarea, ScrollView, Image } from '@tarojs/components'
import PhotoPicker from '@components/photo-picker'
import Presenter from './presenter'
import TagScrollView from '@components/tag-scroll-view1'
import { observer, inject } from 'mobx-react'
import './index.scss'


@inject('circleDetailStore')
@observer
export default class CreateIssueView extends Presenter {
  config = {
    navigationBarTitleText: ''
  }

  render() {
    const { content, showTip, tagList, selectedTag, canSave, isSelectCircleControlShow, selectedCircle } = this.state
    return (
      <View className='create-issue-view'>
        <View className='input-wrapper'>
          <Textarea
            value={content}
            onInput={this.contentInput}
            className='content'
            placeholder='热心家长们会帮你解答哦~'
          ></Textarea>
          {
            showTip &&
            <View className='tip'>
              <View>1.请尽量保持文字简洁</View>
              <View>2.高质量的提问，会提高问题的回答率</View>
              <View>3.确保问题没有被重复提问过</View>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png' className='btn-close' onClick={this.hideTip} />
            </View>
          }
        </View>
        <View className='photo-picker-wrapper'>
          <PhotoPicker onGetFiles={this.getFiles.bind(this)} />
        </View>
        {isSelectCircleControlShow &&
          <View className='item' onClick={this.toSelectCircle.bind(this)}>
            <View className='item-label'>
              <View className='item-txt'>选择圈子</View>
            </View>
            <View className='item-value'>
              {
                selectedCircle ? <View className='item-txt'>{selectedCircle}</View>
                  : <View className='item-txt'>请选择</View>
              }
              <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
            </View>
          </View>
        }
        {
          !!tagList.length &&
          <View>
            <View className='tag-tips'>＋添加一个合适的问题类别，可以提高问题的回答率哦</View>
            <View className='tag-wrapper'>
              <View className='scroll-wrapper'>
                <ScrollView scrollX>
                  <View className='tag-list'>
                    {
                      tagList.map(item => (
                        <View key={item.tagId} className={`tag-item${selectedTag.includes(item.tagId) ? ' actived' : ''}`} onClick={this.tagClick.bind(this, item)}>{item.tagName}</View>
                      ))
                    }
                  </View>
                </ScrollView>
                <View className='right-arrow'>
                  <Image className='arrow-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-b.png' />
                </View>
              </View>

              {/* <TagScrollView tags={tagList} activeTags={selectedTag} onSelectTag={this.tagClick.bind(this)}>
            <View className='tag-list'>
                {
                  tagList.map(item => (
                    <View id={item.scrollId} key={item.tagId} className={`tag-item${selectedTag.includes(item.tagId) ? ' tag-item-active' : ''}`} onClick={this.tagClick.bind(this, item)}>{item.tagName}</View>
                  ))
                }
            </View>
        </TagScrollView> */}
            </View>
          </View>
        }

        <View className='btn-wrapper'>
          <View className={`btn-save${canSave ? '' : ' can-not-save'}`} onClick={this.doSubmit.bind(this)}>提交</View>
        </View>
      </View>
    )
  }
}