import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Textarea, ScrollView, Image } from '@tarojs/components'
import MediaPicker from '@components/photo-picker'
import Presenter from './presenter'
// import TagScrollView from '@components/tag-scroll-view1'
import { observer, inject } from 'mobx-react'

import './index.scss'
const moveX = 30;
const tagListWarpWidth = 326;

@inject('circleDetailStore')
@observer
export default class CreatePostView extends Presenter {
  config = {
    navigationBarTitleText: ''
  }


  onTouchStart = (e) => {
    this.setTagListWidth();
    this.setState({
      startPageX: e.touches[0].pageX
    })
  }
  onTouchMove = (e) => {
    const { startPageX, scrollLeft, tagListWidth } = this.state;
    if (startPageX - e.touches[0].pageX > 0) {
      console.log('向左滑')
      if (scrollLeft <= 0 && scrollLeft > tagListWarpWidth - tagListWidth) {
        this.setState(pre => ({
          scrollLeft: pre.scrollLeft - moveX
        }))
      }
    } else {
      console.log('向右滑')
      if (scrollLeft < 0)
        this.setState(pre => ({
          scrollLeft: pre.scrollLeft + moveX
        }))
    }

  }
  setTagListWidth = (callback) => {
    const query = Taro.createSelectorQuery();
    query.select('.tag-list').boundingClientRect(rec => {
      this.setState({
        tagListWidth: rec.width
      }, callback)
    }).exec()
  }
  manualOnScroll = () => {
    this.setTagListWidth(() => {
      const { scrollLeft, tagListWidth } = this.state;
      if (scrollLeft <= 0 && scrollLeft > tagListWarpWidth - tagListWidth) {
        this.setState(pre => ({
          scrollLeft: pre.scrollLeft - moveX
        }))
      }
    });
  }

  render() {
    const { canSave, name, content, tagList, selectedTag, showTip, scrollLeft, isManual } = this.state
    return (
      <View className='create-post-view'>
        <View className='input-wrapper'>
          <Input className='title' value={name} placeholder='请输入帖子正文(至少5个字)' onInput={this.nameInput} />
          <Textarea
            value={content}
            onInput={this.contentInput}
            className='content'
            placeholder='请输入高质量的帖子，可以更高效进行交流~(至少5个字)'
          ></Textarea>
          {
            showTip &&
            <View className='tip'>
              <View>1.请尽量保持文字简洁</View>
              <View>2.高质量的帖子，可以更高效进行交流</View>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png' className='btn-close' onClick={this.hideTip} />
            </View>
          }
        </View>
        <View className='photo-picker-wrapper'>
          <MediaPicker onGetFiles={this.getFiles.bind(this)} />
        </View>
        
        {/* <View className='tag-wrapper'>
          <View >
            <View onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} className="tag-list-wrap">
              <View className='tag-list' style={{ left: scrollLeft + 'px' }}>
                {
                  tagList.map(item => (
                    <View key={item.tagId} className={`tag-item${selectedTag.includes(item.tagId) ? ' tag-item-active' : ''}`} onClick={this.tagClick.bind(this, item)}>{item.tagName}</View>
                  ))
                }
              </View>
            </View>
            <View className='right-arrow'>
              <Image onClick={this.manualOnScroll.bind(this)} className='arrow-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-b.png' />
            </View>
          </View>
        </View> */}

        {/* <TagScrollView tags={tagList} activeTags={selectedTag} onSelectTag={this.tagClick.bind(this)}>
            <View className='tag-list'>
                {
                  tagList.map(item => (
                    <View id={item.scrollId} key={item.tagId} className={`tag-item${selectedTag.includes(item.tagId) ? ' tag-item-active' : ''}`} onClick={this.tagClick.bind(this, item)}>{item.tagName}</View>
                  ))
                }
            </View>
        </TagScrollView> */}
        {
          !!tagList.length && 
          <View>
            <View className='tag-tips'>＋添加一个合适的帖子类别，可以提高帖子的点击率哦</View>
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