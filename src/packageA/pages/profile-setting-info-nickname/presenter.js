import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'

export default class ProfileSettingInfoNickNamePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickName:''
    }
  }

  componentWillMount() { }

  componentDidMount() {
    const {nickName} = staticData;
    this.setState({
      nickName:nickName
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  submit = async () =>{
    const {nickName} = this.state;
    const {updateNickName} = staticData;
    let res = await Model.updateInfo(nickName);
    if(res){
      updateNickName(nickName)
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
