import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Preloading from '@components/preloading'
import './index.scss'

export default class ScrollViewList extends Component {
  static defaultProps = {
    showLoading:true,
    isToBottom:false,
    fixed: false,
    centerHeight: '',
    onScrollToLower:()=>{},
    onScrollToUpper:()=>{},
    onScroll:()=>{}
  }

  constructor(props) {
    super(props)
  }

  scrollToLower = () => {
    this.props.onScrollToLower()
  }

  scrollToUpper = () =>{
    this.props.onScrollToUpper()
  }

  scroll = ()=>{
    this.props.onScroll()
  }

  render() {
    const { showLoading, isToBottom, fixed,centerHeight } = this.props;
    const scrollStyle = {
      height: centerHeight
    }
    return (
      <View style={{minHeight:'200px',backgroundColor:'#f5f5f5'}}>
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.scrollToLower.bind(this)}
          onScrollToUpper={this.scrollToUpper.bind(this)}
          onScroll={this.scroll.bind(this)}
          className="scroll-view"
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