import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import FormaDate from '@common/formaDate'
import { ICONS } from '../../constant'
import Behaviors from '@common/utils/behaviors'
import './styles.scss'

export default class NoticeCard extends Component {
  static defaultProps = {
    data: {},
    activeModel: {},
    isShowTools: true,
    countryAble: true,
    isShowUserInfo: true,
    ishowAvatar: true,
    isShowQuestion: true,
    isShowAnswer: true,
    isOldQuestion: false,
    isShowTime: false,
    isShowReleaseTime:true,
    tip:'',
    type: 'post', //post|qa,
    onHandleFavorite: () => { },
    onNoticeClick: () => { }
  }

  constructor(props) {
    super(props)
  }

  handleFavorite = (qid, e) => {
    e.stopPropagation();
    this.props.onHandleFavorite(qid)
  }

  handleNoticeClick = (data) => {
    const { activeModel } = this.props;
    let qid = '';
    if(data.qid){
      qid=data.qid;
      Taro.navigateTo({
        url: `/packageB/pages/issue-detail/index?qid=${qid}`
      })
    }
    else if(activeModel.entity.qid){
      qid=activeModel.entity.qid
      Taro.navigateTo({
        url: `/packageB/pages/issue-detail/index?qid=${qid}`
      })
    }else if(data.pid){
      Taro.navigateTo({
        url: `/packageB/pages/post-detail/index?pid=${data.pid}`
      })
    }
    this.props.onNoticeClick(data)
  }

  viewCircleDetail = cid => {
    if (!cid) {
      cid = '10397889'
    }
    Taro.navigateTo({
      url: `/packageA/pages/circle-detail/index?cid=${cid}`
    })
  }

  viewProfileInfo = (uid,e)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url:`/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

  renderPost() {
    const { data } = this.props
    return (
      <View>
        <View className='content-txt'>{data.title && data.title}</View>
        <View className='refrence'>济阳三村幼儿园什么时候开学</View>
      </View>
    )
  }

  formateType(type){
    const type1 = [3003,3005];
    const type2 = [4003,4005];
    if(type1.includes(type)){
      return '原帖：'
    }
    else if(type2.includes(type)){
      return '原提问：'
    }
  }

  renderQA() {
    const { data, isShowTools, isShowQuestion, isShowAnswer, isOldQuestion, isShowTime ,activeModel} = this.props;
    return (
      <View className='qa-wrapper'>

        {
          isShowTime &&
          <View className='questions'>
            <View className='txt' style="padding:0;font-size:24rpx;color:#999999;margin-bottom:5px">{data && data.createTime && FormaDate(data.createTime) || '2019/03/02'}</View>
          </View>
        }
        {
          isShowQuestion &&
          <View className='questions'>
            <View className='icon'>问</View>
            <View className='txt'>{data.title && data.title}</View>
          </View>
        }

        {
          isShowAnswer && (data.content || activeModel.content || activeModel.title) &&
          <View className='anwser'>
            <View className='icon'>答</View>
            <View className='txt'>{data.content || activeModel.content || activeModel.title}</View>
          </View>
        }
        <View>
          {
            isOldQuestion &&
            <View className='anwser'>
              <View className='txt no-active' style="padding:0">原问题：{data.title || activeModel.entity && (activeModel.entity.title || activeModel.entity.content)}</View>
            </View>
          }
        </View>



        <View className='tags'>
          {
            this.props.countryAble &&
            <View className='community-area'>
              <View className='community-name'>{(data && data.cid && data.cName && `${data.cName}`) || '备孕交流'}</View>
            </View>
          }
          {
            isShowTools &&
            <View className='tips'>
              <View className='views'>
                <Image className='img' src={ICONS.PREVIEW} />
                <View>{data.views || 0}</View>
              </View>
              <View className='comment'>
                <Image className='img' src={ICONS.EDIT} />
                <View>{data.replys || 0}</View>
              </View>
              <View className='favorite'>
                <Image className='img' onClick={this.handleFavorite.bind(this, data)} src={data.isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE} />
                <View>{data.markes || 0}</View>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }

  renderFav() {
    const { activeModel,tip} = this.props;
    return (
      <View>
        <View className='fav-txt'>{activeModel.title}</View>
        <View className='fav-txt' style="color:#999999">{this.formateType(activeModel.type)}{activeModel.entity.title}</View>
      </View>
   
    )
  }

  render() {
    const { ishowAvatar, isShowUserInfo, activeModel,tip ,isShowReleaseTime,data} = this.props;
    return (
      <View className="wrapper" onClick={this.handleNoticeClick.bind(this, data)}>
        {
          activeModel.userSnapshot && isShowReleaseTime && 
          <View className="behavior">{`${activeModel.userSnapshot && activeModel.userSnapshot.nickName}${Behaviors(activeModel.type)} | ${activeModel.updateAt && FormaDate(activeModel.updateAt)}`}</View>
        }
        <View className='ui-notice-card'>
        {
          ishowAvatar &&
          <View className='avatar-wrapper' onClick={this.viewProfileInfo.bind(this,activeModel.uid)}>
            <View className='avatar'>
              <Image src={activeModel && activeModel.userSnapshot.headImg}></Image>
            </View>
          </View>
        }

        <View className='contents'>
          {
            isShowUserInfo &&
            <View className='title-line'>
              <View className='title'>
              <View className='txt'>{activeModel && activeModel.userSnapshot.nickName}</View>
                <View className='sub'>{Behaviors(activeModel && activeModel.type)}</View>
              </View>
              <View className='time'>{FormaDate(activeModel && activeModel.updateAt)}</View>
            </View>
          }

          {
            this.props.type === 'post' ?
              this.renderPost() :
              this.props.type === 'qa' ?
                this.renderQA() :
                this.renderFav()
          }
        </View>
      </View>
      </View>
      
    )
  }
}