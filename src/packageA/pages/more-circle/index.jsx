import React from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import Presenter from './presenter'
import { ICONS } from '../../../common/constant'
import SearchCircleItem from '@common/components/circle-card'
import Preloading from '@components/preloading'
import UITabs2 from '@common/components/ui-tabs2'
import './styles.scss'

const tabList = [
  { title: '推荐', useable: true },
  { title: '距离', useable: true },
  { title: '热度', useable: true },
]
export default class MoreCircleView extends Presenter {
  config = {
    navigationBarTitleText: '更多圈子'
  }

  render() {
    const {childrenCircles,kw,showLoading,isToBottom,current} = this.state;
    console.log('更多圈子',childrenCircles)
    return (
      <View className='more-circle-viewport'>
        <View className='search-box'>
          <View className='inp-wrapper'>
            <Input className='search-inp' onInput={this.onKwInput.bind(this)} value={kw} />
            <Image src={ICONS.SEARCH} className='search-icon' />
          </View>
        </View>
        { 
          !!childrenCircles.length && 
          <View className='list-wrapper'>
            <View className='tabs'>
              {/* <View className='slider' style={this.state.sliderStyle}></View> */}
              <View className='slider' style={this.state.sliderStyle}>{kw}</View>
              <View className='tab-items'>
                <UITabs2
                  itemColor='#999'
                  tabList={tabList}
                  size='small'
                  current={current}
                  onChange={this.onTabChange.bind(this)}
                />
              </View>
            </View>
            <View>
              {
                childrenCircles.map(item => {
                  return (
                    <SearchCircleItem data={item} key={item.cid} kw={kw} onHandleSubscr={this.handleSubsrc.bind(this)} />
                  )
                })
              }
              <Preloading showLoading={showLoading} isToBottom={isToBottom}></Preloading>
            </View>
          </View>
        }
        
      </View>
    )
  }
}