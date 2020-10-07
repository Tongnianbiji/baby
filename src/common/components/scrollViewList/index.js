import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'
import Preloading from '@components/preloading'

export default class ScrollViewList extends Component {
  static defaultProps = {
    showLoading:true,
    isToBottom:false,
    fixed: false,
    centerHeight: '',
    onScrollToLower:()=>{}
  }

  constructor(props) {
    super(props)
  }

  scrollToLower = () => {
    this.props.onScrollToLower()
  }

  render() {
    const { showLoading, isToBottom, fixed,centerHeight } = this.props;
    const scrollStyle = {
      height: centerHeight
    }
    return (
      <View>
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.scrollToLower}
          className="card-wrapper"
          style={fixed ? scrollStyle : null}
        >
          {
            this.props.children
          }
          <Preloading showLoading={showLoading} isToBottom={isToBottom}></Preloading>
        </ScrollView>
      </View>
    )
  }
}