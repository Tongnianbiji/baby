import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticDataStore from '@src/store/common/static-data'

export default class ProfileSettingInfoNickNamePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      babyNickname:'',
    }
  }

  componentWillMount() { }

  componentDidMount() {
    const {babyNickname} = this.$router.params;
    if(babyNickname){
      this.setState({
        babyNickname:babyNickname
      })
    }
   }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  submit = async () =>{
    const {babyNickname} = this.state;
    const {updateBabyNickname} = staticDataStore;
   if(babyNickname){
    updateBabyNickname(babyNickname);
    this.navback()
   }else{
     this.showToast('输入不能为空')
   }
  }
  inputValue = (e)=>{
    this.setState({
      babyNickname:e.target.value
    })
  }
}
