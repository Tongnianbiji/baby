import React from 'react'
import Taro from '@tarojs/taro'
import { WebView } from '@tarojs/components';
import BaseComponent from '../../common/baseComponent'

export default class CommonWeb extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      url: 'https://cdn.tongnian.world/html/app/b0c39095-fcc7-4fb9-9f45-415bf6c0a41f.html',
    }
  }
  componentDidMount() {
    this.setState({
      // url: decodeURIComponent(this.$router.params.url)
    })
  }
  onShareAppMessage() {
    return {
      title: `邀请加入童年`,
      url: `/pages/commonWeb/index?url=${encodeURIComponent(this.state.url)}`,
    }
  }
  handleMessage() { }

  render() {
    return (
      <WebView src={this.state.url} onMessage={this.handleMessage} />
    )
  }
}