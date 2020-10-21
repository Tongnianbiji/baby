import Taro, { getCurrentInstance } from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileHomePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: Model.tabs,
      tabsCurrent: 0,
      userInfo: {
        nickName: '小于妈妈',
        headImg: '#',
        sex: 'FEMALE',
        flow: 0,
        funs: 0,
        circle: 0,
        marked: 0,
        stared: 0
      },
      userId: '',
      postLock: false,
      activeData:[],
      postData:[],
      questionData:[],
      isMySelf:false
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    
  }

  componentWillUnmount() { }

  componentDidShow() { 
    this.getProfileInfo();
    this.getActiveData()
  }

  componentDidHide() { }

  /**
   * tab 点击
   * @param {Number} value 索引
   */
  onClickForTabs(value) {
    this.setState({
      tabsCurrent: value,
    });
    switch(value){
      case 0:
        this.getActiveData();
        break;
      case 1:
        this.getPostData();
        break;
      case 2:
        this.getQuestionData();
        break;
    }
  }

  //获取个人信息
  getProfileInfo = async () => {
    const { userId } = getCurrentInstance().router.params;
    this.setState({
      userId: userId
    })
    let token = this.isLogin();
    if (userId) {
      let res = await Model.getData(token, userId);
      this.setState({
        userInfo: res,
        isMySelf:false
      })
    } else {
      let uid = this.getUserInfo().userId;
      let res = await Model.getData(token, uid);
      this.setState({
        userInfo: res,
        userId: uid,
        isMySelf:true
      })
    }
  }

  //获取动态数据
  getActiveData = async ()=>{
    const { userId } = getCurrentInstance().router.params;
    if (userId) {
      let res = await Model.getActiveData(userId);
      if(res){
        this.setState({
          activeData: res
        })
      }
    } else {
      let uid = this.getUserInfo().userId;
      let res = await Model.getActiveData(uid);
      if(res){
        this.setState({
          activeData: res
        })
      }
    }
  }

  //获取帖子数据
  getPostData = async ()=>{
    const { userId } = getCurrentInstance().router.params;
    if (userId) {
      let res = await Model.getPostData(userId);
      if(res && res.items){
        this.setState({
          postData: res.items
        })
      }
    } else {
      let uid = this.getUserInfo().userId;
      let res = await Model.getPostData(uid);
      if(res && res.items){
        this.setState({
          postData: res.items
        })
      }
    }
  }

  //获取问答数据
  getQuestionData = async ()=>{
    const { userId } = getCurrentInstance().router.params;
    if (userId) {
      let res = await Model.getQuestionData(userId);
      if(res && res.items){
        this.setState({
          questionData: res.items
        })
      }
    } else {
      let uid = this.getUserInfo().userId;
      let res = await Model.getQuestionData(uid);
      if(res && res.items){
        this.setState({
          questionData: res.items
        })
      }
    }
  }

  //个人页面编辑
  editProfile =()=>{
    this.navto({
      url:'/packageA/pages/profile-setting-info/index'
    })
  }

  //查看更多宝宝
  viewMoreChild = () => {
    this.navto({
      url: '/packageA/pages/profile-baby/index'
    })
  }
  //设置个人信息
  setProfile = () => {
    const { userId } = this.state;
    this.navto({
      url: '/packageA/pages/profile-setting-privacy/index?uid=' + userId
    })
  }

  //私信
  goToIM = () => {
    this.navto({
      url: '/packageA/pages/message-im/index'
    })
  }

  //关注
  onSubscr = async() => {
    let { postLock,userInfo, userInfo: { subscr } ,userId=1} = this.state;
    if (!postLock) {
      if (subscr) {
        this.setState({
          postLock: true
        })
        let res = await Model.cancelAttentionUser(userId);
        this.setState({
          postLock: false
        })
        userInfo.subscr = false
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = await Model.attentionUser(userId);
        this.setState({
          postLock: false
        })
        userInfo.subscr = true
        if (res) {
          this.showToast('已关注');
        }
      }
    }
    this.setState({
      userInfo:userInfo
    })
  }
}
