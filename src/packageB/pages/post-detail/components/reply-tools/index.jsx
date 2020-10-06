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
    const { updateCurrentReplyLikes, currentReplyPost, isToPostOwner } = this.props.postDetail;
    const { pid, replyId, parentRid } = currentReplyPost;
    let params = {
      likes: 1,
      isLikes:true
    }
    if (!currentReplyPost.isDislikes && !isToPostOwner) {
      if (currentReplyPost.isLikes) {
        params.likes = -1;
        params.isLikes = false;
        const d = await Model.postLikeCancel(pid, replyId, parentRid);
      } else {
        const d = await Model.postLike(pid, replyId, parentRid);
      }
      Taro.vibrateShort();
      Taro.showToast({
        title:`点赞${params.likes}`,
        icon:'none'
      })
      updateCurrentReplyLikes(params)
    }
   
  }

  handleDisLike = async () => {
    const { updateCurrentReplyDisLikes, currentReplyPost, isToPostOwner } = this.props.postDetail;
    const { pid, replyId, parentRid } = currentReplyPost;
    let params = {
      dislikes: 1,
      isDislikes:true
    }
    if (!currentReplyPost.isLikes && !isToPostOwner) {
      if (currentReplyPost.isDislikes) {
        params.dislikes = -1;
        params.isDislikes = false;
        const d = await Model.postDislikeCancel(pid, replyId, parentRid);
      } else {
        const d = await Model.postDislike(pid, replyId, parentRid);
      }
      Taro.vibrateShort();
      Taro.showToast({
        title:`点踩${params.dislikes}`,
        icon:'none'
      })
      updateCurrentReplyDisLikes(params)
    }
    
  }

  report = () => {
    Taro.showToast({
      title: '接口开发中',
      icon:'none'
    })
  }

  clickInput = () => {
    const { getCurrentReplyPostData, detailData,updateCurrentplaceholder,updateFocusStatus,updateActiveFocusStatus,isToPostOwner } = this.props.postDetail;
    getCurrentReplyPostData(detailData);
    updateActiveFocusStatus(true);
    updateFocusStatus(true);
    if(isToPostOwner){
      updateCurrentplaceholder('我有话要说');
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
    const { replyContent } = this.props;
    const { placeholder, isFocus, activeFocus } = this.props.postDetail;
    return (
      <View>
        <View className="reply">
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
                <Textarea value={replyContent} onInput={this.inputReply} focus={isFocus} onBlur={this.onBlur} cursorSpacing="48" maxlength="-1" holdKeyboard className='input' placeholder={placeholder} autoHeight />
              </View>
              
          }
          
          {
            activeFocus ?
              <View className="reply-btn-wrap">
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