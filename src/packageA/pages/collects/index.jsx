import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import NoticeCard from '../../../common/components/notice-card'
import './index.scss'

export default class CollectsView extends Presenter {
  config = {
    navigationBarTitleText: '收藏/获赞'
  }

  render() {
    const { currentTab } = this.state
    return (
      <View className='collects-vewport'>
        <AtTabs tabList={this.state.tabList} className='tabs' current={currentTab} onClick={this.tabChange}>
          <AtTabsPane index={0} className='message-tabs-pane' current={currentTab}>
            <NoticeCard data={{}} type='favorite' />
            <NoticeCard data={{}} type='favorite' />
          </AtTabsPane>
          <AtTabsPane index={1} className='message-tabs-pane' current={currentTab}>
            <NoticeCard data={{}} type='favorite' />
            <NoticeCard data={{}} type='favorite' />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}