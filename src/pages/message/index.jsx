import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSwipeAction } from 'taro-ui'
import { ICONS } from '../../common/constant'
import Preloading from '@components/preloading'
import Presenter from './presenter'
import { observer, inject } from 'mobx-react'
import './index.scss'

@inject('staticDataStore')
@observer
export default class Index extends Presenter {
  render() {
    const { isGuide } = this.props.staticDataStore

    const { currentTab, total, answer, unreadTotalCount,
      funs,
      mark,
      reply,
      star,
      chatList,
      showLoading,
      isToBottom,
      systemMessageList,
    } = this.state;
    return (
      <View className='message-viewport'>
        {
          !!total && <View className="total">{total}</View>
        }
        {unreadTotalCount ? <View className="unread-total">{unreadTotalCount}</View> : ''}
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
              {systemMessageList.map(item => (
                <View className='message-card' onClick={this.toSysMessage.bind(this, item.content)}>
                  <View className='icon-wrapper'>
                    <Image src={ICONS.SYSTEM} className='icon' />
                  </View>
                  <View className='infos'>
                    <Text className='title'>系统消息</Text>
                    <Text className='sub-title'>{item.content}</Text>
                  </View>
                  <Text className='date'>{item.createDt}</Text>
                  {/* <Image src={ICONS.ARROW_RIGHT_C} className='btn-more' /> */}
                </View>
              ))}
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
                            {item.unreadCount ? <View className='unread-count'>{item.unreadCount}</View>:''}
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
        {
          isGuide ?
            this.guide() : null
        }
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
