import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtSwipeAction } from 'taro-ui'
import Presenter from './presenter'
import './index.scss'

export default class MessageSystemView extends Presenter {
  config = {
    navigationBarTitleText: '系统消息'
  }

  render() {
    const {messageList} = this.state;
    return (
      <View className='message-sys-viewport'>
        <View className='container'>
          {
            messageList.map((item,index)=>{
              return(
                <AtSwipeAction className="message-action" onClick={this.deleteMessage.bind(this,item)} options={[
                  {
                    text: '删除',
                    style: {
                      backgroundColor: '#FF473A'
                    }
                  }
                ]}>
                  <View className='message-card' key={index}>
                    <View className='icon-wrapper'>
                      <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/messages.png' className='icon' />
                    </View>
                    <View className='infos'>
                      <View className='title'>
                        <View className='txt'>系统消息</View>
                        <View className='time'>5分钟前</View>
                      </View>
                      <View className='sub-title'>恭喜你完成了一篇记录与分享，发布优质内容可以获得更多的赞哦，更有机会获得达人特权！</View>
                    </View>
                  </View>
                </AtSwipeAction>
              )
            })
          }
        </View>
      </View>
    )
  }
}