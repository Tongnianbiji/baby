import React from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import Presenter from './presenter'
import MainPanel from './components/main-panel'
import Comments from './components/comments'

import './index.scss'

export default class IssueDetailView extends Presenter {
  config = {
    navigationBarTitleText: '...加载中'
  }

  render() {
    return (
      <View className='issue-detail-view'>
        <MainPanel />
        <Comments />
        <View className='btns'>
          <Button className='btn'>我要回答</Button>
          <Button className='btn'>邀请好友回答</Button>
        </View>
      </View>
    )
  }
}