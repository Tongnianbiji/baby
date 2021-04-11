import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileSettingPrivacyPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      userId:'',
      postLock:false
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    const {uid} = this.$router.params;
    this.checkBlockUser(uid);
    this.setState({
      userId:uid
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onShareAppMessage(res){
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '分享个人主页',
      path: '/packageA/pages/profile-home/index'
    }
  }

  onShareTimeline(){
		return {
			title: '分享个人主页',
			query: ``,
		}
	}

  //拉黑用户
  handleChangeBlock = async (e)=>{
    const {userId,postLock} = this.state;
    if(!postLock){
      this.setState({
        postLock:true
      })
      if(e){
        let res = await Model.blockUser(userId);
        if(res){
          this.showToast('已拉黑')
        }
      }else{
        let res = await Model.canCelBlockUser(userId);
        if(res){
          this.showToast('已取消')
        }
      }
      this.setState({
        postLock:false
      })
    }
  }

  //检查是否被拉黑
  checkBlockUser = async (uid)=>{
    let res = await Model.checkBlockUser(uid);
    if(res){
      this.setState({
        checked:res.data
      })
    }else{
      this.showToast('系统异常')
    }
  }

}
