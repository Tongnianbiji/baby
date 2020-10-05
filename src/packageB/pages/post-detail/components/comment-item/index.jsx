import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { ICONS } from '@common/constant'
import './index.scss'

export default class CommentItem extends Component {
  static defaultProps = {
    model: {},
    needLine: false,
    hasChildren: false,
    hasChildredSibling:false,
    last: false,
    onReplyPost:()=>{}
  }
  replyPost = (model) => {
    console.log('******',model)
    this.props.onReplyPost(model)
  }
  render() {
    const { avatar, children, needLine, hasChildren, hasChildredSibling, last, model, model: {
      content,
      createTime,
      dislikes=0,
      isDislikes,
      isLikes,
      likes=0
    } } = this.props;
    return (
      <View className={`comment-item${needLine ? ' need-line' : ''}`}>
        <View className='info-wrapper' onClick={this.replyPost.bind(this,model)}>
          <View className='user-info'>
            <View className='avatar'>
              {
                avatar ?
                  <Image src={avatar} className='avatar-img' /> :
                  null
              }
            </View>
            <View className='infos'>
              <View className='name-area'>
                <Text className='name'>李庭语妈妈</Text>
                <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
                <Text className='times'>贴主 2小时前</Text>
                <View className='like-btns'>
                  <View className='btns-wrapper'>
                    <View className='like-btn'>
                      <Image src={ICONS.LIKE} className='like-btn-img' />
                    {likes}
                  </View>
                    <View className='like-btn dis-like'>
                      <Image src={ICONS.DISLIKE} className='like-btn-img' />
                    {dislikes}
                  </View>
                  </View>
                </View>
              </View>
              <Text className='years-old'>上海 嘉定</Text>
              <Text className='years-old'>3岁9个月</Text>
            </View>
            {!needLine && <View className='line' />}
          </View>
          <View className='contents'>{content}</View>
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