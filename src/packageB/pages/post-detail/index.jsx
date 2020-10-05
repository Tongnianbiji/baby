import Taro from '@tarojs/taro'
import React from 'react'
import { View, Input } from '@tarojs/components'
import Presenter from './presenter'
import MainPanel from './components/main-panel'
import Comments from './components/comments'
import ReplyTools from './components/reply-tools'

import './index.scss'

export default class PostDetailView extends Presenter {
  config = {
    navigationBarTitleText: '加载中...'
  }

  render() {
    const { detailData, commentList, isFocus } = this.state
    return (
      <View className='post-detail-view'>
        <MainPanel info={detailData} />
        <Comments dataList={commentList}  selectSortType={this.getReplyList.bind(this)} onReplyPost={this.replyPost.bind(this)}/>
        <ReplyTools isFocus={isFocus} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}></ReplyTools>
      </View>
    )
  }
}