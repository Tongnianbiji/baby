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
let t = null;
export default class TypeTabsView extends Component {
  static defaultProps = {
    onTypeChange: () => ({}),
    onSubTabChangeGetData: () => ({}),
    onDoubleClickTab:() =>({})
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      touchStartTime:0
    }
  }

  touchStart = (e)=> {
    const { touchStartTime } = this.state;
    const that = this;
    if (!touchStartTime) {
      console.log('时间',e)
      this.setState({
        touchStartTime: e.timeStamp
      })
      t = setTimeout(function timer() {
        console.log('双击')
        that.setState({
          touchStartTime: 0
        })
      }, 500)
    }else {
      if (e.timeStamp - touchStartTime < 350) {
        this.props.onDoubleClickTab();
        Taro.vibrateShort().then(() => {
          console.log('双击震动')
        })
        this.setState({
          touchStartTime: 0
        })
        clearTimeout(t);
      }
    }
  }

  typeTabChange = index => {
    this.setState({
      current: index
    })
    this.props.onTypeChange(index, TypeTabs[index])
  }
  onSubTabChangeGetData = (item) => {
    this.props.onSubTabChangeGetData(item.title)
  }

  render() {
    const { current } = this.state
    return (
      <View className='type-tabs-view' onTouchStart={this.touchStart}>
        <AtTabs animated={false} className='tabs' tabList={TypeTabs} current={current} onClick={this.typeTabChange}>
          <AtTabsPane index={0} current={current}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChangeGetData} />
          </AtTabsPane>
          <AtTabsPane index={1} current={current}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChangeGetData} />
          </AtTabsPane>
          <AtTabsPane index={2} current={current}>
            <SubjectTabs onSubTabChangeGetData={this.onSubTabChangeGetData} />
          </AtTabsPane>
          <AtTabsPane index={3} current={current}>
            <View className='slider-tab-wrapper'>
              <SliderTab tabList={[{ title: '24小时' }, { title: '近7天' }]} />
            </View>
          </AtTabsPane>
          <AtTabsPane index={4} current={current}>
            <View className='slider-tab-wrapper'>
              <SliderTab tabList={[{ title: '活跃度' }, { title: '距离' }]} />
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