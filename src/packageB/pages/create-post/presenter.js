import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import staticData from '@src/store/common/static-data'
import circleIsReload from '@src/common/utils/circleIsReload'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      content: '',
      photos: '',
      canSave: false,
      showTip: true,
      selectedTag: [],
      files:[],
      tagList: [],
      scrollLeft:0,
      isManual:false,
      startPageX:null,
      movePageX:null,
      tagListWidth:null,
    }
    this.$store = this.props.circleDetailStore
    this.circleList = [];
    this.circleTriggerStr = '[]';
  }

  componentDidMount() {
    const { cid, cname = '' } = this.$router.params

    this.setNavBarTitle(cname)
    this.showNavLoading()
    this.init(cid)
  }

  componentWillUnmount(){
    this.$store.updateOpPanel(false);
    circleIsReload();
  }
  componentDidShow() {
    if (staticData.tempCircleItem) {
      this.circleList.push(staticData.tempCircleItem);
      let content = this.state.content;
      
      this.setState({
        content: content.replace(this.circleTriggerStr, `[${staticData.tempCircleItem.name}]`),
      })
    }
    staticData.setTempCircleItem(null);
    
  }
  async init(cid) {
    const tags = await Model.getTags(cid)
    this.setState({
      tagList: tags
    })

    this.hideNavLoading()
  }

  nameInput = ({ detail }) => {
    this.setState(prev => ({
      name: detail.value,
      canSave: prev.content.length > 4 && detail.value.length > 4 
    }))
  }

  contentInput = (e) => {
    const value = e.detail.value;
    if (value.indexOf(this.circleTriggerStr)>-1) {
      Taro.navigateTo({
        url: '/packageA/pages/user-circles/index?mode=select'
      })
    }
    this.setState(prev => ({
      content: value,
      canSave: prev.name.length > 4 && value.length > 4
    }))
  }

  hideTip = () => {
    this.setState({ showTip: false })
  }

  tagClick = tag => {
    console.log('标签',tag)
    const { selectedTag } = this.state
    const index = selectedTag.indexOf(tag.tagId)

    if (index > -1) {
      selectedTag.splice(index, 1)
    } else {
      selectedTag.push(tag.tagId)
    }

    this.setState(prev => ({
      canSave: prev.name.length > 4 && prev.content.length > 4,
      selectedTag
    }))
  }

  getFiles = (file) => {
    console.log('上传文件',file)
    this.setState(prev => ({
      files: prev.files.concat([file])
    }))
  }

  async doSubmit() {
    const { canSave, selectedTag, name, content,files } = this.state
    const { cid } = this.$router.params
    if (!canSave) {
      return false
    }

    this.showNavLoading()

    const p = /\[(.*?)\]/g;
    const replaceValue = content.replace(p,  (item,$1)=> {
      const circleItem = this.circleList.find(item => item.name == $1);
      return `_##_${JSON.stringify({
        name: circleItem.name,
        cid: circleItem.cid,
      })}_##_`
    })

    const params = {
      cid,
      title: name,
      content: replaceValue,
      tagIds: selectedTag,
      files
    }

    const pid = await Model.savePost(params);

    this.hideNavLoading()
    this.$store.circlePosts = []
    if (pid) {
      this.showToast('恭喜您, 提交成功')
      setTimeout(() => {
        this.$store.initCirclePosts();
        Taro.navigateBack()
      }, 2000)
    }
    // else {
    //   this.showToast('保存失败, 请稍候再试')
    // }
  }
}