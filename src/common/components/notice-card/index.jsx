import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import FormaDate from '@common/formaDate'
import { ICONS } from '../../constant'
import './styles.scss'

export default class NoticeCard extends Component {
  static defaultProps = {
    data: {},
    isShowTools: true,
    countryAble: true,
    isShowUserInfo: true,
    ishowAvatar: true,
    type: 'post', //post|qa,
    onHandleFavorite: () => { },
    onNoticeClick: ()=>{}
  }

  constructor(props) {
    super(props)
  }

  handleFavorite = (pid, e) => {
    e.stopPropagation();
    this.props.onHandleFavorite(pid)
  }

  handleNoticeClick = (data)=>{
    this.props.onNoticeClick(data)
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

  renderQA() {
    const { data, isShowTools } = this.props;
    return (
      <View className='qa-wrapper' onClick={this.handleNoticeClick.bind(this,data)}>
        <View className='questions'>
          <View className='icon'>问</View>
          <View className='txt'>{data.title && data.title}</View>
        </View>
        <View className='anwser'>
          <View className='icon'>答</View>
          <View className='txt'>张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三</View>
        </View>
        <View className='tags'>
          {
            this.props.countryAble &&
            <View className='community-area'>
              <Text className='community-name'>{(data && data.userSnapshot && data.userSnapshot.city && `${data.userSnapshot.city} ${data.userSnapshot.country}`) || '上海 新城'}</Text>
            </View>
          }
          {
            isShowTools &&
            <View className='tips'>
              <View className='views'>
                <Image className='img' src={ICONS.PREVIEW} />
                <Text>{data.views || 0}</Text>
              </View>
              <View className='comment'>
                <Image className='img' src={ICONS.EDIT} />
                <Text>{data.replys || 0}</Text>
              </View>
              <View className='favorite'>
                <Image className='img' onClick={this.handleFavorite.bind(this, data)} src={data.isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE} />
                <Text>{data.markes || 0}</Text>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }

  renderFav() {
    return (
      <View className='fav-txt'>济阳三村幼儿园什么时候开学</View>
    )
  }

  render() {
    const {ishowAvatar,isShowUserInfo} = this.props;
    return (
      <View className='ui-notice-card'>
        {
          ishowAvatar &&
          <View className='avatar-wrapper'>
            <View className='avatar'></View>
          </View>
        }

        <View className='contents'>
          {
            isShowUserInfo &&
            <View className='title-line'>
              <View className='title'>
                <View className='txt'>张三</View>
                <View className='sub'>回复了你的贴子</View>
              </View>
              <View className='time'>01/25</View>
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
    )
  }
}