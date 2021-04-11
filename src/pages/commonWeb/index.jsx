import React from 'react'
import Taro from '@tarojs/taro'
import { WebView } from '@tarojs/components';
import BaseComponent from '../../common/baseComponent'

export default class CommonWeb extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      url: 'http://192.168.0.107:8080/test.html?pid=92',
    }
  }
  componentDidMount() {
    // console.log(333, this.$router.params.url)
    this.setState({
      url: decodeURIComponent(this.$router.params.url)
    })
  }
  onShareAppMessage() {
    return {
      title: `邀请你加入童年吧`,
      url: `/pages/commonWeb/index?url=${encodeURIComponent(this.state.url)}`,
    }
  }

  onShareTimeline(){
		return {
			title: `欢迎加入童年`,
			query: `url=${encodeURIComponent(this.state.url)}`,
		}
	}

  handleMessage(e) {
    console.log(111, e)
   }

  render() {
    return (
      <WebView src={this.state.url} onMessage={this.handleMessage} />
    )
  }
}