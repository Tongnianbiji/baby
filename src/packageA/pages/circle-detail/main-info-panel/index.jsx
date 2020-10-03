import React, { Component } from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { observer, inject } from 'mobx-react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import DTO from '../../../../common/localStorage'

import './styles.scss'

const dto = DTO.getInstance()

const ShareIconUrl = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/share-c.png'
const DetailIconUrl = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/expand.png'

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
    if (this.$store.isAttentioned) {
      this.$store.leaveCircle(cid).then(ok => {
        console.log(ok, 'leave');
      })
    } else {
      this.$store.joinCircle(cid).then(ok => {
        console.log(ok, 'join');
      })
    }
  }

  //查看更多父圈子
  viewMoreParentCircles() {
    Taro.navigateTo({ url: '/packageA/pages/more-circle/index' })
  }

  render() {
    const {
      detailInfo: {description, name, imgUrl, subscribe, posts, questions },
      parentCircles,
      childCircles,
      topPosts,
      isAttentioned
    } = this.$store
    
    return (
      <View className='main-info-panel'>
        { /* 头像, 名称, 按钮 */}
        <View className='head'>
          <View className='avatar-wrapper'>
            {
              imgUrl && <Image src={imgUrl} className='avatar-img' />
            }
          </View>
          <View className='title'>{name}</View>
          <View className='btn-share'>
            <Image className='img-share' src={ShareIconUrl} />
          </View>
          <View className={`btn-attention${isAttentioned ? ' attentioned' : ''}`} onClick={this.doAttention}>
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
        <View className='circle-list'>
          {
            parentCircles.map(circle => (
              <View className='circle-item' key={circle.cid}>
                <View className='avatar'>{circle.imgUrl && <Image src={circle.imgUrl} className='avatar-img' />}</View>
                <View className='name'>{circle.name}</View>
              </View>
            ))
          }
          {
            parentCircles.length > 0 &&
            <View className='circle-item last-parent-one' onClick={this.viewMoreParentCircles}>
              <View className='avatar'>{parentCircles.length}</View>
              <View className='name'>父圈子</View>
            </View>
          }
          {
            childCircles.map(circle => (
              <View className='circle-item small-item' key={circle.cid}>
                <View className='avatar'>{circle.imgUrl && <Image src={circle.imgUrl} className='avatar-img' />}</View>
                <View className='name'>{circle.name}</View>
              </View>
            ))
          }
          {
            childCircles.length > 3 &&
            <View className='circle-item small-item'>
              <View className='avatar'>{childCircles.length}</View>
              <View className='name'>子圈子</View>
            </View>
          }
        </View>
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
                              <View className='btn-detail'>详情</View>
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