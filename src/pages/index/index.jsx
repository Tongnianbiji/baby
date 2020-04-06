import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtBadge, AtTabs, AtTabsPane } from 'taro-ui'
import Presenter from './presenter'
import './index.scss'

export default class Index extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    const { topTabsCurrent, topTabs } = this.state;
    return (
      <View className='index-viewport'>
        <View className='header'>
          <View className='header-left'>
            <View>上海</View>
            <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/triangle.png'></Image>
          </View>
          <View className='header-center'>
            <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/search.png'></Image>
            <View>搜索</View>
          </View>
          <View className='header-right'>
            <AtBadge value={8}>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/message.png'></Image>
            </AtBadge>
          </View>
        </View>
        <View className='body'>
          <AtTabs className='top-tabs' current={topTabsCurrent} tabList={topTabs} swipeable={false} onClick={this.onClickForTopTab.bind(this)}>
            <AtTabsPane current={topTabsCurrent} index={0} >
              {this.renderFocus()}
            </AtTabsPane>
            <AtTabsPane current={topTabsCurrent} index={1}>
              推荐
            </AtTabsPane>
            <AtTabsPane current={topTabsCurrent} index={2}>
              附近
            </AtTabsPane>
            <AtTabsPane current={topTabsCurrent} index={2}>
              热榜
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }

  /**
   * 关注
   */
  renderFocus() {
    return (
      <View>
        <View className='focus-header'>
          <View className='focus-header-user active'>
            关注的用户
         </View>
          <View className='focus-header-group'>
            关注的圈子
          </View>
        </View>
        <View className='focus-body'>
          关注
        </View>
      </View>
    )
  }
}
