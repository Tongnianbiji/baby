import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { ICONS } from '../../constant'
export default class DropDown extends Component {
  static defaultProps = {
    title:'标题',
  }
  constructor(props) {
    super(props)
    this.state = {
      showDropMueu:false
    }
  }

  dropMenu = () => {
    this.setState(pre => ({
      showDropMueu :!pre.showDropMueu
    }))
  }


  render() {
    const { title } = this.props;
    const { showDropMueu } = this.state;
    return (
      <View className="drop-down">
        <View className='drop-down-btn' onClick={this.dropMenu}>
          {title}
          <Image src={showDropMueu ? ICONS.ARROW_UP : ICONS.ARROW_DOWN} className='down-arrow' />
        </View>
        {
          showDropMueu ?
          <View className="drop-down-list">
            {this.props.children}
          </View> : null
        }
       
      </View>
    )
  }
}