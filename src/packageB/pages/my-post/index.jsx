import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Presenter from './presenter'
import PostItem from '@components/post-card'
import Preloading from '@components/preloading'
import NoData from '@components/no-data'

import './index.scss'

export default class MyPostView extends Presenter {
  constructor(props) {
    super(props)
  }

  render() {
    const { currentTab,postData,replyData,showPostLoading,showReplyLoading,isPostToBottom ,isReplyToBottom} = this.state;
    return (
      <View className='my-post-view'>
        <AtTabs tabList={this.state.tabList} current={currentTab} swipeable={false} className='tabs' onClick={this.tabChange}>
          <AtTabsPane className='i-release-pane' index={0} current={currentTab}>
            {
             
              postData.length ? 
              <View>
                {
                  postData.map((item)=>{
                    return (<PostItem model={item} closeRelease onlyReleaseTime />)
                  })
                }
              <Preloading showLoading={showPostLoading} isToBottom={isPostToBottom}></Preloading>
              </View> :<NoData></NoData>
            }
          </AtTabsPane>
          <AtTabsPane className='i-reply-pane' index={1} current={currentTab}>
          {
             replyData.length ? 
             <View>
               {
                 replyData.map((item)=>{
                   return (<PostItem model={item} closeRelease onlyReleaseTime />)
                 })
               }
             <Preloading showLoading={showReplyLoading} isToBottom={isReplyToBottom}></Preloading>
             </View> :<NoData></NoData>
           }
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}