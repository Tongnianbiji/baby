import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import SubjectTabs from '../subject-tabs'
import SliderTab from '../../../../common/components/ui-slider-tab'
import CustomCircle from '../custom-circle'
import './type-tabs.scss'

const TypeTabs = [
  { title: '精华' },
  { title: '帖子' },
  { title: '问答' },
  { title: '热门' },
  { title: '用户' },
  { title: '定制圈子' }
]
export default class TypeTabsView extends Component {
  static defaultProps = {
    onTypeChange: () => ({})
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  typeTabChange = index => {
    this.setState({
      current: index
    })
    this.props.onTypeChange(index, TypeTabs[index])
  }

  render() {
    const {current} = this.state
    return (
      <View className='type-tabs-view'>
        <AtTabs animated={false} className='tabs' tabList={TypeTabs} current={current} onClick={this.typeTabChange}>
          <AtTabsPane index={0} current={current}>
            <SubjectTabs />
          </AtTabsPane>
          <AtTabsPane index={1} current={current}>
            <SubjectTabs />
          </AtTabsPane>
          <AtTabsPane index={2} current={current}>
            <SubjectTabs />
          </AtTabsPane>
          <AtTabsPane index={3} current={current}>
            <View className='slider-tab-wrapper'>
              <SliderTab tabList={[{title: '24小时'}, {title: '近7天'}]} />
            </View>
          </AtTabsPane>
          <AtTabsPane index={4} current={current}>
          <View className='slider-tab-wrapper'>
              <SliderTab tabList={[{title: '活跃度'}, {title: '距离'}]} />
            </View>
          </AtTabsPane>
          <AtTabsPane index={5} current={current}>
            <CustomCircle />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}