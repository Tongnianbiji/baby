import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileSettingInfoNickNamePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickName:''
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    const {nickName} = this.$router.params;
    this.setState({
      nickName:nickName
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  submit = async () =>{
    const {nickName} = this.state;
    let res = await Model.updateInfo(nickName);
    if(res){
      this.navback();
      this.showToast('更新成功');
    }
  }
  inputValue = (e)=>{
    this.setState({
      nickName:e.detail.value
    })
  }
}
