import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileSettingInfoSignaturePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      signature:''
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    const {signature} = this.$router.params;
    this.setState({
      signature:signature
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  submit = async () =>{
    const {signature} = this.state;
    let res = await Model.updateInfo(signature);
    if(res){
      this.navback();
      this.showToast('更新成功');
    }
  }
  inputValue = (e)=>{
    this.setState({
      signature:e.detail.value
    })
  }

}
