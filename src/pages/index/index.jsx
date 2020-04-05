import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Presenter from './presenter'
// import UserInfoItem from './components/user-info-item'
import UserInfoItem from '../../common/components/post-card'
import AttentionCircle from './components/attention-circle'

// scss
import './index.scss'

// images
import iconSearch from '../../assets/img/icon-search.png'
import arrowDown from '../../assets/img/arrow-down.png'
import iconRing from '../../assets/img/icon-ring.png'

export default class Index extends Presenter {

  config = {
    navigationBarTitleText: '童年'
  }

  render() {
    const { topTabs, currentTopTab, attentionType, hotTabType } = this.state;
    return (
      <View className='home-page-viewport'>
        <View className='search-bar'>
          <View className='location-info'>
            <Text>上海</Text>
            <Image src={arrowDown} className='icon-arrow-down'></Image>
          </View>
          <View className='search-info'>
            <View className='search-inp' onClick={this.goSearch}>
              <Image src={iconSearch} className='icon-search'></Image>
              <Text>搜索</Text>
            </View>
          </View>
          <View className='notice-info'>
            <Image src={iconRing} className='icon-ring'></Image>
          </View>
        </View>
        <View className='tabs-container'>
          <AtTabs className='tabs' tabList={topTabs} current={currentTopTab} onClick={this.topTabChange}>
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
                    [1,2,3,4,5].map(key => {
                      return (
                        <UserInfoItem key={key} />
                      )
                    }) :
                    <AttentionCircle />
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={currentTopTab} index={1} className='attention-tabs-pane'>
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
            <AtTabsPane current={currentTopTab} index={2} className='attention-tabs-pane'>
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
                  [1,2,3,4,5].map(key => {
                    return (
                      <UserInfoItem key={key} showOrder />
                    )
                  })
                }
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}
