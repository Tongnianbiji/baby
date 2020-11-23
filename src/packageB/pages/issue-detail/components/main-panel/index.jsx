import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { ICONS } from '@common/constant'
import { observer, inject } from 'mobx-react'
import  FormaDate from '@common/formaDate'
import BaseComponent from '@common/baseComponent'
import './index.scss'
import Model from '../../model'
import staticData from '@src/store/common/static-data'

@inject('issueDetailStore')
@observer
export default class MainPanelComponent extends BaseComponent {
  static defaultProps = {
    info: {},
    onShare:()=>{}
  }


  handleFavorite = async() => {
    const {updateQuestionFavoriteMarks, issueDetail} = this.props.issueDetailStore;
    const { isMark, qid } = issueDetail;
    const {isLogin} = staticData;
    let params = {
      markes: 1,
      isMark:true
    }
    if(isLogin){
      if (isMark) {
        params.markes = -1;
        params.isMark = false;
        const d = await Model.questionMarkCancel(qid);
      } else {
        const d = await Model.questionMark(qid);
      }
      Taro.vibrateShort();
      updateQuestionFavoriteMarks(params)
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }


  getNickNameColor = (sex)=>{
    if(sex === 'MALE'){
      return '#027AFF'
    }else{
      return '#FF1493'
    }
  }

  share = (qid,e)=>{
    e.stopPropagation();
    this.props.onShare(qid)
  }

  viewProfileInfo = (uid,e)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url:`/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

   //去回答
   goAnswer = (qid)=>{
    Taro.navigateTo({
      url:`/packageB/pages/create-answer/index?qid=${qid}`
    })
  }

  deleteQuestion = (model)=>{
    const {userId} = this.getUserInfo();
    if(userId === model.uid){
      Taro.showActionSheet({
        itemList: ['删除'],
        success: async (res)=> {
          if(res.tapIndex == 0){
            let r = await Model.deleteQuestion(model.qid);
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

  render() {
    const {
      title,
      content,
      views = 0,
      replys = 0,
      markes = 0,
      isMark = false,
      createTime = '2020-03-29 21:29:00',
      qid=1,
      uid='',
      userSnapshot: {
        city='上海',
        country = '宝山',
        headImg = '',
        nickName = '昵称1',
        sex = 'MALE',
        customLevel = [{desc:'3岁9个月'}]
      }} = this.props.issueDetailStore.issueDetail;
    return (
      <View>
        {  qid &&
           <View className='main-panel-view'>
           <View className='user-info'>
             <View className='avatar' onClick={this.viewProfileInfo.bind(this,uid)}>
               {
                 headImg ?
                   <Image src={headImg} className='avatar-img' /> :
                   null
               }
             </View>
             <View className='infos'>
               <View className='name-area'>
             <Text className='name' style={{color:this.getNickNameColor(sex || 'FEMALE')}}>{nickName}</Text>
                 <Image className='sex' src={sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON}></Image>
                 <Text className='years-old'>{ city + ' ' + country}</Text>
                 <Text className='years-old'>{customLevel.length && customLevel[0].desc}</Text>
                 <Button className='btn-share' open-type='share' onClick={this.share.bind(this,qid)}>
                     <Image src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                   </Button>
               </View>
               <Text className='times'>{FormaDate(createTime)}</Text>
             </View>
           </View>
           <View className='issue' onClick={this.goAnswer.bind(this,qid)} onLongPress={this.deleteQuestion.bind(this,this.props.issueDetailStore.issueDetail)}>
             <View className='icon'>问</View>
             <View className='txt'>{title}</View>
           </View>
           <View className='tags'>
             <View className='tips'>
               <View className='views'>
                 <Image className='img' src={ICONS.PREVIEW} />
                 <Text>{views}</Text>
               </View>
               <View className='comment'>
                 <Image className='img' src={ICONS.EDIT} />
                 <Text>{replys}</Text>
               </View>
               <View className='favorite'>
                 <Image className='img' onClick={this.handleFavorite.bind(this)} src={isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE}/>
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