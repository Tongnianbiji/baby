
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Textarea, ScrollView } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

//index !== subTypeIndex
//? <View><View onClick={this.selectSubTypeTab.bind(this,index)} key={`right_item_${item.sid}`} className='right-item flex-center'>{item.name}</View></View>
//: <View><View key={`right_item_${item.sid}`} className='right-item flex-center active'>{item.name}</View></View>

export default class Interest extends Presenter {
  render() {
    const { typeList,typeIndex, subTypeList, subTypeIndex, activeSids } = this.state;
    return (
      <View className='interest-viewport'>
        <View className='body-wrapper flex-direction-row'>
          <ScrollView className='left-wrapper' scrollY>
            {
              typeList.map((item, index) => {
                return (
                  index !== typeIndex

                    ? <View><View onClick={this.selectTypeTab.bind(this,index,item.sid)} key={`left_item_${item.sid}`} className='left-item flex-center'>{item.name}</View></View>
                    : <View key={`left_item_${item.sid}`} className='left-item flex-center active'>
                      <View className='left-item-active flex-center'></View>
                      <View>
                        <View>{item.name}</View>
                      </View>
                    </View>
                )
              })
            }
          </ScrollView>
          <ScrollView className='right-wrapper width-100' scrollY>
            {
              subTypeList.map((item, index) => {
                return (
                 <View>
                   <View onClick={this.selectSubTypeTab.bind(this,item.sid)} key={`right_item_${item.sid}`} className={['right-item','flex-center',activeSids.has(item.sid) ? 'active' : null]}>{item.name}</View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <View className='footer-wrapper'>
          <View className='footer-btn-wrapper'>
            <View className='footer-btn flex-center' onClick={this.submit.bind(this)}>开启美好童年</View>
          </View>

          <View className='footer-skip-wrapper flex-center'>
            <View className='footer-skip' onClick={this.onClickForSkip.bind(this)}>跳过 &gt;</View>
          </View>
        </View>
      </View>
    )
  }
}
