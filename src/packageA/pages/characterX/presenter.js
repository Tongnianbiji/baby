import React from 'react'
import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data.js'

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
  nextStep = ()=>{
    const {role,isInvite} = this.state;
    const {updateRole} = staticData;
    if(role){
      updateRole(role);
      if(!isInvite){
        this.navback(2)
      }else{
        this.navto({
          url:`/packageA/pages/characterA/index?isOther=true`
        })
      }
    }else{
      this.showToast('请输入身份')
    }
  }
}
