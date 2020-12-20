import React from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { ICONS } from '../../../common/constant'
import Presenter from './presenter'
import DefaultPanel from './default-panel'
import SearchCircleItem from '../../../common/components/circle-card'
import UITabs2 from '@common/components/ui-tabs2'
import Preloading from '@components/preloading'
import './styles.scss'

const tabList = [
  { title: '推荐', useable: true },
  { title: '距离', useable: true },
  { title: '热度', useable: true },
]
export default class SearchCircle extends Presenter {

  render() {
    const { circlesList, kw, showLoading, isToBottom, current, pageState } = this.state;
    
    return (
      <View className='search-circle-viewport'>
        {pageState == 'loading'? this.renderLoading():''}
        <View className='search-bar'>
          <View className='search-inp'>
            <Input focus className='inp' onInput={this.onKwInput.bind(this)} onConfirm={this.onKwConfirm.bind(this)} value={this.state.kw} />
            <Image src={ICONS.SEARCH} className='search-icon' />
            {/* {
              this.state.showCleanBtn && <Image src={ICONS.CLOSE_BTN} className='clean-icon' onClick={this.cleanKw} />
            } */}
          </View>
          <View className='search-btn'>取消</View>
        </View>
        {
          !!circlesList.length &&
          <View className='tabs'>
            <View className='slider'>圈子列表</View>
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
        }
        {
          !!circlesList.length ? 
          <View className='item-wrapper'>
            {
              circlesList.map((item,n) => {
                return (
                  <SearchCircleItem isSearch={1} data={item} kw={kw} key={n} isShowDistance onHandleSubscr={this.handleSubsrc.bind(this)} />
                )
              })
            }
            <Preloading showLoading={showLoading} isToBottom={isToBottom}></Preloading>
          </View>
          :
          pageState!='loading'&&<DefaultPanel onDoSearch={this.clickDosearch.bind(this)} />
        }
        {
          kw && !!circlesList.length &&
          <View className='no-data'>
            <View className='no-data-content'>
              没有找到想要的圈子
              <View className='create-circle' onClick={this.createCircle.bind(this)}>创建圈子</View>
            </View>
          </View>
        }
        
      </View>
    )
  }
}