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
      invtKey:''
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    const {inviter,babyName,invtKey,inviterRoles} = this.$router.params;
    let chatacterList = JSON.parse(inviterRoles);
    chatacterList.forEach(item=>{
      if(item.roleText){
        item.roleText = `我是${item.roleText}`
      }else{
        item.roleText = '其他'
      }
      
    })
    this.setState({
      inviter:inviter,
      babyName:babyName,
      invtKey:invtKey,
      chatacterList:chatacterList
    })
    this.getFamilyList()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  selectRole = async (item)=>{
    const {updateRole,isRegiste,updateSex} = staticData;
    const {chatacterList,familyMember,babyName,invtKey} = this.state;
    //const keyChatacterList = chatacterList.slice(0,6);
    const roleText = item.roleText.slice(2);
    // const index1 = familyMember.findIndex(e=>e.roleText == roleText);
    // const index2 = keyChatacterList.findIndex(e=>e.title == item.title);
   
    if(item.role === 'OTHER'){
      this.navto({
        url:`/packageA/pages/characterX/index?isInvite=true`
      })
    }else{
      updateRole(roleText);
      updateSex(getSex(roleText));
      if(!isRegiste){
        this.navto({
          url:'/pages/login/index'
        })
      }else{
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
      // if(index1>-1 && index2>-1){
      //   this.showToast(`${babyName} ${roleText}已经加入童年`)
      // }
      // else{
       
      //   // this.navto({
      //   //   url:'/packageA/pages/characterA/index'
      //   // })
      // }
    }
  }

  getFamilyList = async ()=>{
    const { bid } = this.$router.params
    let res = await Model.getData(bid);
    if(res && res.data && res.data.family){
      this.setState({
        familyMember:res.data.family
      })
    }
  }
}
