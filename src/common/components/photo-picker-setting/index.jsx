import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PhotoItem from './photo-item'

import './index.scss'

export default class PhotoPickerSetting extends Component {

  static defaultProps = {
    onGetFiles: () => ({}),
  }

  constructor(props) {
    super(props)

    this.state = {
      medias: []
    }
  }
 
  choosePhoto = () => {
    console.log('选择照片')
    Taro.chooseImage({
      count: 1,
      success: result => {
        console.log(result, 'tempFilePaths');
        this.setState(prevState => ({
          medias: prevState.medias.concat(result.tempFiles.map((media, index) => ({
            key: index + 1,
            path: media.path
          })))
        }))
      }
    })
  }

  onGetFile = (file) => {
      this.props.onGetFiles(file)
  }

  render() {
    return (
      <View className='photo-picker-view' onClick={this.choosePhoto.bind(this)}>
        {
          this.state.medias.map(media => (
            <PhotoItem model={media} key={media.key} onGetFile={this.onGetFile.bind(this)}/>
          ))
        }
      </View>
    )
  }
}