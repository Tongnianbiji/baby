import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, Video } from '@tarojs/components'
import { ICONS } from '@common/constant'
import { observer, inject } from 'mobx-react'
import FormaDate from '@common/formaDate'
import staticData from '@src/store/common/static-data'
import { renderCircleReferContent } from '@components/circle-refer-conent'

import './index.scss'
let videoContext = null;
@inject('postDetail')
@observer
export default class CommentItem extends Component {
  static defaultProps = {
    model: {},
    needLine: false,
    hasChildren: false,
    hasChildredSibling: false,
    last: false,
    onReplyPost: () => { },
    onHandleDelete:()=>{},
    isShowContent:true
  }

  constructor(props){
    super(props);
    this.state = {
      autoplay:false,
      muted:true
    }
  }

  replyPost = (model, e) => {
    e.stopPropagation();
    this.props.onReplyPost(model)
  }
  viewProfileInfo = (uid,e)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url:`/packageA/pages/profile-home/index?userId=${uid}`
    })
  }
  toggleInfo = (e)=>{
    e.stopPropagation();
    this.props.onToggleInfo();
  }
  handleLike = (model, e) => {
    const { getCurrentReplyPostData, handleLike, updateIsToPostOwnerStatus } = this.props.postDetail;
    const {isLogin} = staticData;
    e.stopPropagation();
    if(isLogin){
      updateIsToPostOwnerStatus(false);
      getCurrentReplyPostData(model);
      handleLike()
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  handleDisLike = (model, e) => {
    const { getCurrentReplyPostData, handleDisLike, updateIsToPostOwnerStatus } = this.props.postDetail;
    const {isLogin} = staticData;
    e.stopPropagation();
    if(isLogin){
      updateIsToPostOwnerStatus(false);
      getCurrentReplyPostData(model);
      handleDisLike()
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  handleDelete=(model)=>{
    this.props.onHandleDelete(model)
  }

  preViewImage = (url,e)=>{
    const {files} = this.props.model;
    e.stopPropagation();
    let newFiles = files.filter(item=>item.type == 1);
    let urls = newFiles.map(item=>item.url);
    Taro.previewImage({
      current: url,
      urls: urls
    })
  }

  preViewVideo = (id,e)=>{
    e.stopPropagation();
    //videoContext = wx.createVideoContext(id);
    //videoContext.requestFullScreen({ direction: 0 });
    // this.setState({
    //   muted:false
    // })
  }

  screenChange = (e)=>{
    console.log('****',e)
  }

  getNickNameColor = (sex)=>{
    if(sex === 'MALE'){
      return '#027AFF'
    }else{
      return '#FF1493'
    }
  }

  render() {
    const { isShowContent,avatar, children, needLine, hasChildren, hasChildredSibling, last, model, model: {
      content,
      createTime = '2020-03-29 21:29:00',
      dislikes = 0,
      isDislikes,
      isLikes = true,
      likes = 0,
      files = [],
      uid,
      replys,
      userSnapshot: {
        city = '上海',
        country = '宝山',
        headImg = '',
        nickName = '昵称1',
        sex = 'MALE',
        customLevel = [{ desc: '3岁9个月' }]
      }
    } } = this.props;
    const {autoplay,muted} = this.state;
    return (
      <View className={`comment-item${needLine ? ' need-line' : ''}`}>
        <View className='info-wrapper'>
          <View className='user-info'>
            <View className="inline-block">
              <View className='avatar' onClick={this.viewProfileInfo.bind(this,uid)}>
                {
                  headImg ?
                    <Image src={headImg} className='avatar-img' /> :
                    null
                }
              </View>
            </View>
            <View className='infos' onClick={this.toggleInfo.bind(this)}>
              <View className='name-area'>
                <View className="inline-block">
                  <View className="inline-block">
                    <Text className='name' style={{color:this.getNickNameColor(sex || 'FEMALE')}}>{nickName}</Text>
                  </View>
                </View>
                <Image className='sex' src={sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON}></Image>
                <View className="inline-block">
                  <View className="inline-block">
                    <Text className='times'>{FormaDate(createTime)}</Text>
                  </View>
                </View>
              </View>
              <View className="inline-block">
                <Text className='years-old'>{`${city} ${country}`}</Text>
              </View>
              <View className="inline-block">
                <Text className='years-old'>{!!customLevel.length && customLevel[0].desc}</Text>
              </View>
            </View>
            {/* <View className='like-btns'>
              <View className='btns-wrapper'>
                <View className='like-btn' onClick={this.handleLike.bind(this, model)}>
                  <Image src={isLikes ? ICONS.FULLLIKE : ICONS.LIKE} className='like-btn-img' />
                  {likes}
                </View>
                <View className='like-btn dis-like' onClick={this.handleDisLike.bind(this, model)}>
                  <Image src={isDislikes ? ICONS.FULLDISLIKE : ICONS.DISLIKE} className='like-btn-img' />
                  {dislikes}
                </View>
              </View>
            </View> */}
            {!needLine && <View className='line' />}
          </View>
          {
            isShowContent && 
            <View onClick={this.replyPost.bind(this, model)} onLongPress={this.handleDelete.bind(this,model)}>
              <View className='contents'>{renderCircleReferContent(content)}</View>
              <View className='contents'>
                {
                  files.map(item => {
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
          }
          
          <View className='like-btns'>
              <View className='btns-wrapper'>
                <View className='like-btn' onClick={this.replyPost.bind(this, model)}>
                    {/* <Image src={ICONS.COMMENT} className='like-btn-img' /> */}
                    回复
                </View>
                <View className='like-btn' onClick={this.handleLike.bind(this, model)}>
                  <Image src={isLikes ? ICONS.FULLLIKE : ICONS.LIKE} className='like-btn-img' />
                  {likes}
                </View>
                <View className='like-btn dis-like' onClick={this.handleDisLike.bind(this, model)}>
                  <Image src={isDislikes ? ICONS.FULLDISLIKE : ICONS.DISLIKE} className='like-btn-img' />
                  {dislikes}
                </View>
              </View>
            </View>
          {!!hasChildren && isShowContent && <View className='vertical-line' />}
        </View>
        <View className={['children-nodes',isShowContent ? '' : 'show-toggle']}>
          {children}
          {!!hasChildren && isShowContent && <View className='vertical-line-bottom' />}
        </View>
        {!!last && <View className='hide-more-line' />}
      </View>
    )
  }
}