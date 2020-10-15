
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Textarea, ScrollView } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class Interest extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '选择兴趣话题'
  }

  render() {
    const { typeList,typeIndex, subTypeList, subTypeIndex } = this.state;
    return (
      <View className='interest-viewport'>
        <View className='body-wrapper flex-direction-row'>
          <ScrollView className='left-wrapper' scrollY>
            {
              typeList.map((item, index) => {
                return (
                  index !== typeIndex
                    ? <View onClick={this.selectTypeTab.bind(this,index)} key={`left_item_${item.value}`} className='left-item flex-center'>{item.title}</View>
                    : <View key={`left_item_${item.value}`} className='left-item flex-center active'>
                      <View className='left-item-active flex-center'></View>
                      <View>{item.title}</View>
                    </View>
                )
              })
            }
          </ScrollView>
          <ScrollView className='right-wrapper width-100' scrollY>
            {
              subTypeList.map((item, index) => {
                return (
                  index !== subTypeIndex
                    ? <View onClick={this.selectSubTypeTab.bind(this,index)} key={`right_item_${item.value}`} className='right-item flex-center'>{item.title}</View>
                    : <View key={`right_item_${item.value}`} className='right-item flex-center active'>{item.title}</View>
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
