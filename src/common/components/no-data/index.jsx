import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import { ICONS } from '../../constant'
import './index.scss'

export default class NoData extends Component {

  static defaultProps = {
    
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className='no-data'>
        <Image className='no-data-img' src={ICONS.NODATA}></Image>
      </View>
    )
  }
}