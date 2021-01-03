import Taro from '@tarojs/taro'
import React from 'react'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'
import getSex from '@common/utils/roleToSex'

export default class CharacterBPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      chatacterList: Model.chatacterList,
      inviter:'小福妈妈',
      familyMember:{},
      babyName:'',
      invtKey:'',
      newInvtKey:''
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    this.onAutoLogin().then(res => {
      const { inviter, babyName, invtKey, inviterRoles, newInvtKey, bid } = this.$router.params;
      const { updateBabyNickname, updateBid, isRegiste, updateInviterRoles, updateNewInvtKey, updateInvtKey, updateInviterName } = staticData;
      this.getInviter();
      if (!isRegiste && invtKey) {
        updateNewInvtKey(invtKey);
        updateInvtKey(invtKey);
        updateInviterName(inviter);
        updateBabyNickname(babyName);
        updateBid(bid);
        updateInviterRoles(inviterRoles)
        this.navto({
          url: '/pages/login/index'
        })
        return;
      }
      let chatacterList = JSON.parse(inviterRoles || staticData.inviterRoles);
      chatacterList.forEach(item => {
        if (item.roleText) {
          item.roleText = `我是${item.roleText}`
        } else {
          item.roleText = '其他'
        }

      })
      this.setState({
        inviter: inviter || staticData.inviterName,
        babyName: babyName || staticData.babyNickname,
        invtKey: invtKey || newInvtKey,
        chatacterList: chatacterList,
        newInvtKey
      })
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  selectRole = async (item,e)=>{
    const {updateRole,isRegiste,updateSex,babyNickname,updateWxUserInfo} = staticData;
    const {babyName,invtKey} = this.state;
    const roleText = item.roleText.slice(2);
    const {newInvtKey} = this.$router.params;
    let isHasWxInfo = false;
    console.log('微信信息',e)
    if(e&&e.detail&&e.detail.userInfo){
      updateWxUserInfo(e.detail.userInfo);
      isHasWxInfo = true
    }
    if (!staticData.userInfo.nickName){
      if(item.role === 'OTHER'){
        this.navto({
          url:`/packageA/pages/characterX/index?isInvite=true&babyName=${babyNickname}&invtKey=${invtKey}`
        })
      }else{
        updateRole(roleText);
        updateSex(getSex(roleText));
        await Model.acceptInvite(newInvtKey,roleText);
        Taro.showModal({
          title: '童年',
          content: `已成为${babyNickname}家庭成员，即将开启美好童年`,
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
                Taro.navigateTo({
                  url: `/packageA/pages/profile-setting-info/index?newUser=true&wxInfo=${isHasWxInfo}`
                })
            } 
            else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }else{
      if(item.role === 'OTHER'){
        this.navto({
          url:`/packageA/pages/characterX/index?isInvite=true&babyName=${babyName}&invtKey=${invtKey}`
        })
      }else{
        updateRole(roleText);
        updateSex(getSex(roleText));
        await Model.acceptInvite(invtKey,roleText);
        Taro.showModal({
          title: '童年',
          content: `已成为${babyName}家庭成员，即将开启美好童年`,
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
                Taro.switchTab({
                  url: `/pages/index/index`
                })
            } 
            else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  }

  getFamilyList = async ()=>{
    const { bid } = this.$router.params;
    let newBid = bid || staticData.bid;
    console.log('新bid',staticData.bid)
    console.log('newBid',newBid)
    let res = await Model.getData(newBid);
    if(res && res.data && res.data.family){
      this.setState({
        familyMember:res.data.family
      })
    }
  }

  nextStep= async (e)=>{
    let isHasWxInfo = false;
    console.log('微信信息',e)
    const {updateWxUserInfo} = staticData;
    if(e&&e.detail&&e.detail.userInfo){
      updateWxUserInfo(e.detail.userInfo);
      isHasWxInfo = true
    }
    this.navto({
      url: `/packageA/pages/profile-setting-info/index?newUser=true&wxInfo=${isHasWxInfo}`
    })
  }

  getInviter(){
    const { updateInviter } = staticData;
    const {newInviter} = this.$router.params;
    if(newInviter){
      updateInviter(newInviter)
    }
  }
}
