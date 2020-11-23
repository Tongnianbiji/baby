import React from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'mobx-react'
import { View, Button } from '@tarojs/components'
import Presenter from './presenter'
import MainPanel from './components/main-panel'
import Comments from './components/comments'
import issueDetailStore from './store/issue-detail'
import CustomTitle from '@components/custom-title'
import './index.scss'

export default class IssueDetailView extends Presenter {

  share = ()=>{
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems:['wechatFriends','wechatMoment']
    })
  }

  render() {
    const {isCanEntranceCircle,issueDetail,isShowBack } = this.state;
    const store = {
      issueDetailStore
    }
    return (
      <Provider {...store}>
        <CustomTitle title={issueDetail.cName || '问答详情'} isCanEntranceCircle={isCanEntranceCircle} isShowBack={isShowBack} onEntrancePage={this.entrancePage.bind(this)}></CustomTitle>
        <View className='issue-detail-view' style={{marginTop:`59px`}}>
          <MainPanel onShare={this.share.bind(this)}/>
          <Comments />
          <View className='btns'>
            <Button className='btn' onClick={this.goAnswer.bind(this)}>我要回答</Button>
            <Button className='btn' open-type='share'>邀请好友回答</Button>
          </View>
        </View>
      </Provider>
    )
  }
}