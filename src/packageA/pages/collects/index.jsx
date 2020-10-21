import React from 'react'
import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import Preloading from '@components/preloading'
import PostCard from '@components/post-card'
import NoData from '@components/no-data'
import './index.scss'

export default class CollectsView extends Presenter {
  render() {
    const { currentTab,collectData,likeData,showCollectLoading,showLikeLoading,isCollectToBottom ,isLikeToBottom } = this.state
    return (
      <View className='collects-vewport'>
        <AtTabs tabList={this.state.tabList} className='tabs' current={currentTab} onClick={this.tabChange}>
          <AtTabsPane index={0} className='message-tabs-pane' current={currentTab}>
          {
             
             collectData.length ? 
             <View>
               {
                 collectData.map((item)=>{
                   return (<PostCard onCardClick={this.handlePostDetail.bind(this,item.pid)} model={item} closeRelease needShared/>)
                 })
               }
             <Preloading showLoading={showCollectLoading} isToBottom={isCollectToBottom}></Preloading>
             </View> :<NoData></NoData>
           }
          </AtTabsPane>
          <AtTabsPane index={1} className='message-tabs-pane' current={currentTab}>
          {
             
             likeData.length ? 
             <View>
               {
                 likeData.map((item)=>{
                   return (<PostCard onHandleLike={this.handleLike.bind(this)} onCardClick={this.handlePostDetail.bind(this,item.pid)} model={item} isShowTools={false} isMyReply closeRelease needLike/>)
                 })
               }
             <Preloading showLoading={showLikeLoading} isToBottom={isLikeToBottom}></Preloading>
             </View> :<NoData></NoData>
           }
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}