import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {View, Text, Image,Canvas, Button} from '@tarojs/components'
import './index.scss'

export default class Cropper extends Component {

  static defaultProps = {
    imagePath:'',
    onClose:()=>{},
    onSaveCropperImage:()=>{}
  }

  constructor(props) {
    super(props);
    this.state = {
      canvasWidth:'',
      canvasHeight:'',
      imageHeight:200,
      startX:0,
      startY:0
    }
  }

  componentDidMount(){
    const res = Taro.getSystemInfoSync();
    this.setState(pre=>({
      canvasWidth:res.windowWidth,
      canvasHeight:res.windowHeight
    }),()=>{
      this.drawCanvas()
    })
  }

  componentDidShow(){
    
  }

  TouchStart = (e)=>{
    let startP = e.touches[0];
    this.setState(pre=>({
      startX:startP.x,
      startY:startP.y
    }))
  }

  TouchMove = (e) =>{
    const {startX,startY} = this.state;
    let moveP = e.touches[0];
    this.drawCropper(startX,startY,moveP.x-startX,moveP.y-startY)
  }

  TouchEnd = ()=>{

  }

  cancel = ()=>{
    this.props.onClose()
  }

  confirm = ()=>{
    this.sevePicture((res)=>{
      this.props.onSaveCropperImage(res)
    })
  }

  drawCanvas = ()=>{
    const { canvasHeight, canvasWidth,imageHeight } = this.state;
    const {imagePath} = this.props;
    const cvsCtx = Taro.createCanvasContext('cropper', this.$scope);
    // cvsCtx.setFillStyle('white')
    // cvsCtx.fillRect(0, 0, canvasWidth, canvasHeight)
    // cvsCtx.setFontSize(14)
    //cvsCtx.fillStyle = "black"; 　
    // cvsCtx.fillRect(0, 0, canvasWidth, canvasHeight); 
    // cvsCtx.setFillStyle('black')
    cvsCtx.drawImage(imagePath, 0,0,canvasWidth, imageHeight);
    cvsCtx.draw();
 } 

 drawCropper = (x,y,w,h)=>{
  const { canvasHeight, canvasWidth, imageHeight } = this.state;
  const {imagePath} = this.props;
  const cvsCtx = Taro.createCanvasContext('cropper', this.$scope);
  // cvsCtx.fillRect(0, 0, canvasWidth, canvasHeight); 
  // cvsCtx.setFillStyle('black')
  cvsCtx.drawImage(imagePath, 0,0,canvasWidth, imageHeight);
  cvsCtx.rect(x,y,w,h);
  this.setState({
    cropperW:w,
    cropperH:h
  })
  cvsCtx.stroke();
  cvsCtx.draw();
 }

 sevePicture = (callback)=>{
  const { startX, startY, cropperW,cropperH } = this.state;
    Taro.canvasToTempFilePath({ // 调用小程序API对canvas转换成图
      x: startX, // 开始截取的X轴
      y: startY, // 开始截取的Y轴
      width: cropperW, // 开始截取宽度
      height: cropperH,  // 开始截取高度
      destWidth: cropperW*2,  // 截取后图片的宽度（避免图片过于模糊，建议2倍于截取宽度）
      destHeight: cropperH*2, // 截取后图片的高度（避免图片过于模糊，建议2倍于截取宽度）
      canvasId: 'cropper', // 截取的canvas对象
      success: (res) => { // 转换成功生成临时链接并调用保存方法
        // this.setState({
        //   tempFilePath: res.tempFilePath
        // })
        callback(res)
      },
      fail: (res) => {
        console.log('绘制临时路径失败')
      }
    }, this.$scope)
 }

 


  render() {
    const {canvasWidth,canvasHeight,imageHeight} = this.state;
    return (
      <View className='cropper' style={{width:`${canvasWidth}px`,height:`${canvasHeight}px`}} >
        <Canvas className='cropper-canvas' 
        onTouchStart={this.TouchStart.bind(this)}
        onTouchMove={this.TouchMove.bind(this)} 
        onTouchEnd={this.TouchEnd.bind(this)}
        disableScroll={true}
        style={{width:`${canvasWidth}px`,height:`${imageHeight}px`,top:`${(canvasHeight-imageHeight)/2}px`}} 
        canvasId='cropper' />
        <View className='btn-wrap'>
          <Button className="btn-cancel" onClick={this.cancel.bind(this)}>取消</Button>
          <Button className="btn-confirm" onClick={this.confirm.bind(this)}>确认</Button>
        </View>
        
      </View>
    )
  }
}