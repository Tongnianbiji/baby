import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Request from '@common/baseRequest'
import './index.scss'
import { ICONS } from '@common/constant'

const Btn_remove = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png'
const req = new Request()

export default class PhotoItemView extends Component {
  static defaultProps = {
    model: {},
    onGetFile:() => {},
    onRemove: () => { }
  }
  constructor(props) {
    super(props)

    this.state = {
      status: 'uploading'
    }
  }

  componentDidMount() {
    // console.log('upload');
    const scope = this
    Taro.uploadFile({
      url: req._build_url('/upload/file'),
      name: 'files',
      header: req._get_header(),
      filePath: this.props.model.file,
      success(res) {
        console.log('上传成功',res)
        if (res.statusCode === 200 && res.data) {
          const d = JSON.parse(res.data)
          d.code === 0 ? scope.checkResult(d.data) : scope.setState({ status: 'failed' })
        }
      }
    })
  }

  checkResult = (ticket, time = 1) => {
    Taro.showLoading({
      title: this.props.uploadingTip ||'上传中,请稍后'
    });
    req.postWithToken('/upload/result', { ticket }).then(res => {
       console.log(res, 'ticket..');
      const d = res.data
      /**原来的检查上传逻辑 */
      // if (d.code === 0 && d.data && d.data.length) {
      //   if (d.data[0].originalFileName && d.data[0].newFileName) {
      //     this.setState({ status: 'success' })
      //   } else {
      //     if (time < 10) {
      //       setTimeout(() => {
      //         this.checkResult(ticket, time + 1)
      //       }, 500)
      //     }
      //   }
      // }

      if (d.code === 0) {
        if (d.data && d.data.length) {
          if (!d.data[0].refuse) {
            const { type, url, newFileName } = d.data[0];
            let file = {
              type,
              url,
              fileName:newFileName
            }
            console.log('成功',file)
            this.props.onGetFile(file)
            this.setState({ status: 'success' });
            Taro.hideLoading();
            Taro.showToast({
              title: this.props.uploadedTip||'上传成功',
              icon: 'success',
              duration:2e3
            })
          } else {
            this.setState({ status: 'failed' });
            Taro.hideLoading();
            Taro.showToast({
              title:'上传失败,未通过审核,请重新上传',
              icon: 'none',
              duration:2e3
            })
          }
        } else {
          if (time < 10) {
            setTimeout(() => {
              this.checkResult(ticket, time + 1)
            }, 500)
          } else { 
            this.setState({ status: 'failed' });
            Taro.hideLoading();
            this.props.onGetFile()
            Taro.showToast({
              title:'上传失败,未通过审核,请重新上传',
              icon: 'none',
              duration:2e3
            })
          }
        }
      }
    })
  }

  removePhoto = () => {
    this.props.onRemove(this.props.model)
  }

  render() {
    const { key, path } = this.props.model
    const { status } = this.state
    return (
      <View className='img-item1' key={key}>
        <Image src={path} className='img' />
        { status !== 'uploading' && <Image src={ICONS.DELETE} className='btn-remove' onClick={this.removePhoto} />}
      </View>
    )
  }
}