import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Image, Text, Input, Textarea } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { ICONS } from '@common/constant'
import './index.scss'
import { observer, inject } from 'mobx-react'
import Model from '../../model'
import PhotoPickerReply from '@components/photo-picker-reply'

@inject('postDetail','staticDataStore')
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
    const { getCurrentReplyPostData, detailData,updateCurrentplaceholder,updateFocusStatus,updateActiveFocusStatus,isToPostOwner,updateIsToPostOwnerStatus } = this.props.postDetail;
    const {isRegiste} = this.props.staticDataStore;
    if(isRegiste){
      // updateActiveFocusStatus(true);
      // updateFocusStatus(true);
      Taro.navigateTo({
        url:'/packageB/pages/reply-post/index'
      })
      updateIsToPostOwnerStatus(true);
      updateCurrentplaceholder('我有话要说');
      getCurrentReplyPostData(detailData);
      // if(isToPostOwner){
      //   updateCurrentplaceholder('我有话要说');
      //   getCurrentReplyPostData(detailData);
      // }
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  onBlur = () => {
    const { updateFocusStatus ,updateActiveFocusStatus, updateCurrentplaceholder,updateIsToPostOwnerStatus} = this.props.postDetail;
    //updateFocusStatus(false);
    //updateActiveFocusStatus(false);
    //updateCurrentplaceholder('我有话要说');
    updateIsToPostOwnerStatus(true)
  }

  colseReply = ()=>{
    const { updateFocusStatus ,updateActiveFocusStatus, updateCurrentplaceholder,updateIsToPostOwnerStatus} = this.props.postDetail;
    updateFocusStatus(false);
    updateActiveFocusStatus(false);
    updateCurrentplaceholder('我有话要说');
    updateIsToPostOwnerStatus(true)
  }

  getFiles = (file)=>{
    console.log('file',file)
    const {getFilesData} = this.props.postDetail;
    getFilesData(file)
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
          { 
              <View onClick={this.clickInput} className='input-wrapper'>
                <Textarea disabled value={replyContent} showConfirmBar={false} focus={isFocus} onBlur={this.onBlur} cursorSpacing={cursorSpacing} maxlength="-1" holdKeyboard className='input' placeholder={'我有话要说'} autoHeight={autoHeight} />
              </View>
              
          }
          
          {
            activeFocus ?
              <View className="reply-btn-wrap">
                <View>
                  <PhotoPickerReply onGetFiles={this.getFiles.bind(this)}>
                    <Image src={ICONS.IMG}></Image>
                  </PhotoPickerReply>
                </View>
               
                <AtButton onClick={this.submitReply} className="reply-btn" type='primary' size='small' circle="true">发布</AtButton>
              </View> : null
          }

        </View>
        {
          activeFocus ? 
            <View className='reply-wrap' onClick={this.colseReply.bind(this)}></View>
            : null
        }
        
      </View>


    )
  }
}