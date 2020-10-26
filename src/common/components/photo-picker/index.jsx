import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PhotoItem from './photo-item'
import Cropper from '@components/cropper'
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
 
  choosePhoto = () => {
    wx.chooseMedia({
      count: 9,
      success: result => {
        console.log(result, 'tempFilePaths');
        
        this.setState(prevState => ({
          //showCropper:true,

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
    const photoCount = this.state.medias.length;
    const {showCropper} =this.state;
    return (
      <View className='photo-picker-view'>
        {
          this.state.medias.map(media => (
            <PhotoItem model={media} key={media.key} onRemove={this.removePhoto.bind(this)} onGetFile={this.onGetFile.bind(this)}/>
          ))
        }
        <View className='btn-add' onClick={this.choosePhoto}>
          <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/add-c.png' className='plus-img' />
          {!!photoCount && <View className='btn-tip'>还能选{9 - photoCount}张</View>}
        </View>
        {!photoCount && <View className='tips'>最多可上传九个照片或视频</View>}

        {
          showCropper &&
          <Cropper></Cropper>
        }
      </View>
    )
  }
}