import BaseComponent from '@common/baseComponent'
import Model from './model'
import Taro, { getCurrentInstance } from '@tarojs/taro'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      checkedList: ['1'],
      checkboxOption: [{
        value: '1',
        label: '无效信息',
      }, {
        value: '2',
        label: '色情/暴力'
      }, {
        value: '3',
        label: '虚假',
      }, {
        value: '4',
        label: '抄袭/滥用原创',
      }],
      reason: '',
      contentType: 2,
      contentId: 15
    }

  }

  componentDidMount() {
    const { contentType, replyId, pid } = getCurrentInstance().router.params;
    switch (contentType) {
      case '1':
        this.setState({
          contentType: contentType,
          contentId: pid
        })
        break;
      case '2':
        this.setState({
          contentType: contentType,
          contentId: replyId
        })
        break;
    }
  }

  componentWillUnmount() {

  }

  handleChange(value) {
    this.setState({
      checkedList: value
    })
  }

  inputReason = (e) => {
    this.setState({
      reason: e.detail.value
    })
  }

  submit = async () => {
    const { contentType, contentId, checkedList, reason } = this.state;
    let res = await Model.submit(contentType, contentId, checkedList, reason);
    if (res) {
      this.showToast('举报成功');
      setTimeout(() => {
        this.navback()
      }, 2e3);
    }
  }
}