import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { observer, inject } from 'mobx-react'
import { View, Image, Text } from '@tarojs/components'
import { ICONS } from '@common/constant'
import FormaDate from '@common/formaDate'
import Model from '../../model'

import './index.scss'

@inject('issueDetailStore')
@observer
export default class CommentItemView extends Component {
  static defaultProps = {
    model: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      postLock:false
    }
  }

  handleLike = async(model, e) => {
    e.stopPropagation();
    let { answerList, updateAnswerListIsLike } = this.props.issueDetailStore;
    let {postLock} = this.state;
    let preIndex = answerList.findIndex(item=>item.questionReplyBo.qid === model.qid && item.questionReplyBo.replyId === model.replyId);
    let params = {
      likes: 1,
      isLikes:true,
      preIndex
    }
    console.log()
    const { qid, replyId } = answerList[preIndex].questionReplyBo;
    if(!postLock){
      if (!answerList[preIndex].questionReplyBo.isDislikes) {
        if (answerList[preIndex].questionReplyBo.isLikes) {
          params.likes = -1;
          params.isLikes = false;
          const d = await Model.questionLikeCancel(qid, replyId);
        } else {
          const d = await Model.questionLike(qid, replyId);
        }
        Taro.vibrateShort();
        Taro.showToast({
          title:`点赞${params.likes}`,
          icon:'none'
        })
        updateAnswerListIsLike(params)
      }
    }
  }

  handleDisLike = async (model, e) => {
    e.stopPropagation();
    let { answerList, updateAnswerListIsDislike } = this.props.issueDetailStore;
    let {postLock} = this.state;
    let preIndex = answerList.findIndex(item=>item.questionReplyBo.qid === model.qid && item.questionReplyBo.replyId === model.replyId);
    let params = {
      dislikes: 1,
      isDislikes:true,
      preIndex
    }
    const { qid, replyId } = answerList[preIndex].questionReplyBo;
    if(!postLock){
      if (!answerList[preIndex].questionReplyBo.isLikes) {
        if (answerList[preIndex].questionReplyBo.isDislikes) {
          params.dislikes = -1;
          params.isDislikes = false;
          const d = await Model.questionDislikeCancel(qid, replyId);
        } else {
          const d = await Model.questionDislike(qid, replyId);
        }
        Taro.vibrateShort();
        Taro.showToast({
          title:`点踩${params.dislikes}`,
          icon:'none'
        })
        updateAnswerListIsDislike(params)
      }
    }
  }


  getNickNameColor = (sex)=>{
    if(sex === 'MALE'){
      return '#027AFF'
    }else{
      return '#FF1493'
    }
  }

  viewProfileInfo = (uid,e)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url:`/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

  render() {
    const {  
      content,
      createTime = '2020-03-29 21:29:00',
      dislikes = 0,
      isDislikes,
      isLikes = true,
      likes = 0,
      files = [],
      qid,
      uid,
      userSnapshot: {
        city = '上海',
        country = '宝山',
        headImg = '',
        nickName = '昵称1',
        sex = 'MALE',
        customLevel = [{ desc: '3岁9个月' }]
      } } = this.props.model
    return (
      <View className='comment-item-view'>
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
              <Text className='years-old'>{customLevel.length && customLevel[0].desc}</Text>
              <View className='like-btns'>
                <View className='btns-wrapper'>
                  <View className='like-btn' onClick={this.handleLike.bind(this, this.props.model)}>
                    <Image src={isLikes ? ICONS.FULLLIKE : ICONS.LIKE} className='like-btn-img' />
                    {likes}
                  </View>
                  <View className='like-btn' onClick={this.handleDisLike.bind(this, this.props.model)}>
                    <Image src={isDislikes ? ICONS.FULLDISLIKE : ICONS.DISLIKE} className='like-btn-img' />
                    {dislikes}
                  </View>
                </View>
              </View>
            </View>
            <Text className='times'>{FormaDate(createTime)}</Text>
          </View>
        </View>
        <View className='answer'>
          <View className='icon'>答</View>
          <View className='txt'>{content}</View>
        </View>
      </View>
    )
  }
}