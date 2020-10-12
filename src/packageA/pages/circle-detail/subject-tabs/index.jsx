import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import UITabs2 from '../../../../common/components/ui-tabs2'
import './index.scss'
import { observer, inject } from 'mobx-react'
import { AtIcon } from 'taro-ui'
import TagScrollView from '@components/tag-scroll-view1'

const tabList = [
  { title: '最热', useable: true },
  { title: '最新发布', useable: true },
  { title: '最新回复', useable: true }
]

let mock = [
  { tagName: '生活1', tagId: '1' ,scrollId:'A'},
  { tagName: '灌水1', tagId: '2' ,scrollId:'B'},
  { tagName: '学校', tagId: '3' ,scrollId:'C'},
  { tagName: '生活2', tagId: '4' ,scrollId:'D'},
  { tagName: '灌水2', tagId: '5' ,scrollId:'E'},
  { tagName: '生活3', tagId: '6' ,scrollId:'F'},
  { tagName: '灌水3', tagId: '7' ,scrollId:'G'}
]

@inject('staticDataStore', 'circleDetailStore')
@observer
export default class CircleTabs extends Component {
  static defaultProps = {
    onSubTabChangeGetData: () => ({})
  }
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      currentSubTab: 0,
      tags: []
    }
    this.circleDetailStore = this.props.circleDetailStore
  }

  componentDidMount() {
    this.getTagList()
  }

  onTabChange = num => {
    this.setState({ current: num })
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

  //获取taglist
  getTagList = async () => {
    const { getTagList } = this.props.staticDataStore;
    const { cid } = this.props.circleDetailStore;
    let res = await getTagList(cid);
    if (res && res.items.length) {
      this.setState({
        tags: res.items
      })
    } else {
      this.setState({
        tags: mock
      })
    }
  }

  //搜索
  onSearch = () => {
    const { listType } = this.props.circleDetailStore;
    Taro.navigateTo({
      url: '/packageA/pages/home-search-panel/index?searchScope=circle&tab=' + (listType + 1)
    })
  }

  render() {
    const { current, currentSubTab, tags } = this.state;
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
              onChange={this.onTabChange}
            />
          </View>
        </View>
        {/* <View className='tag-wrapper'>
          <ScrollView scrollX>
            <View className='tag-list'>
              {
                <View className='tag-item all' onClick={this.onSubTabAll}>全部</View>
              }
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
        </View> */}

        <TagScrollView tags={tags} activeTags={activeTags} onSelectTag={this.onSubTabChange.bind(this)}>
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
        </TagScrollView>
      </View>
    )
  }
}