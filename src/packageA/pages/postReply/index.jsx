import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import UINoticeCard from '../../../common/components/notice-card'
import './index.scss'

export default class PostReplyView extends Presenter {
  config = {
    navigationBarTitleText: '回贴'
  }

  render() {
    return (
      <View className='post-reply-vewport'>
        {
          [
            {id: 1, name: '张三', msg: '同问', refrence: '济阳三村幼儿园什么时候开学啊', time: '04/11'},
            {id: 2, name: '李四', msg: '应该是明天吧', refrence: '济阳三村幼儿园什么时候开学啊', time: '04/08'},
            {id: 3, name: '赵老六', msg: '等疫情真过去再说吧', refrence: '济阳三村幼儿园什么时候开学啊', time: '04/11'}
          ].map(item => {
            return (
              <UINoticeCard key={item.id} data={item} />
            )
          })
        }
      </View>
    )
  }
}