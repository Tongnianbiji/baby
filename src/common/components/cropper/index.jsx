import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image, Canvas, Button, CoverView } from '@tarojs/components'
import './index.scss'

export default class Cropper extends Component {

  static defaultProps = {
    imagePath: '',
    onClose: () => { },
    onSaveCropperImage: () => { },
    scale:1
  }

  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: '',
      canvasHeight: '',
      imageHeight: 200,
      startX: 0,
      startY: 0,
      defaultCropperWidth:200,
      cropperX:0,
      cropperY:0,
      topRightX:0,
      topRightY:0,
      bottomLeftX:0,
      bottomLeftY:0,
      bottomRightX:0,
      bottomRightY:0,
      isCanMove:false,
      isCanZoom:false,
      zoomTL:false,
      zoomTR:false,
      zoomBL:false,
      zoomBR:false,
      lockCropper:false,
      offsetScaleX:1,
      offsetScaleY:1
    }
  }

  componentDidMount() {
    const res = Taro.getSystemInfoSync();
    this.setState(pre => ({
      canvasWidth: res.screenWidth,
      canvasHeight: res.screenHeight
    }), () => {
      this.drawCanvas()
    })
  }

  componentDidShow() {}

  TouchStart = (e) => {
    const {lockCropper} = this.state;
    let startP = e.touches[0];
    if(!lockCropper){
      this.setState(pre => ({
        startX: startP.x,
        startY: startP.y
      }))
    }
  }

  TouchMove = (e) => {
    const { startX, startY,cropperX,cropperY,lockCropper} = this.state;
    const {scale} = this.props;
    const moveP = e.touches[0];
    const {x,y} = moveP;
    let moveX = x-startX,
    moveY = y-startY;
    this.judgeTouchArea(startX, startY,()=>{
      const {isCanMove,isCanZoom,zoomTL,zoomTR,zoomBL,zoomBR} = this.state;
      if(isCanMove){
        this.moveCropper(cropperX+moveX, cropperY+moveY)
      }
      if(isCanZoom){
        if(zoomTL){
          this.zoomCropper(cropperX+moveX, cropperY+moveX/scale, -moveX, -moveX/scale)
        }
        else if(zoomTR){
          this.zoomCropper(cropperX, cropperY-moveX/scale, moveX, moveX/scale)
        }
        else if(zoomBL){
          this.zoomCropper(cropperX+moveX, cropperY, -moveX, -moveX/scale)
        }
        else if(zoomBR){
          this.zoomCropper(cropperX, cropperY, moveX, moveX/scale)
        }
      }
    }) 
  }

  TouchEnd = (e) => {
    const { startX, startY,cropperX,cropperY,cropperW,cropperH,lockCropper} = this.state;
    const {scale} = this.props;
    const endP = e.changedTouches[0];
    if(!lockCropper){
      this.judgeTouchArea(startX, startY,()=>{
        const {isCanMove,isCanZoom,zoomTL,zoomTR,zoomBL,zoomBR} = this.state;
        if(isCanMove){
          this.setState({
            cropperW:cropperW,
            cropperH:cropperH,
            cropperX:cropperX + endP.x-startX,
            cropperY:cropperY + endP.y-startY,
            topRightX:cropperX + endP.x-startX + cropperW,
            topRightY:cropperY + endP.y-startY,
            bottomLeftX:cropperX + endP.x-startX,
            bottomLeftY:cropperY + endP.y-startY+cropperH,
            bottomRightX:cropperX + endP.x-startX+cropperW,
            bottomRightY:cropperY + endP.y-startY+cropperH,
          })
        }
  
        if(isCanZoom){
          if(zoomTL){
            this.setState({
              cropperW:cropperW-(endP.x-startX),
              cropperH:cropperH-(endP.x-startX)/scale,
              cropperX:cropperX + endP.x-startX,
              cropperY:cropperY + (endP.x-startX)/scale,
              topRightX:cropperX + cropperW,
              topRightY:cropperY + (endP.x-startX)/scale,
              bottomLeftX:cropperX + endP.x-startX,
              bottomLeftY:cropperY + cropperH,
              bottomRightX:cropperX + cropperW,
              bottomRightY:cropperY + cropperH,
            })
          }
          else if(zoomTR){
            this.setState({
              cropperW:cropperW+(endP.x-startX),
              cropperH:cropperH+(endP.x-startX)/scale,
              cropperX:cropperX,
              cropperY:cropperY + endP.y-startY,
              topRightX:cropperX + cropperW + (endP.x-startX),
              topRightY:cropperY + (endP.x-startX)/scale,
              bottomLeftX:cropperX,
              bottomLeftY:cropperY + cropperH,
              bottomRightX:cropperX + cropperW + (endP.x-startX),
              bottomRightY:cropperY + cropperH,
            })
          }
          else if(zoomBL){
            this.setState({
              cropperW:cropperW-(endP.x-startX),
              cropperH:cropperH-(endP.x-startX)/scale,
              cropperX:cropperX+(endP.x-startX),
              cropperY:cropperY,
              topRightX:cropperX + cropperW,
              topRightY:cropperY,
              bottomLeftX:cropperX+(endP.x-startX),
              bottomLeftY:cropperY + cropperH - (endP.x-startX)/scale,
              bottomRightX:cropperX + cropperW,
              bottomRightY:cropperY + cropperH - (endP.x-startX)/scale,
            })
          }
          else if(zoomBR){
            this.setState({
              cropperW:cropperW+(endP.x-startX),
              cropperH:cropperH+(endP.x-startX)/scale,
              cropperX:cropperX,
              cropperY:cropperY,
              topRightX:cropperX + cropperW +(endP.x-startX) ,
              topRightY:cropperY,
              bottomLeftX:cropperX,
              bottomLeftY:cropperY + cropperH + (endP.x-startX)/scale,
              bottomRightX:cropperX + cropperW + (endP.x-startX),
              bottomRightY:cropperY + cropperH + (endP.x-startX)/scale,
            })
          }
        }
      })
    }
    this.setState({
      isCanZoom:false,
      isCanMove:false,
      zoomTL:false,
      zoomTR:false,
      zoomBL:false,
      zoomBR:false
    })
    
  }

  cancel = () => {
    this.props.onClose()
  }

  confirm = () => {
    this.sevePicture((res) => {
      this.props.onSaveCropperImage(res)
    })
  }

  //获取图片的尺寸
  getImageInfo = (src, callback) => {
    const {canvasWidth,canvasHeight} = this.state;
    wx.getImageInfo({
      src,
      success: (res) => {
        this.setState({
          offsetScaleX:res.width/canvasWidth,
          offsetScaleY:res.height/(canvasWidth*(res.height/res.width))
        },()=>{
          let scale = (res.width/res.height).toFixed(2);
          let imgObj = {
            width:canvasWidth,
            height:canvasWidth*(res.height/res.width)
          }
          // if(res.width>canvasWidth && res.height<canvasHeight){
          //   imgObj.width = canvasWidth/2;
          //   imgObj.height = parseInt(canvasWidth/scale/2)
          // }
          // else if(res.width<canvasWidth && res.height>canvasHeight){
          //   imgObj.height = canvasHeight/2;
          //   imgObj.width = parseInt(canvasHeight*scale/2)
          // }
          callback(imgObj) 
        })
      }
    })
  }


  drawCanvas = () => {
    const { canvasHeight, canvasWidth, imageHeight,defaultCropperWidth} = this.state;
    const { imagePath ,scale} = this.props;
    const cvsCtx = Taro.createCanvasContext('cropper', this.$scope);
    const offset = 5;
    this.getImageInfo(imagePath, (res) => {
      const {offsetScaleX,offsetScaleY } = this.state;
      this.setState({
        imageHeight:res.height
      })
      cvsCtx.drawImage(imagePath, (canvasWidth-res.width)/2, 0, res.width, res.height);
      cvsCtx.rect((canvasWidth-defaultCropperWidth)/2, (canvasHeight-defaultCropperWidth/scale)/2, defaultCropperWidth, defaultCropperWidth/scale);
      this.setState({
        cropperW: defaultCropperWidth,
        cropperH: defaultCropperWidth/scale,
        cropperX:(canvasWidth-defaultCropperWidth)/2,
        cropperY:(canvasHeight-defaultCropperWidth/scale)/2,
        topRightX:(canvasWidth-defaultCropperWidth)/2 + defaultCropperWidth,
        topRightY:(canvasHeight-defaultCropperWidth/scale)/2,
        bottomLeftX:(canvasWidth-defaultCropperWidth)/2,
        bottomLeftY:(canvasHeight-defaultCropperWidth/scale)/2 + defaultCropperWidth/scale,
        bottomRightX:(canvasWidth-defaultCropperWidth)/2 + defaultCropperWidth,
        bottomRightY:(canvasHeight-defaultCropperWidth/scale)/2 + defaultCropperWidth/scale,
      })
      let x =(canvasWidth-defaultCropperWidth)/2 ,y = (canvasHeight-defaultCropperWidth/scale)/2,
      cropperW = defaultCropperWidth,cropperH=defaultCropperWidth/scale;
      cvsCtx.strokeStyle = '#eeeeee';
      cvsCtx.stroke();
      cvsCtx.beginPath();
      cvsCtx.fillStyle="rgba(0,0,0,.5)";
      cvsCtx.fillRect(0,0,canvasWidth,canvasHeight);
      cvsCtx.clearRect(x,y,defaultCropperWidth, defaultCropperWidth/scale)
      cvsCtx.drawImage(imagePath, x*offsetScaleX, y*offsetScaleY, defaultCropperWidth*offsetScaleX, defaultCropperWidth/scale*offsetScaleY,x,y,defaultCropperWidth, defaultCropperWidth/scale);
      cvsCtx.lineWidth=2;
      cvsCtx.moveTo(x-offset,y-offset)
      cvsCtx.lineTo(x+offset*2,y-offset)
      cvsCtx.moveTo(x-offset,y-offset)
      cvsCtx.lineTo(x-offset,y+offset*2)

      cvsCtx.moveTo(x+cropperW+offset,y-offset)
      cvsCtx.lineTo(x+cropperW-offset*2,y-offset)
      cvsCtx.moveTo(x+cropperW+offset,y-offset)
      cvsCtx.lineTo(x+cropperW+offset,y+offset*2)

      cvsCtx.moveTo(x-offset,y+cropperH+offset)
      cvsCtx.lineTo(x-offset,y+cropperH-offset*2)
      cvsCtx.moveTo(x-offset,y+cropperH+offset)
      cvsCtx.lineTo(x+offset*2,y+cropperH+offset)

      cvsCtx.moveTo(x+cropperW+offset,y+cropperH+offset)
      cvsCtx.lineTo(x+cropperW-offset*2,y+cropperH+offset)
      cvsCtx.moveTo(x+cropperW+offset,y+cropperH+offset)
      cvsCtx.lineTo(x+cropperW+offset,y+cropperH-offset*2)

      cvsCtx.strokeStyle = '#f9f9f9'
      cvsCtx.stroke();
      cvsCtx.draw();
    })
  }

  moveCropper = (x,y)=>{
    const {cropperW,cropperH,canvasWidth,canvasHeight} = this.state;
    const { imagePath, scale } = this.props;
    const offset = 5;
    const cvsCtx = Taro.createCanvasContext('cropper', this.$scope);
    const {cropperX,cropperY,topRightX,topRightY,bottomLeftX,bottomLeftY,bottomRightX,bottomRightY} = this.state;
    this.getImageInfo(imagePath, (res) => {
      const {offsetScaleX,offsetScaleY } = this.state;
      cvsCtx.drawImage(imagePath, (canvasWidth-res.width)/2, 0, res.width, res.height);
      cvsCtx.rect(x, y, cropperW, cropperH);
      this.setState({
        cropperW: cropperW,
        cropperH: cropperH
      })
      cvsCtx.strokeStyle = '#eeeeee';
      cvsCtx.stroke();
      cvsCtx.beginPath();
      cvsCtx.fillStyle="rgba(0,0,0,.5)";
      cvsCtx.fillRect(0,0,canvasWidth,canvasHeight);
      cvsCtx.clearRect(x,y,cropperW, cropperW/scale)
      cvsCtx.drawImage(imagePath, x*offsetScaleX, y*offsetScaleY, cropperW*offsetScaleX, cropperW/scale*offsetScaleY,x,y,cropperW, cropperW/scale);
      cvsCtx.lineWidth=2;
      cvsCtx.moveTo(x-offset,y-offset)
      cvsCtx.lineTo(x+offset*2,y-offset)
      cvsCtx.moveTo(x-offset,y-offset)
      cvsCtx.lineTo(x-offset,y+offset*2)

      cvsCtx.moveTo(x+cropperW+offset,y-offset)
      cvsCtx.lineTo(x+cropperW-offset*2,y-offset)
      cvsCtx.moveTo(x+cropperW+offset,y-offset)
      cvsCtx.lineTo(x+cropperW+offset,y+offset*2)

      cvsCtx.moveTo(x-offset,y+cropperH+offset)
      cvsCtx.lineTo(x-offset,y+cropperH-offset*2)
      cvsCtx.moveTo(x-offset,y+cropperH+offset)
      cvsCtx.lineTo(x+offset*2,y+cropperH+offset)

      cvsCtx.moveTo(x+cropperW+offset,y+cropperH+offset)
      cvsCtx.lineTo(x+cropperW-offset*2,y+cropperH+offset)
      cvsCtx.moveTo(x+cropperW+offset,y+cropperH+offset)
      cvsCtx.lineTo(x+cropperW+offset,y+cropperH-offset*2)

      cvsCtx.strokeStyle = '#f9f9f9'
      cvsCtx.stroke();
      cvsCtx.draw();
    })
  }

  zoomCropper = (x,y,moveW,moveH)=>{
    const {cropperW,cropperH,canvasWidth,canvasHeight} = this.state;
    const { imagePath, scale } = this.props;
    const cvsCtx = Taro.createCanvasContext('cropper', this.$scope);
    const offset = 5;
   
    if(cropperW + moveW>100  && x+cropperW<canvasWidth){
      // debugger;
      this.getImageInfo(imagePath, (res) => {
        const {offsetScaleX,offsetScaleY } = this.state;
        cvsCtx.drawImage(imagePath, (canvasWidth-res.width)/2, 0, res.width, res.height);
        let newCropperW = cropperW+moveW,newCropperH=cropperH+moveW/scale;
        // this.setState({
        //   cropperW: newCropperW,
        //   cropperH: newCropperH
        // })
        this.setState({
          lockCropper:false
        })
        //cvsCtx.rect(x, y, newCropperW/offsetScaleX, newCropperW/scale/offsetScaleX);
        cvsCtx.strokeStyle = '#eeeeee';
        cvsCtx.stroke();
        cvsCtx.beginPath();
        cvsCtx.fillStyle="rgba(0,0,0,.5)";
        cvsCtx.fillRect(0,0,canvasWidth,canvasHeight);
        //cvsCtx.clearRect(x,y,newCropperW/offsetScaleX, newCropperW/scale/offsetScaleX)
        cvsCtx.drawImage(imagePath, x*offsetScaleX, y*offsetScaleY, newCropperW*offsetScaleX, newCropperW/scale*offsetScaleY,x,y,newCropperW, newCropperW/scale);
        cvsCtx.lineWidth=2;
        cvsCtx.moveTo(x-offset,y-offset)
        cvsCtx.lineTo(x+offset*2,y-offset)
        cvsCtx.moveTo(x-offset,y-offset)
        cvsCtx.lineTo(x-offset,y+offset*2)
  
        cvsCtx.moveTo(x+newCropperW+offset,y-offset)
        cvsCtx.lineTo(x+newCropperW-offset*2,y-offset)
        cvsCtx.moveTo(x+newCropperW+offset,y-offset)
        cvsCtx.lineTo(x+newCropperW+offset,y+offset*2)
  
        cvsCtx.moveTo(x-offset,y+newCropperH+offset)
        cvsCtx.lineTo(x-offset,y+newCropperH-offset*2)
        cvsCtx.moveTo(x-offset,y+newCropperH+offset)
        cvsCtx.lineTo(x+offset*2,y+newCropperH+offset)
  
        cvsCtx.moveTo(x+newCropperW+offset,y+newCropperH+offset)
        cvsCtx.lineTo(x+newCropperW-offset*2,y+newCropperH+offset)
        cvsCtx.moveTo(x+newCropperW+offset,y+newCropperH+offset)
        cvsCtx.lineTo(x+newCropperW+offset,y+newCropperH-offset*2)
  
        cvsCtx.strokeStyle = '#f9f9f9'
        cvsCtx.stroke();
        cvsCtx.draw();
      })
    }else{
      this.setState({
        //lockCropper:true,
        // isCanMove:true
      })
    }
  }

  //判断点击区域
  judgeTouchArea = (startX,startY,callback)=>{
    const zoomArea = 25;
    const {cropperX,cropperY,topRightX,topRightY,bottomLeftX,bottomLeftY,bottomRightX,bottomRightY} = this.state;
    if(
      (startX>(cropperX-zoomArea) && startX<(cropperX+zoomArea) && startY>(cropperY-zoomArea) && startY<(cropperY+zoomArea))
      ||
      (startX>(topRightX-zoomArea) && startX<(topRightX+zoomArea) && startY>(topRightY-zoomArea) && startY<(topRightY+zoomArea))
      ||
      (startX>(bottomLeftX-zoomArea) && startX<(bottomLeftX+zoomArea) && startY>(bottomLeftY-zoomArea) && startY<(bottomLeftY+zoomArea))
      ||
      (startX>(bottomRightX-zoomArea) && startX<(bottomRightX+zoomArea) && startY>(bottomRightY-zoomArea) && startY<(bottomRightY+zoomArea))
      ){
        if((startX>(cropperX-zoomArea) && startX<(cropperX+zoomArea) && startY>(cropperY-zoomArea) && startY<(cropperY+zoomArea))){
          this.setState({
            isCanZoom:true,
            zoomTL:true
          },callback)
        }else{
          this.setState({
            zoomTL:false
          },callback)
        }
        if((startX>(topRightX-zoomArea) && startX<(topRightX+zoomArea) && startY>(topRightY-zoomArea) && startY<(topRightY+zoomArea))){
          this.setState({
            isCanZoom:true,
            zoomTR:true
          },callback)
        }else{
          this.setState({
            zoomTR:false
          },callback)
        }
        if((startX>(bottomLeftX-zoomArea) && startX<(bottomLeftX+zoomArea) && startY>(bottomLeftY-zoomArea) && startY<(bottomLeftY+zoomArea))){
          this.setState({
            isCanZoom:true,
            zoomBL:true
          },callback)
        }else{
          this.setState({
            zoomBL:false
          },callback)
        }
        if((startX>(bottomRightX-zoomArea) && startX<(bottomRightX+zoomArea) && startY>(bottomRightY-zoomArea) && startY<(bottomRightY+zoomArea))){
          this.setState({
            isCanZoom:true,
            zoomBR:true
          },callback)
        }else{
          this.setState({
            zoomBR:false
          },callback)
        }
        this.setState({
          isCanMove:false
        });
      }else{
        this.setState({
          isCanZoom:false
        },callback)
      }
    if(
      startX>(cropperX+zoomArea) && startX<(bottomRightX-zoomArea) && startY>(cropperY+zoomArea) && startY<(bottomRightY-zoomArea)
    ){
      this.setState({
        isCanMove:true
      },callback)
    }else{
      this.setState({
        isCanMove:false
      },callback)
    }
  }

  drawCropper = (x, y, w, h) => {
    const { canvasWidth } = this.state;
    const { imagePath } = this.props;
    const cvsCtx = Taro.createCanvasContext('cropper', this.$scope);
    this.getImageInfo(imagePath, (res) => {
      cvsCtx.drawImage(imagePath, (canvasWidth-res.width)/2, 0, res.width, res.height);
      cvsCtx.rect(x, y, w, h);
      this.setState({
        cropperW: w,
        cropperH: h,
      })
      cvsCtx.stroke();
      cvsCtx.draw();
    })
  }

  sevePicture = (callback) => {
    const { cropperX, cropperY, cropperW, cropperH } = this.state;
    Taro.canvasToTempFilePath({ // 调用小程序API对canvas转换成图
      x: cropperX, // 开始截取的X轴
      y: cropperY, // 开始截取的Y轴
      width: cropperW, // 开始截取宽度
      height: cropperH,  // 开始截取高度
      destWidth: cropperW * 2,  // 截取后图片的宽度（避免图片过于模糊，建议2倍于截取宽度）
      destHeight: cropperH * 2, // 截取后图片的高度（避免图片过于模糊，建议2倍于截取宽度）
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
    const { canvasWidth, canvasHeight, imageHeight } = this.state;
    return (
      <View className='cropper' style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }} >
        <Canvas className='cropper-canvas'
          onTouchStart={this.TouchStart.bind(this)}
          onTouchMove={this.TouchMove.bind(this)}
          onTouchEnd={this.TouchEnd.bind(this)}
          disableScroll={true}
          style={{ width: `${canvasWidth}px`, height: `${imageHeight}px`, top: `${(canvasHeight - imageHeight) / 2}px` }}
          canvasId='cropper' />
        <CoverView className='btn-wrap'>
          <Button className="btn-cancel" onClick={this.cancel.bind(this)}>取消</Button>
          <Button className="btn-confirm" onClick={this.confirm.bind(this)}>确认</Button>
        </CoverView>
      </View>
    )
  }
}