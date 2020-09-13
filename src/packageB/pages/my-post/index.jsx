import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import PostItem from '@components/post-card'

import './index.scss'

export default class MyPostView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabList: [{ title: '我发布的' }, { title: '我回复的' }],
      currentTab: 0
    }
  }

  config = {
    navigationBarTitleText: '帖子'
  }

  tabChange = index => {
    this.setState({ currentTab: index })
  }

  render() {
    const { currentTab } = this.state;
    return (
      <View className='my-post-view'>
        <AtTabs tabList={this.state.tabList} current={currentTab} swipeable={false} className='tabs' onClick={this.tabChange}>
          <AtTabsPane className='i-release-pane' index={0} current={currentTab}>
            <PostItem closeRelease onlyReleaseTime />
            <PostItem closeRelease onlyReleaseTime />
            <PostItem closeRelease onlyReleaseTime />
          </AtTabsPane>
          <AtTabsPane className='i-reply-pane' index={1} current={currentTab}>
            <PostItem closeRelease onlyReleaseTime />
            <PostItem closeRelease onlyReleaseTime />
            <PostItem closeRelease onlyReleaseTime />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}