import React from 'react'
import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import Preloading from '@components/preloading'
import NoticeCard from '@components/notice-card'
import './index.scss'

export default class PassiveCollectsView extends Presenter {

  // onShareAppMessage (res){
  //   let path= '';
  //   if (res.from === 'button') {
  //     console.log('自定义',res.target)
  //     const {pid,qid} =JSON.parse(res.target.id);
  //     if(pid){
  //       path = `/packageB/pages/post-detail/index?pid=${pid}`
  //     }
  //     if(qid){
  //       path = `/packageB/pages/issue-detail/index?qid=${qid}`
  //     }
  //   }
  //   return {
  //     title: `欢迎加入童年`,
  //     path:path
  //   }
  // }

  render() {
    const { currentTab,collectData,likeData,showCollectLoading,showLikeLoading,isCollectToBottom ,isLikeToBottom, mark,star} = this.state
    return (
      <View className='collects-vewport' style="overflow:hidden">
        {
          !!mark && <View className="mark">{mark}</View>
        }
        {
          !!star && <View className="star">{star}</View>
        }
        <AtTabs tabList={this.state.tabList} className='tabs' current={currentTab} onClick={this.tabChange}>
          <AtTabsPane index={0} className='message-tabs-pane' current={currentTab}>
          {
             collectData.length ? 
             <View>
               {
                collectData.filter(item => !!item.entity).map((item)=>{
                   return (<NoticeCard type={''} isShowReleaseTime={false} tip={true} data={item.entity} activeModel={item}/>)
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
                likeData.filter(item => !!item.entity).map((item)=>{
                  return (<NoticeCard type={''} isOldQuestion isShowReleaseTime={false} tip={true} data={item.entity} activeModel={item}/>)
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