import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Model from './model'
import './index.scss'

//const QrImg = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/image/mini/1606037467aliq.jpeg'

export default class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      QrImg:''
    }

  }

  componentWillMount() { }

  componentDidMount() { 
    this.getQrCode()
  }

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

  getQrCode = async ()=>{
    let res = await Model.getQrCode();
    console.log('res',res)
    this.setState({
      QrImg:res
    })
  }



  render() {
    const {QrImg} = this.state;
    return (
      <View className='qr-code'>
        {
          QrImg && 
          <View className='qr-code'>
            <Image onClick={this.preViewImage.bind(this,QrImg)} src={QrImg}></Image>
            <View>扫一扫上面的二维码图案，一起加入童年</View>
          </View>
        }
      </View>
    )
  }
}
