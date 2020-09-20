import React from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import Presenter from './presenter'
import SearchBar from './search-bar'
import CircleItem from './circle-item'
import SliderTab from '../../../common/components/ui-slider-tab'
import './circle-list.scss'

// @observe
export default class CircleListView extends Presenter {
  config = {
    navigationBarTitleText: '圈子列表'
  }

  render() {
    return (
      <View className='circle-list-view'>
        <SearchBar />
        <View className='tab-wrapper'>
          <SliderTab tabList={[{ title: '最新发布' }, { title: '最热' }, { title: '最相关' }]} />
        </View>
        <View>
          {
            [1,2,3,4].map(item => (
              <CircleItem key={item} />
            ))
          }
        </View>
      </View>
    )
  }
}