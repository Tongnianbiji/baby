import React from 'react'
import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import Preloading from '@components/preloading'
import PostCard from '@components/post-card'
import NoticeCard from '@components/notice-card'
import './index.scss'

export default class CollectsView extends Presenter {

  onShareAppMessage (res){
    let path= '';
    const userId = this.getUserInfo().userId;
    if (res.from === 'button') {
      console.log('自定义',res.target)
      const {pid,qid} =JSON.parse(res.target.id);
      if(pid){
        path = `/packageB/pages/post-detail/index?pid=${pid}&inviter=${userId}`
      }
      if(qid){
        path = `/packageB/pages/issue-detail/index?qid=${qid}&inviter=${userId}`
      }
    }
    return {
      title: `欢迎加入童年`,
      path:path
    }
  }

  render() {
    const { currentTab,collectData,likeData,showCollectLoading,showLikeLoading,isCollectToBottom ,isLikeToBottom } = this.state
    return (
      <View className='collects-vewport' style="overflow:hidden">
        <AtTabs tabList={this.state.tabList} className='tabs' current={currentTab} onClick={this.tabChange}>
          <AtTabsPane index={0} className='message-tabs-pane' current={currentTab}>
          {
             
             collectData.length ? 
             <View>
               {
                 collectData.map((item)=>{
                   return (
                     <View>
                       {item.type === 3005 &&
                         <PostCard onCardClick={this.handlePostDetail.bind(this,item.pid)} onHandleFavorite={this.handleFavorite.bind(this)} model={item.entity} closeRelease needShared/>
                       }
                       {item.type === 4005 &&
                        // <NoticeCard isShowUserInfo={false} isShowReleaseTime={false} ishowAvatar={false} needShared isOldQuestion isShowQuestion={false} data={item.entity} activeModel={item} onHandleFavorite={this.handleFavorite.bind(this)} type='qa'></NoticeCard>
                        <NoticeCard isShowUserInfo={false} needShared ishowAvatar={false} data={item.entity} activeModel={item} onHandleFavorite={this.handleFavorite.bind(this)} type='qa'></NoticeCard>
                       }
                     </View>
                   )
                 })
               }
             <Preloading showLoading={showCollectLoading} isToBottom={isCollectToBottom}></Preloading>
             </View> :null
           }
          </AtTabsPane>
          <AtTabsPane index={1} className='message-tabs-pane' current={currentTab}>
          {
             
             likeData.length ? 
             <View>
               {
                 likeData.map((item)=>{
                   
                   return (
                    <View>
                      {
                        item.type === 3008 &&
                        <PostCard onHandleLike={this.handleLike.bind(this)} onCardClick={this.handlePostDetail.bind(this,item.pid)} activeModel={item} model={item.entity} isShowTools={false} isMyReply closeRelease needLike/>
                      }
                      {
                        item.type === 4008 &&
                        <NoticeCard data={item.entity} activeModel={item} needLike isShowReleaseTime={false} isShowUserInfo={false} ishowAvatar={false} isShowTools={false} isShowAnswer isOldQuestion isShowQuestion={false} onHandleLike={this.handleLike.bind(this)} type='qa'></NoticeCard>
                      }
                    </View>
                    
                   )
                 })
               }
             <Preloading showLoading={showLikeLoading} isToBottom={isLikeToBottom}></Preloading>
             </View> :null
           }
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}