import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import UITabs2 from '@common/components/ui-tabs2'
import './styles.scss'


const tabList = [
  { title: '最相关', useable: true },
  { title: '最热', useable: true },
  { title: '最新', useable: true },
]
export default class PostTitleBar extends Component {
  static defaultProps = {
    title: '帖子列表'
  }

  constructor(props) {
    super(props);
    this.state ={
      current:0
    }
  }

  onTabChange = (id)=>{
    this.setState({
      current: id
    })
  }

  render() {
    const {current} = this.state;
    const {title} = this.props;
    // return (
    //   <View className='ui-post-title-bar'>
    //     <View className='title'>{this.props.title}</View>
    //     <View className='tabs'>
    //       <View className='tab-item actived'>
    //         最相关
    //         <View className='actived-underscore'></View>
    //       </View>
    //       <View className='tab-item'>最热</View>
    //       <View className='tab-item'>最新</View>
    //     </View>
    //   </View>
    // )
    return (
      <View className='tabs-wrapper1'>
        <View className='slider'>{title}</View>
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
    )
  }
}