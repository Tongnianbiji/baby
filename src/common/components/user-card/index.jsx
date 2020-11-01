import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import { ICONS } from '../../constant'
import './styles.scss'

export default class UserInfoCard extends Component {

  static defaultProps = {
    model:{},
    tip:'关注了你',
    onSubscr:()=>{},
    onGetUserDetail:()=>{},
  }

  constructor(props) {
    super(props)
  }

  handleSubscr = (model,e)=>{
    e.stopPropagation();
    this.props.onSubscr(model)
  }

  handleGetUserDetail = (model)=>{
    this.props.onGetUserDetail(model)
  }

  getNickNameColor = (sex)=>{
    if(sex === 'MALE'){
      return '#027AFF'
    }else{
      return '#FF1493'
    }
  }


  render() {
    const { tip,model,model:{post ,flow, funs,marked,stared,createDt,headImg,district,signature,nickName}} = this.props;
    return (
      <View className='ui-user-info-card' onClick={this.handleGetUserDetail.bind(this,model)}>
        <View className='avatar-wrapper'>
          <View className='avatar'>
            <Image src={headImg}></Image>
          </View>
        </View>
        <View className='info-wrapper'>
          <View className='name-area'>
            <Text className='name' style={{color:this.getNickNameColor(model.sex || 'FEMALE')}}>{nickName}</Text>
            <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
            <View className='tags-warpper'>
              <View className='tag'>大宝:两岁一个月</View>
              <View className='tag'>小宝:九个月</View>
            </View>
          </View>
          <View className='sub-title'>{district} {district&&signature&& '|'} {signature}</View>
          <View className='nubmers'>
            <View className='num'>粉丝: {funs}</View>
            <View className='num'>发布: {post}</View>
            <View className='num'>收藏: {flow}</View>
          </View>
          <View className='sub-title'>{`${createDt} ${tip}`}</View>
        </View>
        <View onClick={this.handleSubscr.bind(this,model)} className={`btn-attention${model.isSubscr ? ' attentioned' : ''}`}>{model.isSubscr  ? '已关注' : '关注'}</View>
      </View>
    )
  }
}