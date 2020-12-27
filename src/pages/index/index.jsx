import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtBadge, AtTabs, AtTabsPane } from 'taro-ui'
import HomePage from './presenter'
import { observer, inject } from 'mobx-react'
import BehaviorCard from '@components/behavior-card'
import UserInfoItem from '../../common/components/post-card'
import SliderTab from '@components/ui-slider-tab'
import AttentionCircle from './components/attention-circle'
import iconSearch from '../../assets/img/icon-search.png'
import arrowDown from '../../assets/img/arrow-down.png'
import iconRing from '../../assets/img/icon-ring.png'
import Preloading from '@components/preloading'
import {ICONS} from '@common/constant'

import './index.scss'

@inject('staticDataStore')
@observer
export default class Index extends HomePage {
  render() {
    const { pageState, topTabs, currentTopTab, attentionType, hotTabType,currentCity,attentionUsers,isPullDownRefresh, showAttentionLoading, isAttentionToBottom,isCollentMini,showNewInfoBar,total,recommends,showRecommendLoading,isRecommendToBottom,hots,recommendsLength} = this.state;
    const { isGuide } = this.props.staticDataStore;
    if (pageState == 'loading') {
      return this.renderLoading();
    }
 
    return (
      <View className='home-page-viewport'>
        {!!showNewInfoBar &&
        <View className="new-info-bar" style={{ opacity: String(Number(showNewInfoBar)) }}>
          <Text>童年为你推荐了{recommendsLength}条新内容</Text>
        </View>
        }
        <View className='search-bar'>
          <View className='location-info' onClick={this.selectCity}>
            <Text className="location-info-text">{currentCity}</Text>
            <Image src={arrowDown} className='icon-arrow-down'></Image>
          </View>
          <View className='search-info'>
            <View className='search-inp' onClick={this.goSearch}>
              <Image src={iconSearch} className='icon-search'></Image>
              <Text>搜索</Text>
            </View>
          </View>
          <View className='notice-info' onLongPress={this.onLongPressForDebug.bind(this)} onClick={this.goMessage.bind(this)}>
            <AtBadge value={total?total : ''}>
              <Image src={iconRing} className='icon-ring'></Image>
            </AtBadge>
          </View>
        </View>
        <View className='tabs-container'>
          <AtTabs className='tabs' tabList={topTabs} current={currentTopTab} swipeable={false} onClick={this.topTabChange}>
            <AtTabsPane current={currentTopTab} index={0} className='attention-tabs-pane'>
              <View className='slider-tab-wrapper'>
                <SliderTab tabList={[{ title: '关注的用户' }, { title: '关注的圈子' }]} onChange={this.attentionTabChange.bind(this)} />
              </View>
              <View className='user-item-wrapper'>
                {
                  attentionType === 1 ?
                    <View>
                        {
                          attentionUsers.map((item,key) => {
                            return (
                              <View className={`target-item-${item.activityId}`}>
                                <BehaviorCard key={key} data={item} onHandleFavorite={this.handleFavoriteAttention.bind(this,item)} onHandleSubscr={this.handleSubscrCircleAttention.bind(this,item)} onSubScrUser={this.subScrUser.bind(this,item)}></BehaviorCard>
                              </View>
                            )
                          })
                        }
                      <Preloading showLoading={showAttentionLoading} isToBottom={isAttentionToBottom}></Preloading>
                    </View>
                     :
                    <AttentionCircle />
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={1} className='attention-tabs-pane'>
              <View className='user-item-wrapper'>
                {
                }
                {pageState == 'noData' ? this.renderEmptyPage() : pageState == 'error' ? this.renderServerError()
                  :
                  <View>
                    {
                      recommends.map((item, key) => {
                        return (
                          <View>
                            {
                              item.entity &&
                              <View id={`recommends-item-${item.entity.pid || item.entity.qid}`}>
                                <BehaviorCard key={key} data={item} onHandleFavorite={this.handleFavoriteRecommends.bind(this, item)} onSubScrUser={this.subScrUser.bind(this, item)}></BehaviorCard>
                              </View>
                            }
                          </View>


                        )
                      })
                    }
                    {
                      !isPullDownRefresh &&
                      <Preloading showLoading={showRecommendLoading} isToBottom={isRecommendToBottom}></Preloading>
                    }

                  </View>
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={2} className='attention-tabs-pane'>
              <View className='slider-tab-wrapper'>
                <SliderTab tabList={[{ title: '近24小时' }, { title: '近7天' }]} onChange={this.hotTabChange.bind(this)} />
              </View>
              <View className='user-item-wrapper'>
                {
                  hots.map((item,num) => {
                    return (
                      <View className={`target-item-${item.pid}`}>
                        <UserInfoItem key={item.pid} sortNum={num + 1} showOrder countryAble={false} model={item} closeRelease  onHandleFavorite={this.handleFavoriteHots.bind(this,item)}/>
                      </View>
                    )
                  })
                }
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
        {
          isGuide ?
          this.guide() : null
        }
        {
          <View>
            {
              isCollentMini && this.getCurrentIsCollentMini()==1 && 
              <View className='collectMini' onClick={this.closeCollentMini.bind(this)}>
                <Text>点击“添加到我的小程序”，给孩子们一个美好童年</Text><Image src={ICONS.DELETE}></Image>
              </View>
            }
          </View>
        }
      </View>
    )
  }
}
