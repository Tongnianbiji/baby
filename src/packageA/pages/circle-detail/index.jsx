import React from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Presenter from './presenter'
import MainInfoPanel from './main-info-panel'
import TypeTabs from './type-tabs'
import PostCard from '../../../common/components/post-card'
import UserCard from '../../../common/components/user-card'
import Preloading from '@components/preloading'
import QACard from './qa-card'
import './styles.scss'

const ICON_ADD = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/circle-add.png'
const ICON_FRESH = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/refresh.png'
const ICON_CLOSE = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-b.png'
const ICON_POST = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/posts.png'
const ICON_QA = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/question.png'

@inject('circleDetailStore')
@observer
class CircleDetailView extends Presenter {
  
  config = {
    navigationBarTitleText: '圈子'
  }


  constructor(props) {
    super(props)
    
  }

  loadingRender() {
    return (
      <View></View>
    )
  }

  noDataRender() {
    return (
      <View className='no-data-view'>暂无该圈子信息</View>
    )
  }


  render() {
    const { centerHeight, listType, showOpPanel, cid, fixed,isFresh } = this.state
    const { loading, noData, circlePosts, isToBottom } = this.$store
    const scrollStyle = {
      height: centerHeight
    }
    const scrollTop = 0
    const Threshold = 20

    return loading ? this.loadingRender() : noData ? this.noDataRender() : (
      <View className={[fixed ? 'fix-tab' : 'circle-detail-viewport']}>
        <MainInfoPanel cid={getCurrentInstance().router.params.cid} />
        <View>
          <TypeTabs onTypeChange={this.typeChange} key='123' onSubTabChangeGetData={this.getSubTabList.bind(this)} onDoubleClickTab={this.freshList.bind(this)} />
          <ScrollView
            scrollY
            scrollWithAnimation
            onScrollToLower={this.onScrollToLower}
            className="card-wrapper"
            style={fixed ? scrollStyle : null}
          >
            {
              circlePosts.map((item, num) => {
                return [0, 1, 3].includes(listType) ?
                  <PostCard showOrder={listType === 3} key={num} countryAble={false} model={item} closeRelease needShared cardClick={this.handlePostDetail.bind(this,item.pid)} onHandleFavorite={this.onHandleFavorite.bind(this,item)} /> :
                  listType === 2 ? <QACard /> :
                    listType === 4 ? <UserCard /> : null
              })
            }
            <Preloading showLoading={!isToBottom} isToBottom={isToBottom}></Preloading>
          </ScrollView>

          
        </View>
        <View className='fixed-btns'>
          <Image className='btn' src={ICON_ADD} onClick={this.troggleOpPanel} />
          <Image className='btn' src={ICON_FRESH} onClick={this.freshList} />
        </View>
        {
          showOpPanel &&
          <View className='operator-panel'>
            <View className='add-btns'>
              <View className='btn-item' onClick={this.toCreatePost}>
                <Image src={ICON_POST} alt='' className='icon' />
                <View className='txt'>我想发贴</View>
              </View>
              <View className='btn-item' onClick={this.toCreateIssue}>
                <Image src={ICON_QA} alt='' className='icon' />
                <View className='txt'>我想提问</View>
              </View>
            </View>
            <View className='close-btn'>
              <Image className='close-btn-icon' src={ICON_CLOSE} alt='' onClick={this.troggleOpPanel} />
            </View>
          </View>
        }
      </View>
    )
  }
}

export default CircleDetailView
