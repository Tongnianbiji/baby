import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import Preloading from '@components/preloading'
import PostItem from '@components/post-card'
import NoticeCard from '@components/notice-card'
import './index.scss'

export default class ReplyMyPostView extends Presenter {
  constructor(props) {
    super(props)
  }
 
  render() {
    const { replyData,showReplyLoading,isReplyToBottom} = this.state;
    return (
      <View className='my-post-view'>
        {
          replyData.length ? 
          <View>
            {
              replyData.map((item)=>{
                return(
                  <NoticeCard onCardClick={this.handlePostDetail.bind(this,item.entity.pid)} isOldQuestion tip={true} type={''} isShowReleaseTime={false} data={item.entity} activeModel={item}/>
                )
              })
            }
            <Preloading showLoading={showReplyLoading} isToBottom={isReplyToBottom}></Preloading>
          </View> :null
          }
      </View>
    )
  }
}