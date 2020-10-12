import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileSettingInfoNickNamePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      suggest:null,
      contact:null,
      isCanSubmit:false
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  inputSuggest = (e)=>{
    this.setState({
      suggest:e.detail.value
    },()=>{
      this.state.suggest && (this.setState({isCanSubmit:true}))
    })
  }

  inputContact = (e)=>{
    this.setState({
      contact:e.detail.value
    },()=>{
      this.state.contact && (this.setState({isCanSubmit:true}))
    })
  }

  submit = async ()=>{
    const {isCanSubmit,suggest,contact} = this.state;
    if(isCanSubmit){
      let res = await Model.postSuggest(suggest,contact);
      if(res){
        this.navback();
        this.showToast('提交成功')
      }else{
        this.showToast('系统异常')
      }
    }else{
      this.showToast('提交不能为空')
    }
  }
}
