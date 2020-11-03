import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { ICONS } from '../../common/constant'
import Presenter from './presenter'
import './index.scss'

export default class Index extends Presenter {
  render() {
    const { currentTab,total } = this.state;
    return (
      <View className='message-viewport'>
        {
          total && <View className="total">{total}</View>
        }
        <AtTabs tabList={this.state.tabList} current={currentTab} swipeable={false} className='tabs' onClick={this.tabChange}>
          <AtTabsPane className='message-tabs-pane' index={0} current={currentTab}>
            <View className='entry-wrapper'>
              <View className='entry' onClick={this.toFans}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-fans.png' className='icon' />
                <Text className='txt'>粉丝</Text>
              </View>
              <View className='entry' onClick={this.toCollect}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-like.png' className='icon' />
                <Text className='txt'>被收藏/获赞</Text>
              </View>
              <View className='entry' onClick={this.toPostReply}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-posts.png' className='icon' />
                <Text className='txt'>回贴</Text>
              </View>
              <View className='entry' onClick={this.toQaList}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-quesion.png' className='icon' />
                <Text className='txt'>回答</Text>
              </View>
            </View>
            <View className='message-list'>
              <View className='message-card' onClick={this.toSysMessage}>
                <View className='icon-wrapper'>
                  <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/messages.png' className='icon' />
                </View>
                <View className='infos'>
                  <Text className='title'>系统消息</Text>
                  <Text className='sub-title'>恭喜你完成了一篇记录与分享, 恭喜你完成了一篇记录与分享</Text>
                </View>
                <Image src={ICONS.ARROW_RIGHT_C} className='btn-more' />
              </View>
            </View>
          </AtTabsPane>
          <AtTabsPane className='message-tabs-pane' index={1} current={currentTab}>
            <View className='chat-list'>
              {
                [{ name: '张三', txt: '哈喽, 打个招呼', id: 1 },
                { name: '李四', txt: '哈喽, 打个招呼', id: 2 },
                { name: '赵六', txt: '哈喽, 打个招呼', id: 3 },
                { name: '张三', txt: '哈喽, 打个招呼', id: 4 },
                { name: '王五', txt: '回复: 哈喽, 打个招呼', id: 5 },
                { name: '张三', txt: '哈喽, 打个招呼', id: 6 },
                { name: '张三', txt: '哈喽, 打个招呼', id: 7 },
                { name: '张三', txt: '哈喽, 打个招呼', id: 8 },].map(item => {
                  return (
                    <View className='chat-item' key={item.id} onClick={this.toIM.bind(this, item)}>
                      <View className='avatar-wrapper'>
                        <View className='avatar'></View>
                      </View>
                      <View className='contents'>
                        <View className='ta-name'>
                          <Text className='txt'>{item.name}</Text>
                          <Text className='date'>04/05</Text>
                        </View>
                        <View className='chat-line'>
                          <Text className='chat'>{item.txt}</Text>
                          <Image src='' className='icon-reply' />
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }

  /**
   * 分享
   */
  onShareAppMessage() {
    return this.setShareOptions()
  }
}
