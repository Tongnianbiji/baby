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
import Preloading from '@components/preloading'
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

let exposureIdList = new Set();

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
      doubleClickLock: false,
      tabId: 140200,
      hotTabType: 1,
      userTabType: 1,
      isShowDistance: false,
      isTouchTab:false
    }
    this.circleDetailStore = this.props.circleDetailStore;
    this.exposuredList = new Set();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   this.props.circleDetailStore.circleQuestion.forEach(item => {
  //     if (!this.exposuredList.has(item.qid)) {
  //       this.exposuredList.add(item.qid)
  //       Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.qid}`, (res) => { 
  //         console.log('进入视图------')
  //         getApp().sensors.track('exposure', {
  //           contentIdList: [item.qid],
  //           contentType: 3,
  //           eventType: 1
  //         });
  //       })
  //     }
  //   })
  // }
  async componentDidMount() {
    const { tabId } = this.state;
    getApp().sensors.registerApp({
      tabId: tabId
    })
    setTimeout(() => {
      let { circlePosts } = this.circleDetailStore;
      console.log(circlePosts)
      for (let i = 0; i < circlePosts.length; i++) {
        let item = circlePosts[i];
        if (!exposureIdList.has(item.pid)) {
          exposureIdList.add(item.pid);
          Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.pid}`, (res) => {
            if (res.intersectionRatio > 0) {
              let contentIdList = [];
              console.log(`进入页面${item.pid}`)
              if (item.pid) {
                let entityId = item.pid;
                contentIdList.push(entityId.toString())
                getApp().sensors.track('exposure', {
                  contentIdList: contentIdList,
                  contentType: 1,
                  eventType:1
                });
              }
            }
          })
        }
      }
    }, 800);
  }

  touchStart = (e) => {
    console.log('开始')
    const { touchStartTime} = this.state;
    const that = this;
    const { postLock, listType } = this.circleDetailStore;
    if (!touchStartTime) {
      this.setState({
        touchStartTime: e.timeStamp,
        isTouchTab: false
      })
      t = setTimeout(function timer() {
        that.setState({
          touchStartTime: 0
        })
      }, 500)
    } else {
      if (e.timeStamp - touchStartTime < 350) {
        const { isTouchTab} = this.state;
        console.log(isTouchTab)
        if(isTouchTab){
          this.setState({
            doubleClickLock: true
          }, async () => {
            this.circleDetailStore.resetTabListStatus(listType);
            this.circleDetailStore.updateIsFiexd(false);
            if (!postLock) {
              await this.typeTabPost();
            }
          })
          Taro.vibrateShort().then(() => {
            console.log('双击震动')
          })
          that.setState({
            isTouchTab: false
          })
        }
        this.setState({
          touchStartTime: 0
        })
        clearTimeout(t);
      }
    }
  }

  typeTabChange = index => {
    console.log('点击')
    let tabId = null;
    const { doubleClickLock, hotTabType, userTabType } = this.state;
    exposureIdList.clear();
    this.circleDetailStore.updateListType(index);
    setTimeout(() => {
      this.exposure();
    }, 500);
    !this.isTabCash(index) && !doubleClickLock && this.typeTabPost();
    this.setState({
      doubleClickLock: false,
      isTouchTab:true
    })
    switch (index) {
      case 0:
        tabId = 140100;
        break;
      case 1:
        tabId = 140200;
        break;
      case 2:
        tabId = 140300;
        break;
      case 3:
        if (hotTabType === 1) {
          tabId = 140401;
        }
        else if (hotTabType === 2) {
          tabId = 140402;
        }
        break;
      case 4:
        if (userTabType === 1) {
          tabId = 140501;
        }
        else if (userTabType === 2) {
          tabId = 140502;
        }
        break;
    }
    getApp().sensors.registerApp({
      tabId: tabId,
      eventType: 2
    })
  }

  //热榜切换
  hotTabChange = type => {
    const { cid } = this.circleDetailStore;
    let tabId = null;
    if (type === 0) {
      tabId = 140401;
      this.setState({
        tabId: 140401,
        hotTabType: type + 1
      })
    }
    else if (type === 1) {
      tabId = 140402;
      this.setState({
        tabId: 140402,
        hotTabType: type + 1
      })
    }
    this.circleDetailStore.getCircleHots(cid,type + 1)
    getApp().sensors.registerApp({
      tabId: tabId,
      eventType: 2
    })
  }

  //用户切换
  userTabChange = type => {
    let tabId = null;
    if (type === 0) {
      tabId = 140501;
      this.setState({
        tabId: 140501,
        userTabType: type + 1,
        isShowDistance: false
      })
    }
    else if (type === 1) {
      tabId = 140502;
      this.setState({
        tabId: 140502,
        userTabType: type + 1,
        isShowDistance: true
      })
    }
    getApp().sensors.registerApp({
      tabId: tabId,
      eventType: 2
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
    // const { postLock, listType } = this.circleDetailStore;
    // this.circleDetailStore.updateTabPageNum(listType);
    // if (!this.isToBottom() && !postLock) {
    //   this.typeTabPost()
    // }
  }

  //切换顶部tag
  onTabChange() {
    const { postLock, listType } = this.circleDetailStore;
    this.circleDetailStore.resetTabListStatus(listType);
    if (!this.isToBottom() && !postLock) {
      this.typeTabPost()
    }
  }

  //切换子tag
  onSubTabChange() {
    const { postLock, listType } = this.circleDetailStore;
    this.circleDetailStore.resetTabListStatus(listType);
    if (!this.isToBottom() && !postLock) {
      this.typeTabPost()
    }
  }

  //到顶取消冻结
  onScrollToUpper = () => {
    //this.circleDetailStore.updateIsFiexd(false);
  }

  //点击帖子详情
  handlePostDetail(pid, e) {
    e.stopPropagation();

    Taro.navigateTo({
      url: '/packageB/pages/post-detail/index?pid=' + pid
    })
  }


  //帖子收藏与取消收藏
  handleFavorite = (model) => {
    this.circleDetailStore.updateCirclePostsByFavorite(model.pid)
  }

  //问答的收藏与取消
  handleFavoriteQuestion = (model) => {
    this.circleDetailStore.updateCircleQuestionsByFavorite(model.qid)
  }

  //热版的收藏与取消
  handleFavoriteHots = (model) => {
    this.circleDetailStore.updateCircleHotsByFavorite(model.pid)
  }

  //用户关注与取消
  handleSubScr = (model)=>{
    this.circleDetailStore.updateCircleUserSubsrc(model)
  }

  //滚动曝光埋点
  onScroll = () => {
    //this.exposure()
  }

  //曝光埋点
  exposure = () => {
    let { circlePosts, circleEssence, circleQuestion,circleHots,listType } = this.circleDetailStore;
    switch (listType) {
      case 0:
        for (let i = 0; i < circleEssence.length; i++) {
          let item = circleEssence[i];
          if (!exposureIdList.has(item.pid)) {
            exposureIdList.add(item.pid);
            Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.pid}`, (res) => {
              if (res.intersectionRatio > 0) {
                let contentIdList = [];
                console.log(`进入页面${item.pid}`)
                if (item.pid) {
                  let entityId = item.pid;
                  contentIdList.push(entityId.toString())
                  getApp().sensors.track('exposure', {
                    contentIdList: contentIdList,
                    contentType: 1
                  });
                }
              }
            })
          }
        }
        break;
      case 1:
        for (let i = 0; i < circlePosts.length; i++) {
          let item = circlePosts[i];
          if (!exposureIdList.has(item.pid)) {
            exposureIdList.add(item.pid);
            Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.pid}`, (res) => {
              if (res.intersectionRatio > 0) {
                let contentIdList = [];
                console.log(`进入页面${item.pid}`)
                if (item.pid) {
                  let entityId = item.pid;
                  contentIdList.push(entityId.toString())
                  getApp().sensors.track('exposure', {
                    contentIdList: contentIdList,
                    contentType: 1
                  });
                }
              }
            })
          }
        }
        break;
      case 2:
        for (let i = 0; i < circleQuestion.length; i++) {
          let item = circleQuestion[i];
          if (!exposureIdList.has(item.qid)) {
            exposureIdList.add(item.qid);
            Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.qid}`, (res) => {
              if (res.intersectionRatio > 0) {
                let contentIdList = [];
                console.log(`进入页面${item.qid}`)
                if (item.qid) {
                  let entityId = item.qid;
                  contentIdList.push(entityId.toString())
                  getApp().sensors.track('exposure', {
                    contentIdList: contentIdList,
                    contentType: 1
                  });
                }
              }
            })
          }
        }
        break;
        case 3:
          for (let i = 0; i < circleHots.length; i++) {
            let item = circleHots[i];
            if (!exposureIdList.has(item.pid)) {
              exposureIdList.add(item.pid);
              Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.pid}`, (res) => {
                if (res.intersectionRatio > 0) {
                  let contentIdList = [];
                  console.log(`进入页面${item.pid}`)
                  if (item.pid) {
                    let entityId = item.pid;
                    contentIdList.push(entityId.toString())
                    getApp().sensors.track('exposure', {
                      contentIdList: contentIdList,
                      contentType: 1
                    });
                  }
                }
              })
            }
          }
          break;
    }
    getApp().sensors.track('exposure', {
      eventType:1
    });
  }

  render() {
    const { circlePosts, circleEssence, circleQuestion,circleHots, circleUser, listType, fixed, centerHeight, loadingPosts, loadingEssence, loadingQuestion, loadingUser, isToBottomPosts, isToBottomEssence, isToBottomQuestion, isToBottomUser, isCustomCircle } = this.circleDetailStore;
    const { isShowDistance } = this.state;
    let newTypeTabs = isCustomCircle ? TypeTabs : TypeTabs.slice(0, 5)
    return (
      <View className='type-tabs-view' onTouchStart={this.touchStart.bind(this)}>
        <AtTabs swipeable={false} animated={false} className='tabs' tabList={newTypeTabs} current={listType} onClick={this.typeTabChange}>
          <AtTabsPane index={0} current={listType}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChange.bind(this)} onTabChangeGetData={this.onTabChange.bind(this)} />
            <ScrollViewList onScrollToUpper={this.onScrollToUpper.bind(this)} onScrollToLower={this.onScrollToLower.bind(this)} fixed={fixed} centerHeight={centerHeight} showLoading={loadingEssence} isToBottom={isToBottomEssence}>
              {
                circleEssence.map((item, num) => {
                  return (
                    <View className={`target-item-${item.pid}`}>
                      <PostCard key={num} countryAble={false} model={item} closeRelease needShared onCardClick={this.handlePostDetail.bind(this, item.pid)} onHandleFavorite={this.handleFavorite.bind(this)} />
                    </View>
                  )
                })
              }
            </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={1} current={listType}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChange.bind(this)} onTabChangeGetData={this.onTabChange.bind(this)} />
            <View className='list-wrapper'>
              {
                circlePosts.map((item, num) => {
                  return (
                    <View className={`target-item-${item.pid}`}>
                      <PostCard key={item.pid} countryAble={false} model={item} closeRelease needShared onCardClick={this.handlePostDetail.bind(this, item.pid)} onHandleFavorite={this.handleFavorite.bind(this)} />
                    </View>
                  )
                })
              }
              <Preloading showLoading={loadingPosts} isToBottom={isToBottomPosts}></Preloading>
            </View>
          </AtTabsPane>
          <AtTabsPane index={2} current={listType}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChange.bind(this)} onTabChangeGetData={this.onTabChange.bind(this)} />
            <View className='list-wrapper'>
              {
                circleQuestion.map((item, num) => {
                  return (
                    <View className={`target-item-${item.qid}`}>
                      <QACard model={item} key={num} onHandleFavorite={this.handleFavoriteQuestion.bind(this)} />
                    </View>
                  )
                })
              }
              <Preloading showLoading={loadingQuestion} isToBottom={isToBottomQuestion}></Preloading>
            </View>
          </AtTabsPane>
          <AtTabsPane index={3} current={listType}>
            <View className='slider-tab-wrapper'>
              <SliderTab tabList={[{ title: '24小时' }, { title: '近7天' }]} onChange={this.hotTabChange.bind(this)} />
            </View>
            <ScrollViewList fixed={fixed} centerHeight={centerHeight} showLoading={false} isToBottom>
              {
                circleHots.map((item, num) => {
                  return (
                    <View className={`target-item-${item.pid}`}>
                      <PostCard key={item.pid} countryAble={false} sortNum={num + 1} model={item} showOrder closeRelease needShared onCardClick={this.handlePostDetail.bind(this, item.pid)} onHandleFavorite={this.handleFavoriteHots.bind(this)} />
                    </View>                  )
                })
              }
            </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={4} current={listType}>
            <View className='slider-tab-wrapper'>
              <SliderTab tabList={[{ title: '活跃度' }, { title: '距离' }]} onChange={this.userTabChange.bind(this)} />
            </View>
            <ScrollViewList onScrollToLower={this.onScrollToLower.bind(this)} fixed={fixed} centerHeight={centerHeight} showLoading={loadingUser} isToBottom={isToBottomUser}>
              {
                circleUser.map((item, num) => {
                  return (
                    <UserCard model={item} key={num} isShowDistance={isShowDistance} onSubscr={this.handleSubScr.bind(this)}/>
                  )
                })
              }
            </ScrollViewList>
          </AtTabsPane>
          <AtTabsPane index={5} current={listType}>
            <CustomCircle />
          </AtTabsPane>
        </AtTabs>
        {
          listType === 5 && 
          <View className="remind">打开圈子定制后，圈字中将仅可见与指定区域、年龄段相同宝宝家长发布的内容</View>
        }
      </View>
    )
  }
}