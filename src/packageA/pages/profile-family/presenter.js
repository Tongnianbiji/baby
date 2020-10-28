import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileBabyPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      familyMember: Model.familyMember,
      otherMember: Model.otherMember,
      userInfo:{
        nickName:'小福妈妈'
      },
      babyName:'',
      invtKey:''
    }
  }

  componentDidMount() {
    const { officeName } = this.$router.params
    this.getFamilyList();
    this.getInviteData();
    this.setState({
      userInfo:this.getUserInfo(),
      babyName:officeName
    })
  }

  onShareAppMessage (res){
    const {userInfo,babyName,invtKey} = this.state;
    const { bid } = this.$router.params
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `${userInfo.nickName}邀请加入童年`,
      path: `/packageA/pages/characterC/index?inviter=${userInfo.nickName}&bid=${bid}&babyName=${babyName}&invtKey=${invtKey}`
    }
  }

  onClickNavTo(userId) {
    this.navto({ url: `/packageA/pages/profile-home/index?userId=${userId}` })
  }

  getFamilyList = async ()=>{
    const { bid } = this.$router.params
    let res = await Model.getData(bid);
    if(res && res.data && res.data.family){
      this.setState({
        familyMember:res.data.family,
        otherMember:res.data.emptyRoles
      })
    }
  }

  getInviteData = async ()=>{
    const { bid } = this.$router.params
    let res = await Model.getInviteData(bid);
    if(res){
      this.setState({
        invtKey:res.data,
      })
    }
  }
}
