import React from 'react'
import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data.js'
import getSex from '@common/utils/roleToSex'
export default class CharacterXPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      role:'',
      isInvite:false
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    const {isInvite} = this.$router.params;
    console.log('是否邀请',isInvite)
    if(isInvite){
      this.setState({
        isInvite:isInvite
      })
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  inputRole = (e) =>{
    this.setState({
      role:e.detail.value
    })
  }
  nextStep = async ()=>{
    const {babyName,invtKey} = this.$router.params;
    const {role,isInvite} = this.state;
    const {updateRole,updateSex} = staticData;
    if(role){
      updateRole(role);
      if(!isInvite){
        this.navback(2)
      }else{
        updateRole(role);
        updateSex(getSex(role));
        let res = await Model.acceptInvite(invtKey,role);
        if(res){
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
    }else{
      this.showToast('请输入身份')
    }
  }
}
