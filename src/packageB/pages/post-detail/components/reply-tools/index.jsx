import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Image, Text, Input, Textarea } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { ICONS } from '@common/constant'
import './index.scss'

export default class ReplyTools extends Component {
  static defaultProps = {
    info: {},
    isFocus: false,
    onBlur: () => { },
    onFocus: () => {}
  }
  constructor(props) {
    super(props)
    this.state = {
      activeFocus: false
    }
  }
  onFocus = () => {
    this.setState({
      activeFocus: true
    });
    this.props.onFocus()
  }
  onBlur = () => {
    this.setState({
      activeFocus: false
    });
    this.props.onBlur()
  }

  render() {
    const { activeFocus } = this.state;
    const { isFocus } = this.props;
    return (
      <View>
        <View className="reply">
          {
            activeFocus ?
              <View className="reply-tools">
                <Image src={ICONS.LIKE}></Image>
                <Image src={ICONS.DISLIKE}></Image>
                <Image src={ICONS.COPY}></Image>
                <Image src={ICONS.WARNING}></Image>
              </View>
              : null
          }

          <View className='input-wrapper'>
            <Textarea focus={isFocus} onFocus={this.onFocus} onBlur={this.onBlur} cursorSpacing="48" maxlength="-1" holdKeyboard className='input' placeholder='我有话要说' autoHeight />
          </View>
          {
            activeFocus ?
              <View className="reply-btn-wrap">
                <AtButton className="reply-btn" type='primary' size='small' circle="true">发布</AtButton>
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