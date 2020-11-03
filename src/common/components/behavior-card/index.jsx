import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image,Button } from '@tarojs/components'
import FormaDate from '@common/formaDate'
import { ICONS } from '../../constant'
import Behaviors from '@common/utils/behaviors'
import PostCard from '@components/post-card'
import NoticeCard from '@components/notice-card'
import UserCard from '@components/user-card'
import CircleCard from '@components/circle-card'
import './styles.scss'


export default class BehaviorCard extends Component {
  static defaultProps = {
    data:{},
    onHandleFavorite:()=>{},
    onSubScrUser:()=>{}
  }

  hanleFavorite = (model)=>{
    this.props.onHandleFavorite(model)
  }

  SubScrUser = (model)=>{
    this.props.onSubScrUser(model)
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
          <NoticeCard isShowUserInfo={false} ishowAvatar={false} data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 3003 && 
          <PostCard model={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} onlyReleaseTime isMyReply isShowTools={false}></PostCard>
        }
        {
          type === 4003 && 
          <NoticeCard isShowUserInfo={false} ishowAvatar={false} data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 3008 && 
          <PostCard model={data.entity} activeModel={data} isShowTools={false} onHandleFavorite={this.hanleFavorite.bind(this)} isMyReply></PostCard>
        }
        {
          type === 4008 && 
          <NoticeCard data={data.entity} isShowTime isShowUserInfo={false} ishowAvatar={false} isOldQuestion isShowQuestion={false} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 1001 && 
          <CircleCard model={ata.entity}></CircleCard>
        }
        {
          type === 2001 && 
          <UserCard tip={''} model={data.entity} activeModel={data} onSubscr={this.SubScrUser.bind(this)}></UserCard>
        }
      </View>
    )
  }
}