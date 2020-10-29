import React, { Component } from 'react'
import Taro, { switchTab } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import SubjectTabs from '../subject-tabs'
import SliderTab from '../../../../common/components/ui-slider-tab'
import CustomCircle from '../custom-circle'
import { Provider } from 'mobx-react'
import { observer, inject } from 'mobx-react'
import ScrollViewList from '@common/components/scrollViewList'
import PostCard from '@common/components/post-card'
import UserCard from '@common/components/user-card'
import QACard from '../qa-card'
import './type-tabs.scss'

let TypeTabs = [
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
      touchStartTime: 0,
      doubleClickLock:false,
      tabId:140200,
      hotTabType:1,
      userTabType:1
    }
    this.circleDetailStore = this.props.circleDetailStore;
  }

  componentDidMount(){
    const {tabId} = this.state;
    getApp().sensors.registerApp({
      tabId:tabId
    })
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
        this.setState({
          doubleClickLock:true
        },async ()=>{
          this.circleDetailStore.resetTabListStatus(listType);
          this.circleDetailStore.updateIsFiexd(false);
          if (!postLock) {
            await this.typeTabPost();
          }
        })
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
    let tabId = null;
    const { doubleClickLock, hotTabType ,userTabType} = this.state;
    this.circleDetailStore.updateListType(index);
    !this.isTabCash(index) && !doubleClickLock && this.typeTabPost();
    this.setState({
      doubleClickLock:false
    })
    switch(index){
      case 0:
        tabId=140100;
        break;
      case 1:
        tabId=140200;
        break;
      case 2:
        tabId=140300;
        break;
      case 3:
        if(hotTabType ===1){
          tabId=140401;
        }
        else if(hotTabType ===2){
          tabId=140402;
        }
        break;
      case 4:
        if(userTabType ===1){
          tabId=140501;
        }
        else if(userTabType ===2){
          tabId=140502;
        }
        break;
    }
    getApp().sensors.registerApp({
      tabId:tabId,
      eventType:2
    })
  }

  //热榜切换
  hotTabChange = type=>{
    let tabId = null;
    if(type ===0){
      tabId=140401;
      this.setState({
        tabId:140401,
        hotTabType:type+1
      })
    }
    else if(type ===1){
      tabId=140402;
      this.setState({
        tabId:140402,
        hotTabType:type+1
      })
    }
    getApp().sensors.registerApp({
      tabId:tabId,
      eventType:2
    })
  }

   //用户切换
   userTabChange = type=>{
    let tabId = null;
    if(type ===0){
      tabId=140501;
      this.setState({
        tabId:140501,
        userTabType:type+1
      })
    }
    else if(type ===1){
      tabId=140502;
      this.setState({
        tabId:140502,
        userTabType:type+1
      })
    }
    getApp().sensors.registerApp({
      tabId:tabId,
      eventType:2
    })
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

  //到顶取消冻结
  onScrollToUpper=()=>{
    this.circleDetailStore.updateIsFiexd(false);
  }

   //点击帖子详情
   handlePostDetail(pid) {
    console.log('查看帖子详情')
    Taro.navigateTo({
      url:'/packageB/pages/post-detail/index?pid='+pid
    })
  }


  //帖子收藏与取消收藏
  handleFavorite= (model)=>{
    this.circleDetailStore.updateCirclePostsByFavorite(model.pid)
  }

  render() {
    const { circlePosts, circleEssence, circleQuestion,circleUser, listType, fixed, centerHeight, loadingPosts, loadingEssence, loadingQuestion, loadingUser, isToBottomPosts, isToBottomEssence, isToBottomQuestion, isToBottomUser,isCustomCircle} = this.circleDetailStore;
    let newTypeTabs = isCustomCircle ? TypeTabs : TypeTabs.slice(0,5)
    return (
      <View className='type-tabs-view' onTouchStart={this.touchStart.bind(this)}>
        <AtTabs animated={false} className='tabs' tabList={newTypeTabs} current={listType} onClick={this.typeTabChange}>
          <AtTabsPane index={0} current={listType}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChange.bind(this)} />
            <ScrollViewList onScrollToUpper={this.onScrollToUpper.bind(this)} onScrollToLower={this.onScrollToLower.bind(this)} fixed={fixed} centerHeight={centerHeight} showLoading={loadingEssence} isToBottom={isToBottomEssence}>
              {
                circleEssence.map((item, num) => {
                  return (
                    <PostCard key={num} countryAble={false} model={item} closeRelease needShared onCardClick={this.handlePostDetail.bind(this,item.pid)} onHandleFavorite={this.handleFavorite.bind(this)} />
                  )
                })
              }
            </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={1} current={listType}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChange.bind(this)}/>
            <ScrollViewList onScrollToUpper={this.onScrollToUpper.bind(this)} onScrollToLower={this.onScrollToLower.bind(this)} fixed={fixed} centerHeight={centerHeight} showLoading={loadingPosts} isToBottom={isToBottomPosts}>
            {
              circlePosts.map((item, num) => {
                return (
                  <PostCard key={num} countryAble={false} model={item} closeRelease needShared onCardClick={this.handlePostDetail.bind(this,item.pid)} onHandleFavorite={this.handleFavorite.bind(this)}/>
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
              <SliderTab tabList={[{ title: '24小时' }, { title: '近7天' }]}  onChange={this.hotTabChange.bind(this)}/>
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
              <SliderTab tabList={[{ title: '活跃度' }, { title: '距离' }]} onChange={this.userTabChange.bind(this)}/>
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