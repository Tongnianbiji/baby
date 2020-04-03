import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Presenter from './presenter'
import UserInfoItem from './components/user-info-item'

// scss
import './index.scss'

// images
import iconSearch from '../../assets/img/icon-search.png'
import arrowDown from '../../assets/img/arrow-down.png'
import iconRing from '../../assets/img/icon-ring.png'

export default class Index extends Presenter {

  config = {
    navigationBarTitleText: '童年',
    style: 'height: 100%'
  }

  render() {
    const { topTabs, currentTopTab } = this.state;
    return (
      <View className='home-page-viewport'>
        <View className='search-bar'>
          <View className='location-info'>
            <Text>上海</Text>
            <Image src={arrowDown} className='icon-arrow-down'></Image>
          </View>
          <View className='search-info'>
            <View className='search-inp'>
              <Image src={iconSearch} className='icon-search'></Image>
              <Text>搜索</Text>
            </View>
          </View>
          <View className='notice-info'>
            <Image src={iconRing} className='icon-ring'></Image>
          </View>
        </View>
        <View className='tabs-container'>
          <AtTabs className='tabs' tabList={topTabs} current={currentTopTab} onClick={this.topTabChange} height='519'>
            <AtTabsPane current={currentTopTab} index={0}>
              <View className='attention-tabs'>
                <View className='slider-view'></View>
                <View className='tab-items'>
                  <Text className='tab-item'>关注的用户</Text>
                  <Text className='tab-item'>关注的圈子</Text>
                </View>
              </View>
              <View className='user-item-wrapper'>
                {
                  [1,2,3,4,5].map(key => {
                    return (
                      <UserInfoItem key={key} />
                    )
                  })
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={1}>
              <View className='user-item-wrapper'>
                {
                  [1,2,3,4,5].map(key => {
                    return (
                      <UserInfoItem key={key} needShared />
                    )
                  })
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={2}>
              <View className='user-item-wrapper'>
                {
                  [1,2,3,4,5].map(key => {
                    return (
                      <UserInfoItem key={key} needShared needDistance />
                    )
                  })
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={3}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>4</View>
            </AtTabsPane>
          </AtTabs>
        </View>
        
      </View>
    )
  }
}
