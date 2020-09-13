import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Request from '@common/baseRequest'
import './index.scss'

const Btn_remove = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png'
const req = new Request()

export default class PhotoItemView extends Taro.Component {
  static defaultProps = {
    model: {},
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
        if (res.statusCode === 200 && res.data) {
          const d = JSON.parse(res.data)
          d.code === 0 ? scope.checkResult(d.data) : scope.setState({ status: 'failed' })
        }
      }
    })
  }

  checkResult = (ticket, time = 1) => {
    req.post('/upload/result', { ticket }).then(res => {
      // console.log(ticket, 'ticket..');
      const d = res.data
      if (d.code === 0 && d.data && d.data.length) {
        if (d.data[0].originalFileName && d.data[0].newFileName) {
          this.setState({ status: 'success' })
        } else {
          if (time < 10) {
            setTimeout(() => {
              this.checkResult(ticket, time + 1)
            }, 500)
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
      <View className='img-item' key={key}>
        <Image src={path} className='img' />
        { status !== 'uploading' && <Image src={Btn_remove} className='btn-remove' onClick={this.removePhoto} /> }
      </View>
    )
  }
}