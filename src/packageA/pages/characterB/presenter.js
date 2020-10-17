import Taro from '@tarojs/taro'
import React from 'react'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data.js'

export default class CharacterBPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      chatacterList: Model.chatacterList,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  selectRole = (item)=>{
    const {updateRole} = staticData;
    if(!item.value){
      this.navto({
        url:'/packageA/pages/characterX/index'
      })
    }else{
      updateRole(item.title.slice(2))
      this.navback()
    }
  }
}
