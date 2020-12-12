import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileSettingInfoNickNamePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      suggest: null,
      contact: null,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  inputSuggest = (e) => {
    this.setState({
      suggest: e.detail.value
    })
  }

  inputContact = (e) => {
    this.setState({
      contact: e.detail.value
    })
  }

  submit = async () => {
    const { isCanSubmit, suggest, contact } = this.state;
    // 校验
    if (!suggest) {
      this.showToast('麻烦输入反馈信息后，再次提交');
      return;
    } else if (contact && contact.length < 11) {
      this.showToast('请输入正确的手机号');
      return;
    }

    let res = await Model.postSuggest(suggest, contact);
    if (res) {
      this.navback();
      this.showToast('提交成功')
    } else {
      this.showToast('系统异常')
    }
  }
}
