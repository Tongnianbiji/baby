import React, { Component } from 'react'
import { View, Text, Image, ScrollView} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import {ICONS} from '@common/constant'

export default class TagScrollView extends Component {
  static defaultProps = {
    tags:[],
    currentId:null,
    onSelectTag:()=>{}
  }

  constructor(props) {
    super(props)
    this.state = {
      isUnfold:false,
      activeTags:new Set()
    }
    
  }

  _unfoldTags = ()=>{
    this.setState(pre=>({
      isUnfold:!pre.isUnfold
    }))
  }

  selectTag = (item,e)=>{
    e.stopPropagation();
    this.props.onSelectTag(item);
    this.setState({
      currentId:item.scrollId,
      //isUnfold:false
    })
  }

  render() {
    const {isUnfold, currentId} = this.state;
    const {tags,activeTags} = this.props;
    let newActiveTags = Array.from(activeTags)
    return (
      <View className='tag-wrapper'>
        <ScrollView scrollX scrollIntoView={currentId}>
          {this.props.children}
        </ScrollView>
        <View className='right-arrow' onClick={this._unfoldTags.bind(this)}>
          <Image className='arrow-icon' src={ICONS.ARROW_RIGHT_B} />
        </View>
        {
          isUnfold ? 
          <View className='tags-unfold'>
            {
              tags.map(item=>{
              return <View className={['tag-item', newActiveTags.includes(item.tagId) ? 'tag-item-active' : '']} onClick={this.selectTag.bind(this,item)}>{item.tagName}</View>
              })
            }
          </View> : null
        }
      </View>
    )
  }
}