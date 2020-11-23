import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSwipeAction } from 'taro-ui'
import { ICONS } from '../../common/constant'
import Preloading from '@components/preloading'
import Presenter from './presenter'
import './index.scss'

export default class Index extends Presenter {
  render() {
    const { currentTab, total, answer,
      funs,
      mark,
      reply,
      star,
      chatList,
      showLoading,
      isToBottom
     } = this.state;
    return (
      <View className='message-viewport'>
        {
          !!total && <View className="total">{total}</View>
        }
        <AtTabs tabList={this.state.tabList} current={currentTab} swipeable={false} className='tabs' onClick={this.tabChange}>
          <AtTabsPane className='message-tabs-pane' index={0} current={currentTab}>
            <View className='entry-wrapper'>
              <View className='entry' onClick={this.toFans}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-fans.png' className='icon' />
                <Text className='txt'>粉丝</Text>
                {
                  !!funs &&
                  <View className="bubble">{funs}</View>
                }
              </View>
              <View className='entry' onClick={this.toCollect}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-like.png' className='icon' />
                <Text className='txt'>被收藏/获赞</Text>
                {
                  !!(mark + star) &&
                  <View className="bubble">{mark + star}</View>
                }
              </View>
              <View className='entry' onClick={this.toPostReply}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-posts.png' className='icon' />
                <Text className='txt'>回贴</Text>
                {
                  !!reply &&
                  <View className="bubble">{reply}</View>
                }
              </View>
              <View className='entry' onClick={this.toQaList}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-quesion.png' className='icon' />
                <Text className='txt'>回答</Text>
                {
                  !!answer &&
                  <View className="bubble">{answer}</View>
                }
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
                chatList.map((item,index) => {
                  return (
                    <AtSwipeAction className="chat-action" onClick={this.deleteChat.bind(this,item)} options={[
                      {
                        text: '删除',
                        style: {
                          backgroundColor: '#FF473A'
                        }
                      }
                    ]}>
                      <View key={index} className="chat-item" onClick={this.toIM.bind(this, item)}>
                        <View className='avatar-wrapper'>
                          <View className='avatar'>
                            <Image src={item.toUser.headImg}></Image>
                          </View>
                        </View>
                        <View className='contents'>
                          <View className='ta-name'>
                            <Text className='txt'>{item.toUser.nickName}</Text>
                            <Text className='date'>{item.messageDo.updateAt}</Text>
                          </View>
                          <View className='chat-line'>
                            <Text className='chat'>{item.messageDo.content}</Text>
                            <Image src='' className='icon-reply' />
                          </View>
                        </View>
                      </View>
                    </AtSwipeAction>
                  )
                })
              }
              <Preloading showLoading={showLoading} isToBottom={isToBottom}></Preloading>
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
