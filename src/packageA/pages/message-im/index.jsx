import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Textarea, ScrollView, Video } from '@tarojs/components'
import PhotoPickerIm from '@components/photo-picker-im'
import {ICONS} from '@common/constant'
import Presenter from './presenter'
import './index.scss'

export default class MessageIMView extends Presenter {
  render() {
    const { scrollStyle, messageList, activeFocus, inputValue, inputBoxBottom, holdKeyboard, scrollTop, isFocus } = this.state;
    const { userId } = this.getUserInfo()
    return (
      <View className='message-im-viewport'>
        <View>
          <ScrollView
            className='chat-box'
            scrollY
            style={scrollStyle}
            onClick={this.clickChatBox.bind(this)}
            scrollWithAnimation
            lowerThreshold='200'
            // onScrollToLower={this.onScrollToLower.bind(this)}
            // onScrollToUpper={this.onScrollToUpper.bind(this)}
            onScrollToUpper={this.onScrollToLower.bind(this)}
            onScrollToLower={this.onScrollToUpper.bind(this)}
            onScroll={this.onScroll.bind(this)}
            scrollTop={scrollTop}
          >
            {
              messageList.map(item => {
                return (
                  <View className="chat-rotate-wraper">
                    {
                      item.uid === userId ?
                        <View className="chat-box-item-right">
                          <View className="chat-box-item-right-content">
                            <View className="nickname">{item.nickName}</View>
                            {
                              !item.files.type && item.content && 
                              <View selectable={true} className="content">{item.content}
                              {
                                item.isBlock &&
                                <Image className="block" src={ICONS.BLOCK} onClick={this.blockInfo.bind(this)}></Image>
                              }
                              </View>
                            }
                            {
                              item.files.type == 1 && 
                              <View style={{marginTop:'20px'}}>
                                <Image onClick={this.preViewImage.bind(this,item.files.url)} style={{maxWidth:'200px'}} src={item.files.url}></Image>
                              {
                                item.isBlock &&
                                <Image className="block" src={ICONS.BLOCK} onClick={this.blockInfo.bind(this)}></Image>
                              }
                              </View>
                            }

                            {
                              item.files.type == 2 && 
                              <View style={{marginTop:'20px'}}>
                                <Video style={{maxWidth:'200px'}} src={item.files.url}></Video>
                              {
                                item.isBlock &&
                                <Image className="block" src={ICONS.BLOCK} onClick={this.blockInfo.bind(this)}></Image>
                              }
                              </View>
                            }
                            
                          </View>
                          <Image className="chat-box-item-right-img" onClick={this.viewProfileInfo.bind(this,item.uid)} src={item.headImg}></Image>
                        </View>
                        :
                        <View className="chat-box-item-left">
                          <Image className="chat-box-item-left-img" onClick={this.viewProfileInfo.bind(this,item.uid)} src={item.headImg}></Image>
                          <View className="chat-box-item-left-content">
                            <View className="nickname">{item.nickName}</View>
                            {
                              item.content && 
                              <Text selectable={true} className="content">{item.content}</Text>
                            }
                            {
                              item.files.type == 1 && 
                              <Image onClick={this.preViewImage.bind(this,item.files.url)} style={{maxWidth:'200px'}} src={item.files.url}></Image>
                            }
                            {
                              item.files.type == 2 && 
                              <Video style={{maxWidth:'200px'}} src={item.files.url}></Video>
                            }
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
          <Textarea value={inputValue} className="input-box-textarea" focus={isFocus} fixed placeholder="请输入" showConfirmBar={false} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} onInput={this.inputMessage.bind(this)} cursorSpacing={128} autoHeight maxlength="-1" adjustPosition={true} holdKeyboard={holdKeyboard} />
          <PhotoPickerIm onGetFiles={this.getFiles.bind(this)}></PhotoPickerIm>
          {
            activeFocus && 
            <View className="input-box-btn" onClick={this.publishText.bind(this)}>发送</View>
          }
        </View>
      </View>
    )
  }
}