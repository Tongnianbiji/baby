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
                answerData.filter(item => !!item.entity).map((item)=>{
                  return (<NoticeCard onCardClick={this.handlePostDetail.bind(this,item.entity.pid)} type={''} isOldQuestion tip={true}  isShowReleaseTime={false} data={item.entity} activeModel={item}/>)
                })
              }
            <Preloading showLoading={showAnswerLoading} isToBottom={isAnswerToBottom}></Preloading>
            </View> :null
           }
      </View>
    )
  } 
}