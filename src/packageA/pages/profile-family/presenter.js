import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileBabyPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      familyMember: [],
      otherMember: [],
      userInfo:{
        nickName:'小福妈妈'
      },
      babyName:'',
      invtKey:''
    }
  }

  async componentDidMount() {
    const { officeName, bid } = this.$router.params;
    let newBid = null;
    let newOfficeName = null;
    if(bid){
      newBid=bid;
      newOfficeName=officeName
    }else{
      let res = await this.getBaby();
      newBid = res.bid;
      newOfficeName=res.officeName
    }

    await this.getProfile();

    this.getFamilyList(newBid);
    this.getInviteData(newBid);
    this.setState({
      //userInfo:this.getUserInfo(),
      babyName:newOfficeName,
      bid:newBid
    })
   
  }

  onShareAppMessage (res){
    const {userInfo,babyName,invtKey,otherMember,bid} = this.state;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `${userInfo.nickName}邀请加入童年`,
      path: `/packageA/pages/characterC/index?inviter=${userInfo.nickName}&newInviter=${userInfo.userId}&bid=${bid}&babyName=${babyName}&invtKey=${invtKey}&inviterRoles=${JSON.stringify(otherMember)}`
    }
  }

  onClickNavTo(userId) {
    this.navto({ url: `/packageA/pages/profile-home/index?userId=${userId}` })
  }

  getBaby = async ()=>{
    let res = await Model.childMine();
    if(res){
      return res.data[0]
    }
  }

  getFamilyList = async (bid)=>{
    let res = await Model.getData(bid);
    if(res && res.data && res.data.family){
      const {family,emptyRoles} = res.data;
      this.setState({
        familyMember:family,
        otherMember:emptyRoles,
      })
    }
  }

  getInviteData = async (bid)=>{
    let res = await Model.getInviteData(bid);
    if(res){
      this.setState({
        invtKey:res.data,
      })
    }
  }

  getProfile = async ()=>{
    let userId = this.getUserInfo().userId;
    let res = await Model.getpProfile(userId);
    console.log('个人信息',res)
    this.setState({
      userInfo:res
    })
  }
}
