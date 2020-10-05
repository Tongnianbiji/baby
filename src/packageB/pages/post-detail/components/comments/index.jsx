import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ICONS } from '@common/constant'
import CommentItem from '../comment-item'
import DropDown from '@components/drop-down'

import './index.scss'

export default class CommentsView extends Component {
  static defaultProps = {
    dataList: [],
    selectSortType: () => { },
    onReplyPost: () => { }
  }

  constructor(props) {
    super(props)
    this.state = {
      activeSortType: 1,
      dropList: [
        {
          id: 1,
          name: '热度排序'
        },
        {
          id: 2,
          name: '时间排序'
        },
        {
          id: 3,
          name: '时间倒序'
        }
      ]
    }
  }
  selectSortType = (id) => {
    console.log('选择排序')
    this.props.selectSortType(id);
    this.setState({
      activeSortType: id
    })
  }
  onReplyPost = (model) => {
    this.props.onReplyPost(model)
  }

  // 不支持递归渲染
  // 只要是包含的jsx的func 都会undefined. 神奇 hasChildredSibling
  // 支持多少层, 就写多少以下代码吧..
  getRenderContents(list) {
    return (
      <View>
        {
          list.map(item => {
            return <CommentItem onReplyPost={this.onReplyPost.bind(this)} model={item.postReplyBo} key={item.replyId} needLine hasChildren={item.leafReplyList && item.leafReplyList.length}>
              {
                item.leafReplyList && item.leafReplyList.map((item2, index2) => {
                  return (
                    <CommentItem key={item2.replyId} hasChildren={item2.leafReplyList && item2.leafReplyList.length} last={index2 === item.leafReplyList.length - 1}>
                      {
                        item2.leafReplyList && item2.leafReplyList.map((item3, index3) => (
                          <CommentItem style='flex:1' key={item3.replyId} hasChildren={item3.leafReplyList && item3.leafReplyList.length} last={index3 === item2.leafReplyList.length - 1}>
                            {
                              item3.leafReplyList && item3.leafReplyList.map((item4, index4) => (
                                <CommentItem style='flex:1' key={item4.replyId}  hasChildren={item4.leafReplyList && item4.leafReplyList.length} last={index4 === item3.leafReplyList.length - 1}>
                                  {
                                     
                                    item4.leafReplyList && item4.leafReplyList.map((item5, index5) => (
                                      <CommentItem style='flex:1' key={item5.replyId} hasChildren={item5.leafReplyList && item5.leafReplyList.length} last={index5 === item4.leafReplyList.length - 1}>
                                        {
                                          item5.leafReplyList && item5.leafReplyList.map((item6, index6) => (
                                            <CommentItem style='flex:1' key={item6.replyId} hasChildren={item6.leafReplyList && item6.leafReplyList.length} last={index6 === item5.leafReplyList.length - 1}>
                                              {
                                                item6.leafReplyList && item6.leafReplyList.map((item7, index7) => (
                                                  <CommentItem style='flex:1' key={item7.replyId} hasChildren={item7.leafReplyList && item7.leafReplyList.length} last={index7 === item6.leafReplyList.length - 1}>
                                                    {
                                                      item7.leafReplyList && item7.leafReplyList.map((item8, index8) => (
                                                        <CommentItem style='flex:1' key={item8.replyId} hasChildren={item8.leafReplyList && item8.leafReplyList.length} last={index8 === item7.leafReplyList.length - 1}>
                                                          {
                                                            item8.leafReplyList && item8.leafReplyList.map((item9, index9) => (
                                                              <CommentItem style='flex:1' key={item9.replyId} hasChildren={item9.leafReplyList && item9.leafReplyList.length} last={index9 === item8.leafReplyList.length - 1}>
                                                                {
                                                                  item9.leafReplyList && item9.leafReplyList.map((item10, index10) => (
                                                                    <CommentItem style='flex:1' key={item10.replyId} hasChildren={item10.leafReplyList && item10.leafReplyList.length} last={index10 === item9.leafReplyList.length - 1} />

                                                                  ))
                                                                }
                                                              </CommentItem>
                                                            ))
                                                          }
                                                        </CommentItem>
                                                      ))
                                                    }
                                                  </CommentItem>
                                                ))
                                              }
                                            </CommentItem>
                                          ))
                                        }
                                      </CommentItem>
                                    ))
                                  }
                                </CommentItem>
                              ))
                            }
                          </CommentItem>
                        ))
                      }
                    </CommentItem>
                  )
                })
              }
            </CommentItem>
          })
        }
      </View>
    )
  }

  render() {
    const { dataList } = this.props;
    const { dropList, activeSortType } = this.state;
    return (
      <View className='comment-view'>
        <View className='title'>
          评论(18)
           <DropDown title={dropList[activeSortType - 1].name}>
            <View>
              {
                dropList.map((item) => {
                  return (
                    <View style={{ color: activeSortType === item.id ? 'red' : null }} onClick={this.selectSortType.bind(this, item.id)}>{item.name}</View>
                  )
                })
              }
            </View>

          </DropDown>
        </View>
        <View className='comment-list'>
          {
            this.getRenderContents(dataList)
          }
        </View>
      </View>
    )
  }
}