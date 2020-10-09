import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Image, Text, Input, Textarea } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { ICONS } from '@common/constant'
import './index.scss'
import { observer, inject } from 'mobx-react'
import Model from '../../model'

@inject('postDetail')
@observer
export default class ReplyTools extends Component {
  static defaultProps = {
    info: {},
    replyContent: '',
    onSubmitReply: () => { },
    onInputReply: () => { },
    onCopyContent: () => {}
  }
  constructor(props) {
    super(props)
    this.state = {
      showMax:false,
      autoHeight:true,
      cursorSpacing:348
    }
  }

  inputReply = (e) => {
    this.props.onInputReply(e.detail.value)
  }

  submitReply = () => {
    this.props.onSubmitReply()
  }

  copyContent = () => {
    this.props.onCopyContent()
  }
  clickInput = () => {
    this.props.onClickInput()
  }

  handleLike = async () => {
    const { handleLike } = this.props.postDetail;
    handleLike()
  }

  handleDisLike = async () => {
    const { handleDisLike } = this.props.postDetail;
    handleDisLike()
    
  }

  report = () => {
    Taro.showToast({
      title: '接口开发中',
      icon:'none'
    })
  }

  clickInput = () => {
    const { getCurrentReplyPostData, detailData,updateCurrentplaceholder,updateFocusStatus,updateActiveFocusStatus,isToPostOwner } = this.props.postDetail;
    
    updateActiveFocusStatus(true);
    updateFocusStatus(true);
    if(isToPostOwner){
      updateCurrentplaceholder('我有话要说');
      getCurrentReplyPostData(detailData);
    }
  }

  onBlur = () => {
    const { updateFocusStatus ,updateActiveFocusStatus, updateCurrentplaceholder,updateIsToPostOwnerStatus} = this.props.postDetail;
    updateFocusStatus(false);
    updateActiveFocusStatus(false);
    updateCurrentplaceholder('我有话要说');
    updateIsToPostOwnerStatus(true)
  }

  render() {
    const {showMax, autoHeight, cursorSpacing} = this.state;
    const { replyContent } = this.props;
    const { placeholder, isFocus, activeFocus } = this.props.postDetail;
    return (
      <View>
        <View className="reply" style={{height:showMax ? '100%':null}}>
          {
            activeFocus ?
              <View className="reply-tools">
                <Image onClick={this.handleLike} src={ICONS.LIKE}></Image>
                <Image onClick={this.handleDisLike} src={ICONS.DISLIKE}></Image>
                <Image onClick={this.copyContent} src={ICONS.COPY}></Image>
                <Image onClick={this.report} src={ICONS.WARNING}></Image>
              </View>
              : null
          }

          {/**
            activeFocus ? 
              <View className='input-wrapper'>
                <Textarea value={replyContent} onInput={this.inputReply} focus={isFocus} onBlur={this.onBlur} cursorSpacing="48" maxlength="-1" holdKeyboard className='input' placeholder={placeholder} autoHeight />
              </View>
              :
              <View onClick={this.clickInput} className='input-wrapper'>
                <Input maxlength="-1" className='input' placeholder='我有话要说' />
              </View>
               */
          }

          { 
              <View onClick={this.clickInput} className='input-wrapper'>
                <Textarea style={{height:!autoHeight ? '200px' : null}} value={replyContent} onInput={this.inputReply} showConfirmBar={false} focus={isFocus} onBlur={this.onBlur} cursorSpacing={cursorSpacing} maxlength="-1" holdKeyboard className='input' placeholder={placeholder} autoHeight={autoHeight} />
              </View>
              
          }
          
          {
            activeFocus ?
              <View className="reply-btn-wrap">
                <Image src={ICONS.IMG}></Image>
                <AtButton onClick={this.submitReply} className="reply-btn" type='primary' size='small' circle="true">发布</AtButton>
              </View> : null
          }

        </View>
        {
          activeFocus ? 
            <View className='reply-wrap'></View>
            : null
        }
        
      </View>


    )
  }
}