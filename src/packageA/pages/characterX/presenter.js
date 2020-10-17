import React from 'react'
import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data.js'

export default class CharacterXPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      role:''
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  inputRole = (e) =>{
    this.setState({
      role:e.detail.value
    })
  }
  nextStep = ()=>{
    const {role} = this.state;
    const {updateRole} = staticData;
    if(role){
      updateRole(role);
      this.navback(2)
    }else{
      this.showToast('请输入身份')
    }
  }

}
