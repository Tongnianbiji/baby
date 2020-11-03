import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import NoticeCard from '../../../common/components/notice-card'
import Preloading from '@components/preloading'
import './index.scss'

export default class QAListView extends Presenter {
  render() {

    const { answerData,showAnswerLoading,isAnswerToBottom} = this.state;
    return (
      <View className='my-post-view'>
          {
            answerData.length ? 
            <View>
              {
                answerData.map((item)=>{
                  return (<NoticeCard isShowTime isShowUserInfo={false} ishowAvatar={false} isOldQuestion isShowQuestion={false} type='qa'  key={item.qid} onHandleFavorite={this.handleFavoriteAnswer.bind(this)} onNoticeClick={this.handlePostDetail.bind(this)} data={item.entity}/>)
                })
              }
            <Preloading showLoading={showAnswerLoading} isToBottom={isAnswerToBottom}></Preloading>
            </View> :null
           }
      </View>
    )
  } 
}