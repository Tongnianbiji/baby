import React from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtInput, AtForm } from 'taro-ui'
import Presenter from './presenter'
import { ICONS } from '../../../common/constant'
import { SearchResultType } from '../../../common/enums'
import DefaultPanel from './default-panel'
import SearchResultCard from './result-group-card'
import CircleCard from '../../../common/components/circle-card'
import TitleBarInCard from './title-bar-in-card'
import PostCard from '../../../common/components/post-card'
import CreateCircle from './no-data-card'
import UserInfoCard from '../../../common/components/user-card'
import './styles.scss'

export default class HomeSearchView extends Presenter {

  render() {
    const { searchScope, currentTopTab, searchData, searchValue, circleResult, postResult, questionResult, userResult  } = this.state;
    return (
      <View className={`home-search-viewport${searchData ? ' graybg' : ''}`}>
        <View className='search-box'>
          <View className='inp-wrapper'>
            <Input className='inp' placeholder='请输入关键字' value={searchValue} onInput={this.handleChange.bind(this)} placeholderClass='placehoder' confirmType='search' onConfirm={this.doSearch.bind(this)} />
            <Image src={ICONS.SEARCH} className='search-icon' />
          </View>
          <View className='cancel-btn' onClick={this.cancelSearch}>取消</View>
        </View>
        {
          searchScope === 'all' ?
            <View>
              {
                searchValue ?
                  <AtTabs tabList={this.state.tabList} className='tabs' current={currentTopTab} swipeable={false} onClick={this.topTabChange.bind(this)}>
                    <AtTabsPane index={0} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 0 &&
                        [
                          { type: SearchResultType.POST, id: '34234' },
                          { type: SearchResultType.ANSWER, id: '54334' },
                          { type: SearchResultType.CIRCLE, id: '12423' },
                        ].map(item => {
                          return (<SearchResultCard type={item.type} key={item.id} onMore={this.onMore} />)
                        })
                      }
                    </AtTabsPane>
                    <AtTabsPane index={1} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 1 && !!postResult.length &&
                        postResult.map((item, n) => {
                          return (
                            <PostCard closeRelease model={item} key={n}>
                              {
                                n === 1 ? <TitleBarInCard /> : null
                              }
                            </PostCard>
                          )
                        })
                      }
                      {/* <CreateCircle /> */}
                    </AtTabsPane>
                    <AtTabsPane index={2} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 2 && !!questionResult.length &&
                        questionResult.map(n => {
                          return (
                            <PostCard needShared closeRelease key={n} isAnwser>
                              {
                                n === 1 ? <TitleBarInCard title='问答列表' /> : null
                              }
                            </PostCard>
                          )
                        })
                      }
                      {/* <CreateCircle /> */}
                    </AtTabsPane>
                    <AtTabsPane index={3} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 3 && !!circleResult.length &&
                        circleResult.map((item,n) => <CircleCard onHandleSubscr={this.handleSubsrc.bind(this)} data={item} key={n} />)
                      }
                      <CreateCircle />
                    </AtTabsPane>
                    <AtTabsPane index={4} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 4 && !!userResult.length &&
                        userResult.map(n => <UserInfoCard key={n} />)
                      }
                    </AtTabsPane>
                  </AtTabs> :
                  <DefaultPanel />
              }
            </View>
            : null
        }

        {
          searchScope === 'circle' ?
            <View>
              {
                searchValue ?
                  <AtTabs tabList={this.state.tabList} className='tabs' current={currentTopTab} swipeable={false} onClick={this.topTabChange.bind(this)}>
                    <AtTabsPane index={0} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 0 &&
                        [
                          { type: SearchResultType.ESSENCE, id: '12423' },
                          { type: SearchResultType.POST, id: '34234' },
                          { type: SearchResultType.ANSWER, id: '54334' },
                        ].map(item => {
                          return (<SearchResultCard type={item.type} key={item.id} onMore={this.onMore} />)
                        })
                      }
                    </AtTabsPane>
                    <AtTabsPane index={1} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 1 &&
                        postResult.map((item, n) => {
                          return (
                            <PostCard closeRelease model={item} key={n}>
                              {
                                n === 1 ? <TitleBarInCard /> : null
                              }
                            </PostCard>
                          )
                        })
                      }
                      {/* <CreateCircle /> */}
                    </AtTabsPane>
                    <AtTabsPane index={2} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 2 &&
                        postResult.map(n => {
                          return (
                            <PostCard needShared closeRelease key={n} isAnwser>
                              {
                                n === 1 ? <TitleBarInCard title='问答列表' /> : null
                              }
                            </PostCard>
                          )
                        })
                      }
                      {/* <CreateCircle /> */}
                    </AtTabsPane>
                    <AtTabsPane index={3} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 3 &&
                        questionResult.map(n => <CircleCard key={n} />)
                      }
                      {/* <CreateCircle /> */}
                    </AtTabsPane>
                    <AtTabsPane index={4} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 4 &&
                        [1, 2, 3, 4, 5, 6].map(n => <UserInfoCard key={n} />)
                      }
                    </AtTabsPane>
                  </AtTabs> :
                  <DefaultPanel />
              }
            </View>
            : null
        }



      </View>
    )
  }
}