import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ICONS } from '../../../../common/constant'
import Model from '../model'
import './styles.scss'

export default class DefaultPanel extends Component {

  static defaultProps = {
    type: 2,
    cid: 0,
    onDoSearch:()=>{}
  }

  constructor(props) {
    super(props)
    this.state = {
      historyRecord: [],
      nearHistoryRecord:[],
      hotHistoryRecord:[]
    }
  }

  componentDidMount() {
    this.getHistoryRecord();
    this.getNearHistoryRecord();
    this.getHotHistoryRecord();
  }

  //获取历史记录
  getHistoryRecord = async () => {
    const { type, cid } = this.props;
    let res = await Model.getHistoryRecord(type, cid);
    if (res) {
      this.setState({
        historyRecord: res.itemList
      })
    }
  }

  //删除历史记录
  clearHistory = async () => {
    const { type, cid } = this.props;
    await Model.clearHistoryRecord(type, cid);
    this.setState({
      historyRecord: []
    })
  }

  //获取附近历史记录
  getNearHistoryRecord = async () => {
    const { type, cid } = this.props;
    let res = await Model.getNearHistoryRecord(type, cid);
    if (res) {
      this.setState({
        nearHistoryRecord: res.itemList
      })
    }
  }

  //获取热门历史记录
  getHotHistoryRecord = async () => {
    const { type, cid } = this.props;
    let res = await Model.getHotHistoryRecord(type, cid);
    if (res) {
      this.setState({
        hotHistoryRecord: res.itemList
      })
    }
  }

  doSearch = (value,e)=>{
    e.stopPropagation();
    this.props.onDoSearch(value);
  }

  render() {
    const { historyRecord,nearHistoryRecord,hotHistoryRecord } = this.state;
    return (
      <View className='comp-default-panel'>
        {
          historyRecord.length ?
            <View className='tags-panel'>
              <View className='tags-title'>
                <View className='title'>历史记录</View>
                <View className='btn' onClick={this.clearHistory.bind(this)}><Image src={ICONS.DELETE1} className='delete-icon' /></View>
              </View>
              <View className='tags-list'>
                {
                  historyRecord.map(item => {
                    return <View className='tag-item' onClick={this.doSearch.bind(this,item)}>{item}</View>
                  })
                }
              </View>
            </View> : null
        }

        <View className='tags-panel'>
          <View className='tags-title'>
            <View className='title'>附近热搜</View>
          </View>
          <View className='tags-list'>
            {
              nearHistoryRecord.map(item => {
                return item && <View className='tag-item' onClick={this.doSearch.bind(this,item)}>{item}</View>
              })
            }
          </View>
        </View>
        <View className='tags-panel'>
          <View className='tags-title'>
            <View className='title'>热门推荐</View>
          </View>
          <View className='tags-list'>
            {
              hotHistoryRecord.map(item => {
                return item && <View className='tag-item' onClick={this.doSearch.bind(this,item)}>{item}</View>
              })
            }
          </View>
        </View>
      </View>
    )
  }
}