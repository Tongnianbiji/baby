import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {View, Text} from '@tarojs/components'
import './index.scss'

export default class UISliderTabView extends Component {
  static defaultProps = {
    tabList: [],
    onChange: () => ({}),
    current: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  tabChange = num => {
    this.setState({ current: num })
    this.props.onChange(num)
  }

  render() {
    const {tabList} = this.props
    const {current} = this.state
    return (
      <View className='ui-slider-tab'>
        <View className={`slider-view left-${current} item-${Math.min(5, tabList.length)}`}></View>
        <View className='tab-items'>
          {
            tabList.map((tab, index) => {
              return index < 5 ? (
                <Text
                  key={tab.title}
                  className='tab-item'
                  onClick={this.tabChange.bind(this, index)}>
                    {tab.title}
                </Text>
              ) : null
            })
          }
        </View>
      </View>
    )
  }
}