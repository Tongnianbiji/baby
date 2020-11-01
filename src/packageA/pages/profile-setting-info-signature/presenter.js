import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'

export default class ProfileSettingInfoSignaturePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      signature:''
    }
  }

  componentWillMount() { }

  componentDidMount() {
    const {signature} = staticData;
    this.setState({
      signature:signature
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  submit = async () =>{
    const {signature} = this.state;
    const {updateSignature} = staticData;
    let res = await Model.updateInfo(signature);
    if(res){
      updateSignature(signature);
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
