import Taro, { connectSocket } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { ICONS } from '../../constant'
import Behaviors from '@common/utils/behaviors'
import FormaDate from '@common/formaDate'
import './styles.scss'

export default class UserInfoCard extends Component {

  static defaultProps = {
    model: {},
    activeModel: {},
    tip: '关注了你',
    isShowReleaseTime:false,
    isShowTip:true,
    isShowDistance:false,
    kw:'',
    onSubscr: () => { },
    onGetUserDetail: () => { },
  }

  constructor(props) {
    super(props)
  }

  highLight = (originTxt, kw) => {
    if (!kw) {
      kw = '济阳'
    }
    const reg = new RegExp(kw, 'gi');
    const contentReg = /^_#_([^_#_]+)_#_$/;
    const newList = [];
    let c = 1;
    originTxt.replace(reg, (matched) => `,_#_${matched}_#_,`).split(',').map(t => {
      const isView = contentReg.test(t)
      t && newList.push({
        id: ++c,
        type: isView ? 'view' : 'text',
        value: isView ? t.match(contentReg)[1] : t
      })
    })
    return newList;
  }

  handleSubscr = (model, e) => {
    e.stopPropagation();
    this.props.onSubscr(model)
  }

  handleGetUserDetail = (model) => {
    this.props.onGetUserDetail(model)
  }

  viewProfileInfo = (e)=>{
    const {entityUid} = this.props.activeModel;
    const {userId} = this.props.model;
    e.stopPropagation();
    if(userId){
      Taro.navigateTo({
        url:`/packageA/pages/profile-home/index?userId=${userId}`
      })
    }
    else if(entityUid){
      Taro.navigateTo({
        url:`/packageA/pages/profile-home/index?userId=${entityUid}`
      })
    }
  }

  getNickNameColor = (sex) => {
    if (sex === 'MALE') {
      return '#027AFF'
    } else {
      return '#FF1493'
    }
  }

  render() {
    const { isShowDistance,kw,isShowTip,tip, model, model: { post, flow, funs, createDt, headImg, district, signature, nickName, city, country,sex,stared }, activeModel,isShowReleaseTime } = this.props;
    return (
      <View className="wrapper">
        {
          activeModel.userSnapshot && isShowReleaseTime && 
          <View className="behavior">{`${activeModel.userSnapshot && activeModel.userSnapshot.nickName}${Behaviors(activeModel.type)} | ${activeModel.updateAt && FormaDate(activeModel.updateAt)}`}</View>
        }
        <View className='ui-user-info-card' onClick={this.handleGetUserDetail.bind(this, model)}>
          <View className='avatar-wrapper' onClick={this.viewProfileInfo.bind(this)}>
            <View className='avatar'>
              <Image src={model.headImg || activeModel.userSnapshot && activeModel.userSnapshot.headImg}></Image>
            </View>
          </View>
          <View className='info-wrapper'>
            <View className='name-area'>
              {
                kw ? 
                <View className='name'>
                {
                  this.highLight(nickName, kw).map(t => {
                    return (
                      t.type === 'view' ?
                        <View className='matched-txt' key={t.id}>{t.value}</View> :
                        <Text key={t.id}>{t.value}</Text>
                    )
                  })
                }
              </View>
              :
              <Text className='name' style={{ color: this.getNickNameColor(sex || activeModel.userSnapshot && activeModel.userSnapshot.sex || 'FEMALE') }}>{nickName || activeModel.userSnapshot.nickName}</Text>
              }
              
              <Image className='sex' src={sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON}></Image>
              <View className='tags-warpper'>
                <View className='tag'>{district || `${city} ${country}` || `${activeModel.userSnapshot.city} ${activeModel.userSnapshot.country}`}</View>
                {
                  [1,2].map(item=>{
                    return(
                      <View className='tag'>大宝:两岁一个月</View>
                    )
                  })
                }
              </View>

            </View>
            <View className='sub-title'>{signature}</View>
            <View className='nubmers'>
              <View className='num'>粉丝: {funs}</View>
              <View className='num'>帖子: {post}</View>
              <View className='num'>获赞: {stared}</View>
            </View>
            {
              isShowTip && createDt && 
              <View className='sub-title'>{`${createDt} ${tip}`}</View>
            }
          </View>
          {
            isShowDistance && 
            <View className="distance">{model.distance}</View>
          }
          <View onClick={this.handleSubscr.bind(this, model)} className={`btn-attention${model.isSubscr ? ' attentioned' : ''}`}>{model.isSubscr ? '已关注' : '关注'}</View>
        </View>
      </View>
    )
  }
}