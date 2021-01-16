import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import PostCard from '@components/post-card'
import NoticeCard from '@components/notice-card'
import UserCard from '@components/user-card'
import CircleCard from '@components/circle-card'
import './styles.scss'


export default class BehaviorCard extends PureComponent {
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
    const { data, data: { type, contentType }} = this.props;
    return (
      <View>
        {
          type === 3001 && 
          <PostCard model={data.entity} isTitleFirst activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} needShared></PostCard>
        }
        {
          (type === 4001 || type === 4005) && 
          <NoticeCard isShowUserInfo={false} needShared ishowAvatar={false} data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 3005 && 
          <PostCard model={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} needShared></PostCard>
        }
        {/* {
          type === 4005 && 
          <NoticeCard isShowUserInfo={false} needShared ishowAvatar={false} isOldQuestion isShowQuestion={false} data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        } */}
        {
          type === 3003 && 
          <PostCard model={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} needShared isMyReply isShowTools={false}></PostCard>
        }
        {
          type === 4003 && 
          <NoticeCard isShowUserInfo={false} needShared ishowAvatar={false} isShowQuestion={false} isShowAnswer isOldQuestion data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 3008 && 
          <PostCard model={data.entity} activeModel={data} isShowTools={false} onHandleFavorite={this.hanleFavorite.bind(this)} needShared isMyReply></PostCard>
        }
        {
          type === 4008 && 
          <NoticeCard data={data.entity} needShared activeModel={data} isShowUserInfo={false} ishowAvatar={false} isShowAnswer isOldQuestion isShowQuestion={false} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          type === 1001 && 
          <CircleCard data={data.entity} activeModel={data} isShowReleaseTime onHandleSubscr={this.handleSubscr.bind(this)}></CircleCard>
        }
        {
          type === 2001 && 
          <UserCard tip={''} isShowTip={false} model={data.entity} activeModel={data} isShowReleaseTime onSubscr={this.SubScrUser.bind(this)}></UserCard>
        }
        {
          contentType === 1 && 
          <PostCard model={data.entity} activeModel={data} closeRelease needShared onHandleFavorite={this.hanleFavorite.bind(this)}></PostCard>
        }
        {
          contentType === 2 && 
          <PostCard model={data.entity} activeModel={data} closeRelease onHandleFavorite={this.hanleFavorite.bind(this)} needShared isMyReply isShowTools={false}></PostCard>
        }
        {
          contentType === 3 && 
          <NoticeCard isShowUserInfo={false} needShared ishowAvatar={false} isShowReleaseTime={false} data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
        {
          contentType === 4 && 
          <NoticeCard isShowUserInfo={false} needShared ishowAvatar={false} isShowReleaseTime={false} isShowQuestion={false} isShowAnswer isOldQuestion data={data.entity} activeModel={data} onHandleFavorite={this.hanleFavorite.bind(this)} type='qa'></NoticeCard>
        }
      </View>
    )
  }
}