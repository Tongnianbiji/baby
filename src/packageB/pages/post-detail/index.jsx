import Taro, {useShareAppMessage} from '@tarojs/taro'
import React from 'react'
import { Provider } from 'mobx-react'
import { View, Input } from '@tarojs/components'
import Presenter from './presenter'
import MainPanel from './components/main-panel'
import Comments from './components/comments'
import ReplyTools from './components/reply-tools'
import './index.scss'

export default class PostDetailView extends Presenter {
  config = {
    navigationBarTitleText: '加载中...',
    enableShareAppMessage: true
  }

  

  share = (pid)=>{
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems:['wechatFriends','wechatMoment']
    })
  }

  render() {
    const { replys, postDetail } = this.state;
    const store = {
      postDetail
    }
    return (
      <Provider {...store}>
        <View className='post-detail-view'>
          <MainPanel onShare={this.share.bind(this)}/>
          <Comments replys={replys} selectSortType={this.getReplyList.bind(this)} onReplyPost={this.replyPost.bind(this)} />
          <ReplyTools onCopyContent={this.copyContent} onInputReply={this.inputReply.bind(this)} onSubmitReply={this.submitReply}></ReplyTools>
        </View>
      </Provider>
    )
  }
}