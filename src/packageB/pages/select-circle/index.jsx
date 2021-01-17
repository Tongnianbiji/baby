import React from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Image, Text } from '@tarojs/components'
import CircleItem from './circle-item'

import { ICONS } from '../../../common/constant'
import Presenter from './presenter'
import './styles.scss'

export default class SearchCircle extends Presenter {

  render() {
    const { myCircle, kw, searchCircle, isSearchCircleShow, isSearchResultEmpty, pageState } = this.state;

    if (pageState =='loading') {
      return this.renderLoading();
    }
    if (pageState == 'error') {
      return this.renderServerError();
    }
    return (
      <View className='search-circle-viewport'>
        <View className='search-bar'>
          <View className='search-inp'>
            <Input focus className='inp' onInput={this.onKwInput.bind(this)} value={kw} />
            <Image src={ICONS.SEARCH} className='search-icon' />
          </View>
          <View className='search-btn' onClick={this.clearSearch.bind(this)}>取消</View>
        </View>
        {isSearchCircleShow ?
          isSearchResultEmpty ?
            this.renderEmptyPage('25vh', '没有找到想要的圈子')
            :
            <View className='search-circle-list'>
              <Text className='title'>搜索结果</Text>
              {
                searchCircle.map((item, n) => {
                  return (
                    <CircleItem key={item.cid} model={item}></CircleItem>
                  )
                })
              }
            </View>
          :
          <View className='my-circle-list'>
            <Text className='title'>关注的圈子</Text>
            {
              myCircle.map((item, n) => {
                return (
                  <CircleItem key={item.cid} model={item}></CircleItem>
                )
              })
            }
          </View>
        }
      </View>
    )
  }
}