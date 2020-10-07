import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import SubjectTabs from '../subject-tabs'
import SliderTab from '../../../../common/components/ui-slider-tab'
import CustomCircle from '../custom-circle'
import { Provider } from 'mobx-react'
import './type-tabs.scss'
import { observer, inject } from 'mobx-react'
import ScrollViewList from '@components/scrollViewList'
import PostCard from '@common/components/post-card'
import UserCard from '@common/components/user-card'
import QACard from '../qa-card'

const TypeTabs = [
  { title: '精华' },
  { title: '帖子' },
  { title: '问答' },
  { title: '热榜' },
  { title: '用户' },
  { title: '定制圈子' }
]
let t = null;

@inject('circleDetailStore')
@observer
export default class TypeTabsView extends Component {
  static defaultProps = {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      touchStartTime: 0
    }
    this.circleDetailStore = this.props.circleDetailStore;
  }

  touchStart = (e) => {
    const { touchStartTime } = this.state;
    const that = this;
    const { postLock, listType } = this.circleDetailStore;
    if (!touchStartTime) {
      this.setState({
        touchStartTime: e.timeStamp
      })
      t = setTimeout(function timer() {
        that.setState({
          touchStartTime: 0
        })
      }, 500)
    } else {
      if (e.timeStamp - touchStartTime < 350) {
        this.circleDetailStore.resetTabListStatus(listType);
        this.circleDetailStore.updateIsFiexd(false);
        if (!this.isToBottom() && !postLock) {
          //this.typeTabPost()
        }
        Taro.vibrateShort().then(() => {
          console.log('双击震动')
          
        })
        this.setState({
          touchStartTime: 0
        })
        clearTimeout(t);
      }
    }
  }

  typeTabChange = index => {
    console.log('切换',index)
    this.circleDetailStore.updateListType(index);
    this.isTabCash(index) && this.typeTabPost()
  }

  //判断是否有缓存
  isTabCash(tab) {
    return this.circleDetailStore.isTabCash(tab)
  }

  //判断是否到底
  isToBottom() {
    return this.circleDetailStore.isToBottom()
  }

  //切换tab请求不同tab接口
  typeTabPost() {
    this.circleDetailStore.typeTabPost();
  }

  onScrollToLower() {
    const { postLock ,listType} = this.circleDetailStore;
    this.circleDetailStore.updateTabPageNum(listType);
    if (!this.isToBottom() && !postLock) {
      this.typeTabPost()
    }
  }

  //切换子tag
  onSubTabChange() {
    const { postLock, listType } = this.circleDetailStore;
    this.circleDetailStore.resetTabListStatus(listType);
    if (!this.isToBottom()&&!postLock) {
      this.typeTabPost()
    }
  }

  render() {
    const { circlePosts, circleEssence, circleQuestion,circleUser, listType, fixed, centerHeight, loadingPosts, loadingEssence, loadingQuestion, loadingUser, isToBottomPosts, isToBottomEssence, isToBottomQuestion, isToBottomUser} = this.circleDetailStore;
    return (
      <View className='type-tabs-view' onTouchStart={this.touchStart}>
        <AtTabs animated={false} className='tabs' tabList={TypeTabs} current={listType} onClick={this.typeTabChange}>
          <AtTabsPane index={0} current={listType}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChange.bind(this)} />
            <ScrollViewList onScrollToLower={this.onScrollToLower.bind(this)} fixed={fixed} centerHeight={centerHeight} showLoading={loadingEssence} isToBottom={isToBottomEssence}>
              {
                circleEssence.map((item, num) => {
                  return (
                    <PostCard key={num} countryAble={false} model={item} closeRelease needShared  />
                  )
                })
              }
            </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={1} current={listType}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChange.bind(this)}/>
            <ScrollViewList onScrollToLower={this.onScrollToLower.bind(this)} fixed={fixed} centerHeight={centerHeight} showLoading={loadingPosts} isToBottom={isToBottomPosts}>
            {
              circlePosts.map((item, num) => {
                return (
                  <PostCard key={num} countryAble={false} model={item} closeRelease needShared  />
                )
              })
            }
            </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={2} current={listType}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChange.bind(this)}/>
            <ScrollViewList onScrollToLower={this.onScrollToLower.bind(this)} fixed={fixed} centerHeight={centerHeight} showLoading={loadingQuestion} isToBottom={isToBottomQuestion}>
            {
              circleQuestion.map((item, num) => {
                return (
                  <QACard model={item} key={num}/>
                )
              })
            }
            </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={3} current={listType}>
            <View className='slider-tab-wrapper'>
              <SliderTab tabList={[{ title: '24小时' }, { title: '近7天' }]} />
            </View>
            <ScrollViewList fixed={fixed} centerHeight={centerHeight}>
            {
              circlePosts.map((item, num) => {
                return (
                  <PostCard sortNum={num + 1} showOrder={listType === 3} key={num} countryAble={false} model={item} closeRelease needShared  />
                )
              })
              }
              </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={4} current={listType}>
            <View className='slider-tab-wrapper'>
              <SliderTab tabList={[{ title: '活跃度' }, { title: '距离' }]} />
            </View>
            <ScrollViewList onScrollToLower={this.onScrollToLower.bind(this)} fixed={fixed} centerHeight={centerHeight} showLoading={loadingUser} isToBottom={isToBottomUser}>
            {
              circleUser.map((item, num) => {
                return (
                  <UserCard model={item} key={num} />
                )
              })
              }
              </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={5} current={listType}>
            <CustomCircle />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}