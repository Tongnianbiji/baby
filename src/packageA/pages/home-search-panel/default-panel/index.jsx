import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ICONS } from '../../../../common/constant'
import Model from '../model'
import './styles.scss'

export default class DefaultPanel extends Component {
  constructor(props) {
    super(props)
    this.state= {
      historyRecord:[
        '学校',
        '医院',
        '输导班',
        '周末'
      ]
    }
  }

  componentDidMount(){
    Model.getHistoryRecord()
  }

  //获取历史记录
  getHistoryRecord= async ()=>{
    let res = await Model.getHistoryRecord();
    if(res && res.length){
      this.setState({
        historyRecord:res
      })
    }
  }

  render() {
    const {historyRecord} = this.state;
    return (
      <View className='comp-default-panel'>
        {
          historyRecord.length ? 
          <View className='tags-panel'>
            <View className='tags-title'>
              <View className='title'>历史记录</View>
              <View className='btn'><Image src={ICONS.DELETE} className='delete-icon' /></View>
            </View>
            <View className='tags-list'>
              {
                historyRecord.map(item=>{
                return <View className='tag-item'>{item}</View>
                })
              }
            </View>
          </View> : null
        }
        
        <View className='tags-panel'>
          <View className='tags-title'>
            <View className='title'>附近热搜</View>
          </View>
          <View className='tags-list'>
            <View className='tag-item'>济阳三村幼儿园</View>
            <View className='tag-item'>济阳一材幼儿园</View>
            <View className='tag-item'>长青幼儿园</View>
          </View>
        </View>
        <View className='tags-panel'>
          <View className='tags-title'>
            <View className='title'>热门推荐</View>
          </View>
          <View className='tags-list'>
            <View className='tag-item'>2017-2019</View>
            <View className='tag-item'>宝宝双十一买什么</View>
            <View className='tag-item'>纸尿裤那些事儿</View>
          </View>
        </View>
      </View>
    )
  }
}