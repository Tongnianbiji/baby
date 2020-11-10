import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Textarea, ScrollView } from '@tarojs/components'
import {ICONS} from '@common/constant'
import Presenter from './presenter'
import './index.scss'

export default class MessageIMView extends Presenter {

  render() {
    const { scrollStyle, messageList, activeFocus, inputValue, inputBoxBottom,holdKeyboard } = this.state;
    const { userId } = this.getUserInfo()
    return (
      <View className='message-im-viewport'>
        <View>
          <ScrollView
            className='chat-box'
            scrollY
            style={scrollStyle}
            scrollWithAnimation
            onScrollToLower={this.onScrollToLower.bind(this)}
          >
            {
              messageList.map(item => {
                return (
                  <View>
                    {
                      item.uid === userId ?
                        <View className="chat-box-item-right">
                          <View className="chat-box-item-right-content">
                            <View className="nickname">{item.nickName}</View>
                            <View selectable={true} className="content">{item.content}
                            {
                              item.isBlock &&
                              <Image className="block" src={ICONS.BLOCK}></Image>
                            }
                            </View>
                          </View>
                          <Image className="chat-box-item-right-img" onClick={this.viewProfileInfo.bind(this,item.uid)} src={item.headImg}></Image>
                        </View>
                        :
                        <View className="chat-box-item-left">
                          <Image className="chat-box-item-left-img" src={item.headImg}></Image>
                          <View className="chat-box-item-left-content">
                            <View className="nickname">{item.nickName}</View>
                            <Text selectable={true} className="content">{item.content}</Text>
                          </View>
                        </View>
                    }
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <View className="input-box" style={{bottom:`${inputBoxBottom}px`}}>
          <Textarea value={inputValue} className="input-box-textarea" adjustPosition={false} fixed placeholder="请输入" showConfirmBar={false} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} onInput={this.inputMessage.bind(this)} cursorSpacing={50} autoHeight maxlength="-1"  holdKeyboard={holdKeyboard} />
          {
            activeFocus && 
            <View className="input-box-btn" onClick={this.publishMessage.bind(this)}>发送</View>
          }
        </View>
      </View>
    )
  }
}