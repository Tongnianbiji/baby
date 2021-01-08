import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import UITabs2 from '../../../../common/components/ui-tabs2'
import './index.scss'
import { observer, inject } from 'mobx-react'
import { AtIcon } from 'taro-ui'
// import TagScrollView from '@components/tag-scroll-view1'

const tabList = [
  { title: '最热', useable: true },
  { title: '最新发布', useable: true },
  { title: '最新回复', useable: true }
]
@inject('staticDataStore', 'circleDetailStore')
@observer
export default class CircleTabs extends Component {
  static defaultProps = {
    onSubTabChangeGetData: () => ({}),
    onTabChangeGetData:()=>{}
  }
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      currentSubTab: 0,
    }
    this.circleDetailStore = this.props.circleDetailStore
  }


  onTabChange = num => {
    this.setState({ current: num })
    this.circleDetailStore.updateActiveTopTab(num)
    this.props.onTabChangeGetData(num);
  }
  onSubTabChange = (item) => {
    this.circleDetailStore.updateActiveTags(item);
    this.props.onSubTabChangeGetData();
  }
  onSubTabAll = () => {
    const { postLock, listType } = this.circleDetailStore;
    this.circleDetailStore.clearActiveTags();
    this.circleDetailStore.resetTabListStatus(listType);
    if (!this.circleDetailStore.isToBottom() && !postLock) {
      this.circleDetailStore.typeTabPost();
    }

  }

  //搜索
  onSearch = () => {
    const { listType,cid } = this.props.circleDetailStore;
    Taro.navigateTo({
      url: '/packageA/pages/home-search-panel/index?searchScope=circle&tab=' + (listType) + '&cid=' + cid
    })
  }

  render() {
    const { current, currentSubTab } = this.state;
    const tags = this.props.tags;
    let { activeTags } = this.props.circleDetailStore;
    return (
      <View className='circle-tabs-view'>
        <View className='header'>
          <View className='title'>话题列表</View>
          <View className="search" onClick={this.onSearch.bind(this)}>
            <AtIcon value='search' size='15' color='#333333'></AtIcon>
          </View>
          <View className='tabs-wrapper'>
            <UITabs2
              itemColor='#999'
              tabList={tabList}
              size='small'
              current={current}
              onChange={this.onTabChange.bind(this)}
            />
          </View>
        </View>
        <View className='tag-wrapper'>
          <ScrollView scrollX>
            <View className='tag-list'>
              {/* {
                <View className='tag-item all' onClick={this.onSubTabAll}>全部</View>
              } */}
              {
                tags.map((item, index) => (
                  <View key={index} className={['tag-item', activeTags.has(item.tagId) ? 'tag-item-active' : '']} onClick={this.onSubTabChange.bind(this, item)}>{item.tagName}</View>
                ))
              }
            </View>
          </ScrollView>
          <View className='right-arrow'>
            <Image className='arrow-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-b.png' />
          </View>
        </View>

        {/* <TagScrollView tags={tags} activeTags={activeTags} onSelectTag={this.onSubTabChange.bind(this)}>
          <View className='tag-list'>
            {
              <View className='tag-item all' onClick={this.onSubTabAll}>全部</View>
            }
            {
              tags.map((item, index) => (
                <View id={item.scrollId} key={index} className={['tag-item', activeTags.has(item.tagId) ? 'tag-item-active' : '']} onClick={this.onSubTabChange.bind(this, item)}>{item.tagName}</View>
              ))
            }
          </View>
        </TagScrollView> */}
      </View>
    )
  }
}