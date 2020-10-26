import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { ICONS } from '@common/constant'
import CommentItem from '../comment-item'
import UITabs2 from '@components/ui-tabs2'

import './index.scss'

const tabList = [
  { title: '热度排序', useable: true },
  { title: '时间排序', useable: true },
  { title: '时间倒序', useable: true }
]

@inject('issueDetailStore')
@observer
export default class CommentsView extends Component {
  static defaultProps = {
    dataList: []
  }

  constructor(props) {
    super(props)
    this.state = {
      activeSortType: 1
    }
  }

  onTabChange = async (id)=>{
    const {getAnswerList,getActiveSortType} = this.props.issueDetailStore;
    getActiveSortType(id+1);
    getAnswerList();
    // this.setState({
    //   activeSortType: id
    // })
  }

  render() {
    const { dataList } = this.props;
    //const {activeSortType} = this.state;
    const {issueDetail:{replys},activeSortType,answerList} = this.props.issueDetailStore;
    return (
      <View className='comment-view'>
        <View className='title'>
        {`回答(${replys})`}
          <View className='sort-btn'>
            <UITabs2
              itemColor='#999'
              tabList={tabList}
              size='small'
              current={activeSortType-1}
              onChange={this.onTabChange.bind(this)}
              />
          </View>
        </View>
        <View className='comment-list'>
          {
            answerList.map((item,n)=>{
              return (
                <CommentItem key={n} model={item.questionReplyBo}/>
              )
            })
          }
        </View>
      </View>
    )
  }
}