import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Presenter from './presenter'
import NoticeCard from '../../../common/components/notice-card'
import Preloading from '@components/preloading'
//import NoData from '@components/no-data'
import './index.scss'

export default class QAListView extends Presenter {
  render() {

    const { currentTab,questionData,answerData,showQuestionoading,showAnswerLoading,isQuestionToBottom ,isAnswerToBottom} = this.state;
    return (
      <View className='my-post-view'>
        <AtTabs tabList={this.state.tabList} current={currentTab} swipeable={false} className='tabs' onClick={this.tabChange}>
          <AtTabsPane className='i-release-pane' index={0} current={currentTab}>
            {
             
             questionData.length ? 
              <View>
                {
                  questionData.map((item)=>{
                    return (<NoticeCard isShowUserInfo={false} ishowAvatar={false} key={item.qid} data={item} type='qa' onHandleFavorite={this.handleFavoriteQuestion.bind(this)} data={item} />)
                  })
                }
              <Preloading showLoading={showQuestionoading} isToBottom={isQuestionToBottom}></Preloading>
              </View> :null
            }
          </AtTabsPane>
          <AtTabsPane className='i-reply-pane' index={1} current={currentTab}>
          {
             answerData.length ? 
             <View>
               {
                 answerData.map((item)=>{
                   return (<NoticeCard isShowTime isShowUserInfo={false} ishowAvatar={false} isOldQuestion isShowQuestion={false} type='qa'  key={item.qid} onHandleFavorite={this.handleFavoriteAnswer.bind(this)} isShowReleaseTime={false} activeModel={item} data={item.entity}/>)
                 })
               }
             <Preloading showLoading={showAnswerLoading} isToBottom={isAnswerToBottom}></Preloading>
             </View> :null
           }
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  } 
}

// return (
//   <View className='qa-list-vewport'>
//     {
//       [
//         {id: 1, name: '??????', msg: '??????', refrence: '??????????????????????????????????????????', time: '04/11'},
//         {id: 2, name: '??????', msg: '??????????????????', refrence: '??????????????????????????????????????????', time: '04/08'},
//         {id: 3, name: '?????????', msg: '???????????????????????????', refrence: '??????????????????????????????????????????', time: '04/11'}
//       ].map(item => {
//         return (
//           <NoticeCard isShowUserInfo={false} ishowAvatar={false} key={item.id} data={item} type='qa' />
//         )
//       })
//     }
//   </View>
// )
// }