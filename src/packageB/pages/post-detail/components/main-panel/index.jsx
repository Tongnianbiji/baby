import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { ICONS } from '@common/constant'
import { observer, inject } from 'mobx-react'
import BaseComponent from '@common/baseComponent'
import Model from '../../model'
import FormaDate from '@common/formaDate'
import staticData from '@src/store/common/static-data'
import { renderCircleReferContent } from '@components/circle-refer-conent'
import './index.scss'
@inject('postDetail','staticDataStore')
@observer
export default class MainPanelComponent extends BaseComponent {
  static defaultProps = {
    info: {},
    onShare:()=>{}
  }

  share = (pid,e)=>{
    e.stopPropagation();
    this.props.onShare(pid)
  }

  handleFavorite = async() => {
    const {updatePostFavoriteMarks, detailData} = this.props.postDetail;
    const { isMark, pid } = detailData;
    const {isLogin} = staticData;
    let params = {
      markes: 1,
      isMark:true
    }
    if(isLogin){
      if (isMark) {
        params.markes = -1;
        params.isMark = false;
        const d = await Model.postMarkCancel(pid);
      } else {
        const d = await Model.postMark(pid);
      }
      Taro.vibrateShort();
      updatePostFavoriteMarks(params)
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  reply = (e) => {
    const { getCurrentReplyPostData, detailData,updateCurrentplaceholder,updateFocusStatus,updateActiveFocusStatus,isToPostOwner,updateIsToPostOwnerStatus } = this.props.postDetail;
    const {isRegiste} = this.props.staticDataStore;
    e.stopPropagation();
    if(isRegiste){
      Taro.navigateTo({
        url:'/packageB/pages/reply-post/index'
      })
      updateIsToPostOwnerStatus(true);
      updateCurrentplaceholder('我有话要说');
      getCurrentReplyPostData(detailData);
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  viewProfileInfo = (uid,e)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url:`/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

  getNickNameColor = (sex)=>{
    if(sex === 'MALE'){
      return '#027AFF'
    }else{
      return '#FF1493'
    }
  }

  deletePost = (model)=>{
    const {userId} = this.getUserInfo();
    if(userId === model.uid){
      Taro.showActionSheet({
        itemList: ['删除'],
        success: async (res)=> {
          if(res.tapIndex == 0){
            let r = await Model.deletePost(model.pid);
            if(r){
              Taro.showToast({
                title:'删除成功',
                icon:'success',
                duration:2e3
              })
              Taro.navigateBack()
            }else{
              Taro.showToast({
                title:'系统异常',
                icon:'none',
                duration:2e3
              })
            }
          }
        },
        fail:(res)=> {
          console.log(res.errMsg)
        }
      })
    }
  }
  navToWebView(linkContentVo){
    if (linkContentVo) {
      console.log('---跳转微信公众号链接---', linkContentVo)
      Taro.navigateTo({
        url: `/pages/commonWeb/index?url=${encodeURIComponent(linkContentVo.linkUrl)}`,
      })
      return;
    }
  }
  preViewImage = (url,e)=>{
    const {files} = this.props.postDetail.detailData;
    e.stopPropagation();
    let newFiles = files.filter(item=>item.type == 1);
    let urls = newFiles.map(item=>item.url);
    Taro.previewImage({
      current: url,
      urls: urls
    })
  }
  preViewVideo = (e)=>{
    e.stopPropagation();
  }
  
  render() {
    const {
      pid,
      title,
      content,
      views = 0,
      replys = 0,
      markes = 0,
      isMark = false,
      createTime = '2020-03-29 21:29:00',
      uid,
      files,
      linkContentVo,
      userSnapshot: {
        city='上海',
        country = '宝山',
        headImg = '',
        nickName = '昵称1',
        sex = 'MALE',
        customLevel = [{desc:'3岁9个月'}]
      }
    } = this.props.postDetail.detailData
    console.log(1122,this.props.postDetail.detailData)
    return (
      <View>
        {
          pid &&
          <View className='main-panel-view'>
          <View className='user-info' onClick={this.viewProfileInfo.bind(this,uid)}>
            <View className='avatar'>
              {
                headImg ?
                  <Image src={headImg} className='avatar-img' /> :
                  null
              }
            </View>
            <View className='infos'>
              {
                <View className='name-area'>
                  <Text className='name' style={{color:this.getNickNameColor(sex || 'FEMALE')}}>{nickName}</Text>
                  <Image className='sex' src={sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON}></Image>
                  <Text className='years-old'>{ city + ' ' + country}</Text>
                  <Text className='years-old'>{customLevel.length && customLevel[0].desc}</Text>
                  <Button className='btn-share' open-type='share' onClick={this.share.bind(this,pid)}>
                    <Image src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                  </Button>
                  
                </View>
              }
              <Text className='times'>{FormaDate(createTime)}</Text>
            </View>
          </View>
          <View onClick={this.reply.bind(this)} onLongPress={this.deletePost.bind(this,this.props.postDetail.detailData)}>
              <View className='title'>{title}</View>
              {linkContentVo && <View className='webview-mod' onClick={this.navToWebView.bind(this, linkContentVo)}
              >
                <Image className='webview-image' src={linkContentVo.linkCover} mode="widthFix"/>
                <View className='link-tip'><Text className='text'>{linkContentVo.linkAbstract}</Text>  <Image className='link-icon' src={ICONS.Link} /></View>
              </View>}
              <View className='content'>{
                renderCircleReferContent(content)
            }</View>
            <View className='contents'>
                {
                  files && files.map(item => {
                    return <View>
                      { item.type == 1 ?
                        <Image onClick={this.preViewImage.bind(this,item.url)} mode={'aspectFit'} src={item.url}></Image>
                        : <Video id={item.url} playBtnPosition={"center"} onClick={this.preViewVideo.bind(this,item.url)} src={item.url}></Video>
                      }
                      </View>
                  })
                }
              </View>
          </View>
         
          <View className='tags'>
            <View className='tips'>
              <View className='views'>
                <Image className='img' src={ICONS.PREVIEW} />
                <Text>{views}</Text>
              </View>
              <View className='comment' onClick={this.reply.bind(this)}>
                <Image className='img' src={ICONS.COMMENT} />
                <Text>{replys}</Text>
              </View>
              <View className='favorite'>
                <Image className='img' onClick={this.handleFavorite} src={isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE} />
                <Text>{markes}</Text>
              </View>
            </View>
          </View>
        </View>
        }
      </View>
      
    )
  }
}