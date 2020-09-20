import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.scss'

export default class PhotoPickerView extends Component {

  constructor() {
    super()

    this.state = {
      photos: []
    }
  }

  choosePhoto = () => {
    Taro.chooseImage({
      count: 9,
      success: result => {
        console.log(result.tempFilePaths, 'tempFilePaths');
        this.setState(prevState => ({
          photos: prevState.photos.concat(result.tempFilePaths.map((path, index) => ({
            key: index + 1,
            path
          })))
        }))
      }
    })
  }

  render() {
    const photoCount = this.state.photos.length
    return (
      <View className='photo-picker-view'>
        {
          this.state.photos.map(photo => (
            <View className='img-item' key={photo.key}>
              <Image src={photo.path} className='img' />
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png' className='btn-remove' />
            </View>
          ))
        }
        <View className='btn-add' onClick={this.choosePhoto}>
          <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/add-c.png' className='plus-img' />
          {photoCount && <View className='btn-tip'>还能选{9 - photoCount}张</View>}
        </View>
        {!photoCount && <View className='tips'>最多可上传九个照片或视频</View>}
      </View>
    )
  }
}