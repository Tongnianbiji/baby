import React, { Component } from 'react'
import { View, Text, Image, ScrollView} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const moveX = 30;
const tagListWarpWidth = 326;
export default class TagScrollView extends Component {
  static defaultProps = {

  }

  constructor(props) {
    super(props)
    this.state = {
      scrollLeft: 0,
      startPageX: null,
      tagListWidth: null
    }
  }

  onTouchStart = (e) => {
    this.setTagListWidth();
    this.setState({
      startPageX: e.touches[0].pageX
    })
  }
  onTouchMove = (e) => {
    const { startPageX, scrollLeft, tagListWidth } = this.state;
    if (startPageX - e.touches[0].pageX > 0) {
      console.log('向左滑')
      if (scrollLeft <= 0 && scrollLeft > tagListWarpWidth - tagListWidth) {
        this.setState(pre => ({
          scrollLeft: pre.scrollLeft - moveX
        }))
      }
    } else {
      console.log('向右滑')
      if (scrollLeft < 0)
        this.setState(pre => ({
          scrollLeft: pre.scrollLeft + moveX
        }))
    }

  }
  setTagListWidth = (callback) => {
    const query = Taro.createSelectorQuery();
    query.select('.tag-list').boundingClientRect(rec => {
      this.setState({
        tagListWidth: rec.width
      },callback)
    }).exec()
  }
  manualOnScroll = () => {
    this.setTagListWidth(()=>{
      const { scrollLeft, tagListWidth } = this.state;
      if (scrollLeft <= 0 && scrollLeft > tagListWarpWidth - tagListWidth) {
        this.setState(pre => ({
          scrollLeft: pre.scrollLeft - moveX
        }))
      }
    })
   
  }

  render() {
    const { scrollLeft} = this.state;

    return (
      <View className='scroll-wrapper'>
        <View onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} className="tag-list-wrap">
          <View className='tag-list' style={{ left: scrollLeft + 'px' }}>
            {
              this.props.children
            }
          </View>
        </View>
        <View className='right-arrow'>
          <Image onClick={this.manualOnScroll.bind(this)} className='arrow-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-b.png' />
        </View>
      </View>
    )
  }
}