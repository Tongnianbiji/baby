import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PhotoItem from './photo-item'

import './index.scss'

export default class PhotoPickerView extends Component {

  constructor() {
    super()

    this.state = {
      medias: []
    }
  }

  choosePhoto = () => {
    Taro.chooseMedia({
      count: 9,
      success: result => {
        console.log(result, 'tempFilePaths');
        this.setState(prevState => ({
          medias: prevState.medias.concat(result.tempFiles.map((media, index) => ({
            key: index + 1,
            type: result.type,
            path: result.type === 'video' ? media.thumbTempFilePath : media.tempFilePath,
            file: media.tempFilePath
          })))
        }))
      }
    })
  }

  removePhoto = (media) => {
    this.setState(prevState => ({
      medias: prevState.medias.filter(item => item.key != media.key)
    }))
  }

  render() {
    const photoCount = this.state.medias.length
    return (
      <View className='photo-picker-view'>
        {
          this.state.medias.map(media => (
            <PhotoItem model={media} key={media.key} onRemove={this.removePhoto} />
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