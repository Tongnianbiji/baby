import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PhotoItem from './photo-item'
import Cropper from '@components/cropper'
import './index.scss'

export default class PhotoPickerSetting extends Component {

  static defaultProps = {
    onGetFiles: () => ({}),
  }

  constructor(props) {
    super(props)

    this.state = {
      medias: [],
      showCropper: false,
      imagePath: ''
    }
  }

  choosePhoto = () => {
    console.log('选择照片')
    Taro.chooseImage({
      count: 1,
      success: result => {
        console.log(result, 'tempFilePaths');
        this.setState(prevState => ({
          imagePath: result.tempFilePaths[0],
          showCropper: true,
          // medias: prevState.medias.concat(result.tempFiles.map((media, index) => ({
          //   key: index + 1,
          //   path: media.path
          // })))
        }))
      }
    })
  }

  onGetFile = (file) => {
    this.props.onGetFiles(file)
  }

  closeCropper = () => {
    this.setState({
      showCropper: false
    })
  }

  saveCropperImage = (result) => {
    this.setState(prevState => ({
      imagePath: result.tempFilePath,
      showCropper: true,
      medias: prevState.medias.concat([{
        key: prevState.medias.length + 1,
        path: result.tempFilePath
      }]),
      showCropper: false
    }))
  }

  render() {
    const { showCropper, imagePath } = this.state;
    return (
      <View>
        <View className='photo-picker-view' onClick={this.choosePhoto.bind(this)}>
          {
            this.state.medias.map(media => (
              <PhotoItem model={media} key={media.key} onGetFile={this.onGetFile.bind(this)}/>
            ))
          }
        </View>
        {
          showCropper &&
          <Cropper imagePath={imagePath} onClose={this.closeCropper.bind(this)} onSaveCropperImage={this.saveCropperImage.bind(this)}></Cropper>
        }
      </View>
    )
  }
}