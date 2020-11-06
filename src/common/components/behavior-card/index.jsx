import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image,Button } from '@tarojs/components'
import PostCard from '@components/post-card'
import NoticeCard from '@components/notice-card'
import UserCard from '@components/user-card'
import CircleCard from '@components/circle-card'
import './styles.scss'


export default class BehaviorCard extends Component {
  static defaultProps = {
    data:{},
    onHandleFavorite:()=>{},
    onSubScrUser:()=>{},
    onHandleSubscr:()=>{}
  }

  hanleFavorite = (model)=>{
    this.props.onHandleFavorite(model)
  }

  SubScrUser = (model)=>{
    this.props.onSubScrUser(model)
  }

  handleSubscr = (model)=>{
    this.props.onHandleSubscr(model)
  }

  render() {
   const {data,data:{type}} = this.props;
    return (
      <View>
        {
          type === 3001 && 
          <PostCard model={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)}></PostCard>
        }
        {
          type === 4001 && 
          <NoticeCard isShowUserInfo={false} ishowAvatar={false} data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 3005 && 
          <PostCard model={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} needShared></PostCard>
        }
        {
          type === 4005 && 
          <NoticeCard isShowUserInfo={false} ishowAvatar={false} isShowAnswer={false} isOldQuestion isShowQuestion={false} data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 3003 && 
          <PostCard model={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} isMyReply isShowTools={false}></PostCard>
        }
        {
          type === 4003 && 
          <NoticeCard isShowUserInfo={false} ishowAvatar={false} isShowQuestion={false} isShowAnswer isOldQuestion data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 3008 && 
          <PostCard model={data.entity} activeModel={data} isShowTools={false} onHandleFavorite={this.hanleFavorite.bind(this)} isMyReply></PostCard>
        }
        {
          type === 4008 && 
          <NoticeCard data={data.entity} activeModel={data} isShowUserInfo={false} ishowAvatar={false} isShowAnswer isOldQuestion isShowQuestion={false} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 1001 && 
          <CircleCard data={data.entity} activeModel={data} isShowReleaseTime onHandleSubscr={this.handleSubscr.bind(this)}></CircleCard>
        }
        {
          type === 2001 && 
          <UserCard tip={''} model={data.entity} activeModel={data} isShowReleaseTime onSubscr={this.SubScrUser.bind(this)}></UserCard>
        }
      </View>
    )
  }
}