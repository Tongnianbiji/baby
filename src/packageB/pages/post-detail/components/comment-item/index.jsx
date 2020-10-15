import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { ICONS } from '@common/constant'
import { observer, inject } from 'mobx-react'
import FormaDate from '@common/formaDate'

import './index.scss'
@inject('postDetail')
@observer
export default class CommentItem extends Component {
  static defaultProps = {
    model: {},
    needLine: false,
    hasChildren: false,
    hasChildredSibling: false,
    last: false,
    onReplyPost: () => { }
  }
  replyPost = (model, e) => {
    e.stopPropagation()
    this.props.onReplyPost(model)
  }
  handleLike = (model,e) => {
    const {getCurrentReplyPostData,handleLike,updateIsToPostOwnerStatus} = this.props.postDetail;
    e.stopPropagation();
    updateIsToPostOwnerStatus(false);
    getCurrentReplyPostData(model);
    handleLike()
  }

  handleDisLike = (model,e) => {
    const {getCurrentReplyPostData,handleDisLike,updateIsToPostOwnerStatus} = this.props.postDetail;
    e.stopPropagation();
    updateIsToPostOwnerStatus(false);
    getCurrentReplyPostData(model);
    handleDisLike()
  }
  render() {
    const { avatar, children, needLine, hasChildren, hasChildredSibling, last, model, model: {
      content,
      createTime='2020-03-29 21:29:00',
      dislikes = 0,
      isDislikes,
      isLikes = true,
      likes = 0,
      files=[],
      userSnapshot: {
        city = '上海',
        country = '宝山',
        headImg = '',
        nickName = '昵称1',
        sex = 'MALE',
        customLevel = [{ desc: '3岁9个月' }]
      }
    } } = this.props;
    return (
      <View className={`comment-item${needLine ? ' need-line' : ''}`}>
        <View className='info-wrapper' onClick={this.replyPost.bind(this, model)}>
          <View className='user-info'>
            <View className="inline-block">
              <View className='avatar'>
                {
                  avatar ?
                    <Image src={avatar} className='avatar-img' /> :
                    null
                }
              </View>
            </View>
            
            <View className='infos'>
              <View className='name-area'>
                <View className="inline-block">
                  <View className="inline-block">
                    <Text className='name'>{nickName}</Text>
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
                <Text className='years-old'>{customLevel.length && customLevel[0].desc}</Text>
              </View>
            </View>

            <View className='like-btns'>
              <View className='btns-wrapper'>
                <View className='like-btn' onClick={this.handleLike.bind(this,model)}>
                  <Image src={isLikes ? ICONS.FULLLIKE : ICONS.LIKE} className='like-btn-img' />
                  {likes}
                </View>
                <View className='like-btn dis-like' onClick={this.handleDisLike.bind(this,model)}>
                  <Image src={isDislikes ? ICONS.FULLDISLIKE : ICONS.DISLIKE} className='like-btn-img' />
                  {dislikes}
                </View>
              </View>
            </View>
            {!needLine && <View className='line' />}
          </View>
          <View className="inline-block">
            <View className='contents'>{content}</View>
            <View className='contents'>
              {
                files.map(item=>{
                  return <Image mode={'aspectFit'} src={item.url}></Image>
                })
              }
            </View>
           
          </View>
          {!!hasChildren && <View className='vertical-line' />}
        </View>
        <View className='children-nodes'>
          {children}
          {!!hasChildren && <View className='vertical-line-bottom' />}
        </View>
        {!!last && <View className='hide-more-line' />}
      </View>
    )
  }
}