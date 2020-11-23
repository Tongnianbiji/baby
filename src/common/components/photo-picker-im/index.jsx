import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import {ICONS} from '@common/constant'
import PhotoItem from './photo-item'
import './index.scss'

export default class PhotoPickerView extends Component {

  static defaultProps = {
    onGetFiles: () => ({}),
  }

  constructor(props) {
    super(props)

    this.state = {
      medias: [],
      showCropper:false
    }
  }
 
  choosePhoto = (e) => {
    e.stopPropagation();
    wx.chooseMedia({
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
    console.log('media',media)
    this.setState(prevState => ({
      medias: prevState.medias.filter(item => item.path != media.path)
    }))
  }
  onGetFile = (file) => {
      this.props.onGetFiles(file)
  }

  render() {
    return (
      <View className='photo-picker-view' onClick={this.choosePhoto.bind(this)}>
        {
          this.state.medias.map(media => (
            <PhotoItem model={media} key={media.key} onRemove={this.removePhoto.bind(this)} onGetFile={this.onGetFile.bind(this)}/>
          ))
        }
        <Image src={ICONS.IMG} className='plus-img' />
      </View>
    )
  }
}