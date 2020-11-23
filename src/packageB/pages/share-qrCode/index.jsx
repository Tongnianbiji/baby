import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Barcode, QRCode } from 'taro-code'
import './index.scss'

const QrImg = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/image/mini/1606037467aliq.jpeg'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  preViewImage = (url,e)=>{
    e.stopPropagation();
    let urls = [url];
    Taro.previewImage({
      current: url,
      urls: urls
    })
  }



  render() {
    return (
      <View className='qr-code'>
       <Image onClick={this.preViewImage.bind(this,QrImg)} src={QrImg}></Image>
       <View>扫一扫上面的二维码图案，一起加入童年</View>
      </View>
    )
  }
}
