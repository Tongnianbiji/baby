import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import BaseComponent from '@common/baseComponent'
import { View, ScrollView, Image, Text } from '@tarojs/components'
import Model from '../model'
import { ICONS } from '@common/constant'
import staticData from '@src/store/common/static-data'

import './attention-circle.scss'

const mockData = [
  {
    url: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/tn_logo.png',
    title: '全部圈子'
  },
  {
    url: '',
    title: '浏阳三村',
    actived: true
  },
  {
    url: '',
    title: '市光10村'
  },
  {
    url: '',
    title: '新城悠活城'
  },
  {
    url: '',
    title: '爱城家园'
  },
  {
    url: '',
    title: '恒大绿海'
  }
]

const tabsLv1 = [
  {
    title: '精华'
  },
  {
    title: '全部',
    actived: true
  },
  {
    title: '问答'
  },
  {
    title: '热门'
  }
]

const tabsLv2 = [
  {
    title: '最热',
    actived: true
  },
  {
    title: '最新发布',
    actived: false
  },
  {
    title: '最新回复'
  }
]

const tags = [
  { title: '全部', actived: true },
  { title: '生活' },
  { title: '灌水' },
  { title: '学校' },
  { title: '家庭' },
  { title: '医院' }
]

export default class AttentionCircle extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      current: 1,
      pageSize: 10,
      circleList:[]
    }
  }

  componentDidMount() {
    this.getDatas()
  }

  goToDetail = cid => {
    Taro.navigateTo({
      url: `/packageA/pages/circle-detail/index?cid=${cid}`
    })
  }

  goToMoreCircle = ()=>{
    const {updateFromHomeMoreStatus} = staticData;
    updateFromHomeMoreStatus(true);
    Taro.switchTab({
      url: `/pages/discover/index`
    })
  }

  getDatas =async ()=> {
    let res = await Model.getAttentionCircle({
      uid: this.getUserInfo().userId,
      pageNum: this.state.current,
      pageSize: this.state.pageSize
    })
    if(res && res.items && res.items.length){
      this.setState({
        circleList:res.items
      })
    }
  }

  render() {
    const {circleList} = this.state;
    return (
      <View>
        <ScrollView scrollX>
          <View className='community-wrapper'>
          <View className='community-entry' onClick={this.goToMoreCircle.bind(this)}>
            <View className='avatar'>
              <Image src={ICONS.ADD} className='avatar-img'></Image>
            </View>
            <Text className='title'>更多圈子</Text>
          </View>
            {
              circleList.map(item => {
                return (
                  <View key={item.cid} className='community-entry' onClick={this.goToDetail.bind(this, item.cid)}>
                    <View className='avatar'>
                      { item.imgUrl ? <Image src={item.imgUrl} className='avatar-img'></Image> : '' }
                    </View>
                    <Text className='title'>{item.name}</Text>
                    {/* { item.isSubscribe && <View className='arrow-up'></View> } */}
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
        {/* <View className='tabs-panel'>
            <View className='tn-ui-tabs'>
              {
                tabsLv1.map((t, index) => {
                  return (
                    <View key={index} className={`tabs-header-item${t.actived ? ' item-actived' : ''}`}>
                      {t.title}
                      {t.actived && <View className='active-underscore'></View>}
                    </View>
                  )
                })
              }
            </View>
            <View className='tn-ui-tabs-pane'>
              <View className='subject-pane'>
                <View className='subject-title'>话题列表</View>
                <View className='subject-tabs'>
                  <View className='tn-ui-tabs lv2-ui-tabs'>
                    {
                      tabsLv2.map((t, index) => {
                        return (
                          <View key={index} className={`tabs-header-item lv2-item ${t.actived ? ' item-actived' : ''}`}>
                            {t.title}
                            {t.actived && <View className='active-underscore'></View>}
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
              <ScrollView scrollX>
                <View className='tags-wrapper'>
                  {
                    tags.map((t, index) => {
                      return (
                        <View className={`tag-item${t.actived ? ' tag-actived' : ''}`} key={index}>{t.title}</View>
                      )
                    })
                  }
                </View>
              </ScrollView>
            </View>
        </View>
        <View>
          {
            [1,2,3,4,5].map(n => {
              return (
                <UserInfoItem key={n} needShared countryAble={false} />
              )
            })
          }
        </View> */}
      </View>
    )
  }
}