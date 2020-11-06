import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ICONS } from '@common/constant'
import CommentItem from '../comment-item'
import { observer, inject } from 'mobx-react'
import UITabs2 from '@components/ui-tabs2'
import Model from '../../model'
import './index.scss'

const tabList = [
  { title: '热度', useable: true },
  { title: '时间正序', useable: true },
  { title: '时间倒序', useable: true }
]
@inject('postDetail')
@observer
export default class CommentsView extends Component {
  static defaultProps = {
    dataList: [],
    replys: 0,
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
      ],
    }
  }
  // selectSortType = (id, e) => {
  //   e.stopPropagation()
  //   console.log('选择排序')
  //   this.props.selectSortType(id);
  //   this.setState({
  //     activeSortType: id
  //   })
  // }
  onTabChange = (id)=>{
    //e.stopPropagation()
    console.log('选择排序')
    this.props.selectSortType(id+1);
    this.setState({
      activeSortType: id
    })
  }
  onReplyPost = (model) => {
    this.props.onReplyPost(model)
  }

  toggleInfo = (item) => {
    const { commentList, updateReplyList, getUpdateReplyListStatus } = this.props.postDetail;
    updateReplyList(getUpdateReplyListStatus(commentList, item.postReplyBo))
    this.render()
  }

  hanleDeleteReply= (model)=>{
    const {pid,replyId} = model;
    const {activeSortType} = this.state;
    const { getReplyList } = this.props.postDetail;
    Taro.showActionSheet({
      itemList: ['删除'],
      success: async (res)=> {
        if(res.tapIndex == 0){
          let r = await Model.deleteReply(pid,replyId);
          if(r){
            getReplyList(activeSortType,pid);
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

  // 不支持递归渲染
  // 只要是包含的jsx的func 都会undefined. 神奇 hasChildredSibling
  // 支持多少层, 就写多少以下代码吧..
  getRenderContents(list) {
    const dropDown = {
      fontSize: '12px',
      color: '#999999',
      //padding: '5px',
      textAlign: 'center',
      display:'flex',
      alignItems:'center'
    }
    const dropDownIcon = {
      width: '10px',
      height: '10px',
      marginRight: '5px'
    }
    return (
      <View>
        {
          list.map(item => {
            return <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item.postReplyBo} key={item.replyId} needLine hasChildren={item.leafReplyList && item.leafReplyList.length}>
              {
                item.isShowSubInfo ?
                item.leafReplyList && item.leafReplyList.map((item2, index2) => {
                  return (
                    <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item2.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item2)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item2.postReplyBo} key={item2.replyId} hasChildren={item2.leafReplyList && item2.leafReplyList.length} last={index2 === item.leafReplyList.length - 1}>
                      {
                        item2.isShowSubInfo ?
                          item2.leafReplyList && item2.leafReplyList.map((item3, index3) => (
                            <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item3.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item3)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item3.postReplyBo} key={item3.replyId} hasChildren={item3.leafReplyList && item3.leafReplyList.length} last={index3 === item2.leafReplyList.length - 1}>
                              {
                                item3.isShowSubInfo ?
                                  item3.leafReplyList && item3.leafReplyList.map((item4, index4) => (
                                    <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item4.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item4)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item4.postReplyBo} key={item4.replyId} hasChildren={item4.leafReplyList && item4.leafReplyList.length} last={index4 === item3.leafReplyList.length - 1}>
                                      {
                                        item4.isShowSubInfo ?
                                          item4.leafReplyList && item4.leafReplyList.map((item5, index5) => (
                                            <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item5.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item5)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item5.postReplyBo} key={item5.replyId} hasChildren={item5.leafReplyList && item5.leafReplyList.length} last={index5 === item4.leafReplyList.length - 1}>
                                              {
                                              item5.isShowSubInfo ?
                                                item5.leafReplyList && item5.leafReplyList.map((item6, index6) => (
                                                  <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item6.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item6)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item6.postReplyBo} key={item6.replyId} hasChildren={item6.leafReplyList && item6.leafReplyList.length} last={index6 === item5.leafReplyList.length - 1}>
                                                    {
                                                      item6.isShowSubInfo ?
                                                      item6.leafReplyList && item6.leafReplyList.map((item7, index7) => (
                                                        <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item7.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item7)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item7.postReplyBo} key={item7.replyId} hasChildren={item7.leafReplyList && item7.leafReplyList.length} last={index7 === item6.leafReplyList.length - 1}>
                                                          {
                                                            item7.isShowSubInfo ?
                                                            item7.leafReplyList && item7.leafReplyList.map((item8, index8) => (
                                                              <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item8.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item8)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item8.postReplyBo} key={item8.replyId} hasChildren={item8.leafReplyList && item8.leafReplyList.length} last={index8 === item7.leafReplyList.length - 1}>
                                                                {
                                                                  item8.isShowSubInfo ?
                                                                  item8.leafReplyList && item8.leafReplyList.map((item9, index9) => (
                                                                    <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item9.isShowContent} onToggleInfo={this.toggleInfo.bind(this, item9)} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item9.postReplyBo} key={item9.replyId} hasChildren={item9.leafReplyList && item9.leafReplyList.length} last={index9 === item8.leafReplyList.length - 1}>
                                                                      {
                                                                        item9.isShowSubInfo ?
                                                                        item9.leafReplyList && item9.leafReplyList.map((item10, index10) => (
                                                                          <CommentItem onReplyPost={this.onReplyPost.bind(this)} isShowContent={item10.isShowContent} onHandleDelete={this.hanleDeleteReply.bind(this)} model={item10.postReplyBo} key={item10.replyId} hasChildren={item10.leafReplyList && item10.leafReplyList.length} last={index10 === item9.leafReplyList.length - 1} />

                                                                        ))
                                                                        : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item9)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item9.subLength}条`}</View></View></View>
                                                                      }
                                                                    </CommentItem>
                                                                  ))
                                                                  : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item8)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item8.subLength}条`}</View></View></View>
                                                                }
                                                              </CommentItem>
                                                            ))
                                                            : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item7)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item7.subLength}条`}</View></View></View>
                                                          }
                                                        </CommentItem>
                                                      ))
                                                      : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item6)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item6.subLength}条`}</View></View></View>
                                                    }
                                                  </CommentItem>
                                                ))
                                                : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item5)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item5.subLength}条`}</View></View></View>
                                              }
                                            </CommentItem>
                                          ))
                                          : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item4)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item4.subLength}条`}</View></View></View>
                                      }
                                    </CommentItem>
                                  ))
                                  : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item3)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item3.subLength}条`}</View></View></View>
                              }
                            </CommentItem>
                          ))
                          : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item2)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item2.subLength}条`}</View></View></View>
                      }
                    </CommentItem>
                  )
                })
                : <View><View style={dropDown} onClick={this.toggleInfo.bind(this, item)}><Image style={dropDownIcon} src={ICONS.DROP}></Image><View>{`${item.subLength}条`}</View></View></View>
              }
            </CommentItem>
          })
        }
      </View>
    )
  }

  render() {
    const { replys, postDetail } = this.props;
    const { dropList, activeSortType } = this.state;
    const { commentList } = postDetail;
    return (
      <View className='comment-view'>
        <View className='title'>
          {`评论(${replys})`}
          {/* <DropDown title={dropList[activeSortType - 1].name}>
            <View>
              {
                dropList.map((item) => {
                  return (
                    <View style={{ color: activeSortType === item.id ? 'red' : null }} onClick={this.selectSortType.bind(this, item.id)}>{item.name}</View>
                  )
                })
              }
            </View>

          </DropDown> */}
          <View className="tabs2">
            <UITabs2
                itemColor='#999'
                tabList={tabList}
                size='small'
                current={activeSortType}
                onChange={this.onTabChange.bind(this)}
              />
          </View>
        </View>
        <View className='comment-list'>
          {
            this.getRenderContents(commentList)
          }
        </View>
      </View>
    )
  }
}