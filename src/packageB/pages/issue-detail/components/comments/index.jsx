import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { ICONS } from '@common/constant'
import CommentItem from '../comment-item'
import BaseComponent from '@common/baseComponent'
import UITabs2 from '@components/ui-tabs2'
import Model from '../../model'

import './index.scss'

const tabList = [
  { title: '热度', useable: true },
  { title: '最早', useable: true },
  { title: '最晚', useable: true }
]

@inject('issueDetailStore')
@observer
export default class CommentsView extends BaseComponent {
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

  hanleDeleteReply= (model)=>{
    const {userId} = this.getUserInfo();
    const {qid,replyId} = model;
    const {activeSortType} = this.state;
    const { getAnswerList } = this.props.issueDetailStore;
    if(userId === model.uid){
      Taro.showActionSheet({
        itemList: ['删除'],
        success: async (res)=> {
          if(res.tapIndex == 0){
            let r = await Model.deleteReply(qid,replyId);
            if(r){
              await getAnswerList(activeSortType,qid);
              this.render();
              Taro.showToast({
                title:'删除成功',
                icon:'success',
                duration:2e3
              })
            }else{
              Taro.showToast({
                title:'系统异常',
                icon:'none',
                duration:2e3
              })
            }
          }
        },
        fail:(res)=> {
          console.log(res.errMsg)
        }
      })
    }
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
                <CommentItem key={n} model={item.questionReplyBo} onHandleDelete={this.hanleDeleteReply.bind(this)} />
              )
            })
          }
        </View>
      </View>
    )
  }
}