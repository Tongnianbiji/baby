import Taro from '@tarojs/taro'
import BaseComponent from '../../common/baseComponent'
import Model from './model'
import { ERR_MSG } from '../../common/constant';
import staticData from '@src/store/common/static-data'
import Storage from '@common/localStorage'
import { USER_INFO_KEY_USERID } from '@common/constant'


export default class ProfilePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: {},
      isLogin: false,
    }
    this.storage = Storage.getInstance()
  }

  componentDidMount() {
  }
  componentDidShow() {
    this.onAutoLogin().then(res => {
      this.getProfile();
    })
   
  }

  onShareAppMessage (res){
    const {profileInfo} = this.state;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `${profileInfo.nickName}邀请加入童年`,
      path: `/pages/index/index?inviter=${profileInfo.userId}`
    }
  }

  onShareTimeline(){
    const {profileInfo} = this.state;
		return {
			title:`${profileInfo.nickName}邀请加入童年`,
			query: `inviter=${profileInfo.userId}`,
		}
	}

  getProfile() {
    this.showLoading();
    let userId = this.getUserInfo().userId;
    Model.profile(userId).then((ret) => {
      if (!ret.code) {
        this.hideLoading();
        this.setState({
          isLogin: staticData.isLogin,
          profileInfo: ret.data,
        });
        this.storage.setValue(USER_INFO_KEY_USERID, ret.data)
      }
      else {
        this.hideLoading();
        //this.showToast(ERR_MSG);
      }
    })
    this.hideLoading();
  }

  login = ()=>{
    this.navto({
      url:'/pages/login/index'
    })
  }

  async onClickNavTo(type) {
    const {isLogin} = staticData;
    const {profileInfo} = this.state;
    switch (type) {
      case 'profile-home'://个人主页
        this.navto({ url: '/packageA/pages/profile-home/index' })
        break;
      case 'fans'://粉丝
        this.navto({ url: '/packageA/pages/fans/index' })
        break;
      case 'circle'://圈子
         this.navto({ url: '/packageA/pages/user-circles/index' })
        break;
      case 'focus'://关注
         this.navto({ url: '/packageA/pages/attentions/index' })
        break;
     
      case 'collects-message'://被收赞/点赞
        this.showToast('暂不支持跳转')
        //this.navto({ url: '/packageA/pages/collects-message/index' })
        break;
      case 'collects'://收赞/获赞
        if(isLogin){
          this.navto({ url: '/packageA/pages/collects/index' })
        }else{
           this.navto({
            url:'/pages/login/index'
          })
        }
        break;
      case 'mypost'://帖子
        if(isLogin){
          this.navto({ url: '/packageB/pages/my-post/index' })
        }else{
           this.navto({
            url:'/pages/login/index'
          })
        }
        break;
      case 'question'://问答
        if(isLogin){
          this.navto({ url: '/packageA/pages/qa-list/index' })
        }else{
           this.navto({
            url:'/pages/login/index'
          })
        }
        break;
      case 'family'://我的家
        if(isLogin){
          let r = await Model.childMine();
          if(r.length>1){
            this.navto({ url: '/packageA/pages/profile-baby/index?isToFamily=true' })
          }else{
            this.navto({ url: '/packageA/pages/profile-family/index' })
          }
        }else{
           this.navto({
            url:'/pages/login/index'
          })
        }
        break;

      case 'baby'://宝宝信息
        if(isLogin){
          this.navto({ url: '/packageA/pages/profile-baby/index' })
        }else{
           this.navto({
            url:'/pages/login/index'
          })
        }
        break;
      case 'share'://分享
        this.navto({ url: '/packageA/pages/profile-share/index' })
        break;
      case 'setting'://设置
        if(isLogin){
          this.navto({ url: `/packageA/pages/profile-setting/index?headImg=${profileInfo.headImg}` })
        }else{
           this.navto({
            url:'/pages/login/index'
          })
        }
        break;
      case 'about'://关于我们
        this.navto({ url: '/packageA/pages/profile-about/index' })
        break;
      case 'contact'://联系我们
        this.navto({ url: '/packageA/pages/profile-contact/index' })
        break;
      case 'mypost': //我的帖子
        this.navto({ url: '/packageB/pages/my-post/index' })
        break;
      default:
        break;
    }
  }

  viewProfileInfo = (uid,e)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url:`/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

  toShareCode = ()=>{
    Taro.navigateTo({
      url:`/packageB/pages/share-qrCode/index`
    })
  }

}
