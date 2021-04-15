import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { observer, inject } from 'mobx-react'
import { View, Image, Swiper, SwiperItem, Button } from '@tarojs/components'
import DTO from '../../../../common/localStorage'
import staticData from '@src/store/common/static-data'
import AvatarHelper from '@common/utils/avatarHelper'

import './styles.scss'

const dto = DTO.getInstance()

const ShareIconUrl = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/share-c.png'
const DetailIconUrl = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-b.png'

@inject('circleDetailStore')
@observer
class MainInfoPanel extends Component {
  static defaultProps = {
    cid: ''
  }

  constructor(props) {
    super(props)
    this.$store = this.props.circleDetailStore
  }

  toDesc = () => {
    const { description, name } = this.$store.detailInfo
    dto.setValue('/packageA/pages/circle-desc/index', description)
    Taro.navigateTo({
      url: `/packageA/pages/circle-desc/index?name=${name}`
    })
  }

  doAttention = () => {
    const { cid } = this.props
    const {isLogin} = staticData;
    if(isLogin){
      if (this.$store.isAttentioned) {
        this.$store.leaveCircle(cid).then(ok => {
          console.log(ok, 'leave');
        })
      } else {
        this.$store.joinCircle(cid).then(ok => {
          console.log(ok, 'join');
        })
      }
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  //查看父圈子
  viewParentCircle = (cid) => {
    Taro.navigateTo({ url: `/packageA/pages/circle-detail/index?cid=${cid}` })
  }
  //查看子圈子
  viewChildCircles = (cid) => {
    Taro.navigateTo({ url: `/packageA/pages/circle-detail/index?cid=${cid}` })
  }

  //查看更多父圈子
  viewMoreParentCircles = (cid) => {
    const { name } = this.$store.detailInfo
    Taro.navigateTo({ url: `/packageA/pages/more-circle/index?cid=${cid}&cname=${name}&circleType=parent` })
  }

  //查看更多子圈子
  viewMoreChildCircles = (cid) => {
    const { leaf, name } = this.$store.detailInfo;
    const { parentCircles } = this.$store
    const pcid = parentCircles && parentCircles[0] && parentCircles[0].cid;
    Taro.navigateTo({ url: `/packageA/pages/more-circle/index?pcid=${pcid}&cid=${cid}&cname=${name}&isSearch=1&circleType=${leaf ? 'sibling' : 'child'}` })
  }
  toDescById(pid) {
    Taro.navigateTo({
      url: `/packageB/pages/post-detail/index?pid=${pid}`
    })
  }

  render() {
    const {
      detailInfo: { description, name, imgUrl, subscribe, posts, questions, cid,leaf },
      parentCircles,
      childCircles,
      topPosts,
      isAttentioned,
      parentCirclesLength,
      childCirclesLength
    } = this.$store

    return (
      <View className='main-info-panel'>
        { /* 头像, 名称, 按钮 */}
        <View className='head'>
          <View className='avatar-wrapper'>
            {AvatarHelper.getAvatar(imgUrl, name)}
          </View>
          <View className='title'>{name}</View>
          <Button className='btn-share' openType='share'>
            <Image className='img-share' src={ShareIconUrl} />
          </Button>
          <View className={`btn-attention1${isAttentioned ? ' attentioned' : ''}`} onClick={this.doAttention}>
            {isAttentioned ? '已加入圈子' : '加入圈子'}
          </View>
        </View>
        { /* 简介 */}
        <View className='desc'>
          <View className='txt'>简介：{description || '-'}</View>
          {
            description &&
            <View className='btn' onClick={this.toDesc}>
              详情
              <Image src={DetailIconUrl} className='icon-right' />
            </View>
          }
        </View>
        {/* 各种数量 */}
        <View className='num-s'>
          <View>已加入:{subscribe}</View>
          <View>帖子:{posts}</View>
          <View>问答:{questions}</View>
        </View>
        {/* 圈子列表 */}
        {
          (!!parentCircles.length || !!parentCircles.length || !!childCircles.length) &&
          <View className='circle-list'>
            {
              parentCircles.slice(0, 1).map(circle => (
                <View className={['circle-item', parentCircles.length <= 1 && 'last-parent-one']} key={circle.cid} onClick={this.viewParentCircle.bind(this, circle.cid)}>
                   <View className='avatar-wrapper'>
                    {AvatarHelper.getAvatar(circle.imgUrl, circle.name, 'small')}
                  </View>
                  <View className='name'>{circle.name}</View>
                </View>
              ))
            }
            {
              parentCircles.length > 1 &&
              <View className='circle-item last-parent-one' onClick={this.viewMoreParentCircles.bind(this, cid)}>
                <View className='avatar'>{parentCirclesLength}</View>
                <View className='name'>父圈子</View>
              </View>
            }
            {
              childCircles.slice(0, 3).map(circle => (
                <View className='circle-item small-item' key={circle.cid} onClick={this.viewChildCircles.bind(this, circle.cid)}>
                  <View className='avatar-wrapper'>
                    {AvatarHelper.getAvatar(circle.imgUrl, circle.name, 'small')}
                  </View>
                  <View className='name'>{circle.name}</View>
                </View>
              ))
            }
            {
              childCircles.length > 3 &&
              <View className='circle-item small-item' onClick={this.viewMoreChildCircles.bind(this, cid)}>
                <View className='avatar'>{childCirclesLength}</View>
                <View className='name'>{!leaf?'子圈子':'相关圈子'}</View>
              </View>
            }
          </View>
        }

        {/* 公告列表 */}
        {
          topPosts.length ?
            <Swiper
              className='swiper-style'
              indicatorDots
              circular
              indicatorColor='#D8D8D8'
              indicatorActiveColor='#FF483B'
            >
              {
                topPosts.map((group, index) => {
                  return (
                    <SwiperItem key={index}>
                      {
                        group.map(post => {
                          return (
                            <View className='notice-item' key={post.pid}>
                              <View className='notice-logo'>置顶</View>
                              <View className='notice-txt'>{post.title}</View>
                              <View className='btn-detail' onClick={this.toDescById.bind(this, post.pid)}>详情</View>
                            </View>
                          )
                        })
                      }
                    </SwiperItem>
                  )
                })
              }
            </Swiper> :
            <View className='swiper-placeholder'></View>
        }
      </View>
    )
  }
}

export default MainInfoPanel