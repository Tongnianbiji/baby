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
    const { searchScope, currentTopTab, searchData, searchValue, circleResult, postResult, questionResult, userResult,circleEssenceResult,circlePostResult,circleQuestionResult,cid } = this.state;
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
                          { type: SearchResultType.POST, id: '34234' ,data:postResult},
                          { type: SearchResultType.ANSWER, id: '54334',data: questionResult},
                          { type: SearchResultType.CIRCLE, id: '12423' ,data:circleResult},
                          { type: SearchResultType.USER, id: '12523' ,data:userResult},
                        ].map(item => {
                          return (<SearchResultCard type={item.type} kw={searchValue} model={item.data} key={item.id} onMore={this.onMore} />)
                        })
                      }
                    </AtTabsPane>
                    <AtTabsPane index={1} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 1 && !!postResult.length &&
                        <View>
                          <TitleBarInCard onSortTabChange={this.sortTabChange.bind(this)}/>
                          {
                            postResult.map((item, n) => {
                              return (
                                <PostCard closeRelease model={item} kw={searchValue} key={n}>
                                </PostCard>
                              )
                            })
                          }
                        </View>
                      }
                    </AtTabsPane>
                    <AtTabsPane index={2} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 2 && !!questionResult.length &&
                        <View>
                          <TitleBarInCard title={'问答列表'} onSortTabChange={this.sortTabChange.bind(this)}/>
                          {
                             questionResult.map((item,n) => {
                              return (
                                <PostCard needShared closeRelease key={n} model={item} kw={searchValue} isAnwser>
                                </PostCard>
                              )
                            })
                          }
                        </View>
                      }
                    </AtTabsPane>
                    <AtTabsPane index={3} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 3 && !!circleResult.length &&
                        circleResult.map((item,n) => <CircleCard onHandleSubscr={this.handleSubsrc.bind(this)} kw={searchValue} data={item} key={n} />)
                      }
                      {
                        !!circleResult.length && <CreateCircle />
                      }
                    </AtTabsPane>
                    <AtTabsPane index={4} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 4 && !!userResult.length &&
                        userResult.map((item,n) => <UserInfoCard model={item} activeModel={item} key={n} kw={searchValue}/>)
                      }
                    </AtTabsPane>
                  </AtTabs> :
                  <DefaultPanel type={searchScope === 'all' ? 1 : 3} cid={cid ? cid : 0} onDoSearch={this.clickDosearch.bind(this)} />
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
                    {/* <AtTabsPane index={0} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 0 &&
                        [
                          { type: SearchResultType.ESSENCE, id: '12423',data:postResult },
                          { type: SearchResultType.POST, id: '34234',data:postResult },
                          { type: SearchResultType.ANSWER, id: '54334',data: questionResult },
                        ].map(item => {
                          return (<SearchResultCard type={item.type} kw={searchValue} model={item.data} key={item.id} onMore={this.onMore} />)
                        })
                      }
                    </AtTabsPane> */}
                    <AtTabsPane index={0} className='tabs-pane' current={currentTopTab}>
                    {
                      currentTopTab === 0 && !!circleEssenceResult.length &&
                      <View>
                        <TitleBarInCard title={'精华列表'} onSortTabChange={this.sortTabChange.bind(this)}/>
                        {
                          circleEssenceResult.map((item, n) => {
                            return (
                              <PostCard closeRelease model={item} kw={searchValue} key={n}>
                              </PostCard>
                            )
                          })
                        }
                      </View>
                    }
                    </AtTabsPane>
                    <AtTabsPane index={1} className='tabs-pane' current={currentTopTab}>
                    {
                      currentTopTab === 1 && !!circlePostResult.length &&
                      <View>
                        <TitleBarInCard onSortTabChange={this.sortTabChange.bind(this)}/>
                        {
                          circlePostResult.map((item, n) => {
                            return (
                              <PostCard closeRelease model={item} kw={searchValue} key={n}>
                              </PostCard>
                            )
                          })
                        }
                      </View>
                    }
                    </AtTabsPane>
                    <AtTabsPane index={2} className='tabs-pane' current={currentTopTab}>
                    {
                        currentTopTab === 2 && !!circleQuestionResult.length &&
                        <View>
                          <TitleBarInCard title={'问答列表'} onSortTabChange={this.sortTabChange.bind(this)}/>
                          {
                             circleQuestionResult.map((item,n) => {
                              return (
                                <PostCard needShared closeRelease key={n} model={item} kw={searchValue} isAnwser>
                                </PostCard>
                              )
                            })
                          }
                        </View>
                      }
                    </AtTabsPane>
                    {/* <AtTabsPane index={4} className='tabs-pane' current={currentTopTab}>
                      {
                        currentTopTab === 4 &&
                        [].map(n => <UserInfoCard key={n} />)
                      }
                    </AtTabsPane> */}
                  </AtTabs> :
                  <DefaultPanel type={searchScope === 'all' ? 1 : 3} cid={cid ? cid : 0}/>
              }
            </View>
            : null
        }



      </View>
    )
  }
}