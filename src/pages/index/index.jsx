import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtBadge, AtTabs, AtTabsPane } from 'taro-ui'
import HomePage from './presenter'
import { observer, inject } from 'mobx-react'
// import UserInfoItem from './components/user-info-item'
import UserInfoItem from '../../common/components/post-card'
import AttentionCircle from './components/attention-circle'

// scss
import './index.scss'

// images
import iconSearch from '../../assets/img/icon-search.png'
import arrowDown from '../../assets/img/arrow-down.png'
import iconRing from '../../assets/img/icon-ring.png'

@inject('staticDataStore')
@observer
export default class Index extends HomePage {

  config = {
    navigationBarTitleText: '童年'
  }

  render() {
    const { topTabs, currentTopTab, attentionType, hotTabType } = this.state;
    const {currentCity, isGuide} = this.props.staticDataStore
    return (
      <View className='home-page-viewport'>
        <View className='search-bar'>
          <View className='location-info' onClick={this.selectCity}>
            <Text>{currentCity}</Text>
            <Image src={arrowDown} className='icon-arrow-down'></Image>
          </View>
          <View className='search-info'>
            <View className='search-inp' onClick={this.goSearch}>
              <Image src={iconSearch} className='icon-search'></Image>
              <Text>搜索</Text>
            </View>
          </View>
          <View className='notice-info' onLongPress={this.onLongPressForDebug.bind(this)}>
            <AtBadge value={8}>
              <Image src={iconRing} className='icon-ring'></Image>
            </AtBadge>
          </View>
        </View>
        <View className='tabs-container'>
          <AtTabs className='tabs' tabList={topTabs} current={currentTopTab} swipeable={false} onClick={this.topTabChange}>
            <AtTabsPane current={currentTopTab} index={0} className='attention-tabs-pane'>
              <View className='attention-tabs'>
                <View className={`slider-view${attentionType === 2 ? ' left-status' : ''}`}></View>
                <View className='tab-items'>
                  <Text className='tab-item' onClick={this.attentionTabChange.bind(this, 1)}>关注的用户</Text>
                  <Text className='tab-item' onClick={this.attentionTabChange.bind(this, 2)}>关注的圈子</Text>
                </View>
              </View>
              <View className='user-item-wrapper'>
                {
                  attentionType === 1 ?
                    [1, 2, 3, 4, 5].map(key => {
                      return (
                        <UserInfoItem key={key} onClick={this.jump2circle} />
                      )
                    }) :
                    <AttentionCircle />
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={1} className='attention-tabs-pane'>
              <View className='user-item-wrapper'>
                {
                  [1, 2, 3, 4, 5].map(key => {
                    return (
                      <UserInfoItem key={key} needShared />
                    )
                  })
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={2} className='attention-tabs-pane'>
              <View className='user-item-wrapper'>
                {
                  [1, 2, 3, 4, 5].map(key => {
                    return (
                      <UserInfoItem key={key} needShared needDistance />
                    )
                  })
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={3} className='attention-tabs-pane'>
              <View className='attention-tabs'>
                <View className={`slider-view${hotTabType === 2 ? ' left-status' : ''}`}></View>
                <View className='tab-items'>
                  <Text className='tab-item' onClick={this.hotTabChange.bind(this, 1)}>近24小时</Text>
                  <Text className='tab-item' onClick={this.hotTabChange.bind(this, 2)}>近7天</Text>
                </View>
              </View>
              <View className='user-item-wrapper'>
                {
                  [1, 2, 3, 4, 5].map(key => {
                    return (
                      <UserInfoItem key={key} showOrder />
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
        
      </View>
    )
  }

  /**
   * 分享
   */
  onShareAppMessage() {
    return this.setShareOptions()
  }
}
