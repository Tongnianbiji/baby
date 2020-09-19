import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './styles.scss'

export default class CircleItem extends Component {
  static defaultProps = {
    data: null,
    // 是否在最上方显示 [可能感兴趣] 一栏
    recommand: false,
    kw: '济阳'
  }

  constructor(props) {
    super(props)
    this.state = {
      title: []
    }
  }

  componentWillMount() {
    const originTxt = '济阳四村济阳幼儿园';
    const reg = new RegExp(this.props.kw, 'gi');
    const contentReg = /^_#_([^_#_]+)_#_$/;
    const newList = [];
    let c = 1;
    originTxt.replace(reg, (matched) => `,_#_${matched}_#_,`).split(',').map(t => {
      const isView = contentReg.test(t)
      t && newList.push({
        id: ++c,
        type: isView ? 'view' : 'text',
        value: isView ? t.match(contentReg)[1] : t
      })
    })
    this.setState({
      title: newList
    })
  }

  render() {
    return (
      <View className='search-circle-item'>
        {
          this.props.recommand &&
          <View className='recommand-title'>可能感兴趣</View>
        }
        <View className='base-infos'>
          <View className='avatar-wrapper'>
            <View className='avatar'></View>
          </View>
          <View className='infos'>
            <View className='title'>
              <View className='txt'>
                {
                  this.state.title.map(t => {
                    return (
                      t.type === 'view' ?
                        <View className='matched-txt' key={t.id}>{t.value}</View> :
                        <Text key={t.id}>{t.value}</Text>
                    )
                  })
                }
              </View>
              <View className='btn'>加入</View>
            </View>
            <Text className='subtitle'>简介: 济阳三村幼儿园地址位于上海市浦东区耀华路550, 是一所公办幼儿园这是一条比较长的文案. 测试能不能正常截断</Text>
          </View>
        </View>
        <View className='numbers'>
          <View className='num'>关注: 2001</View>
          <View className='num'>帖子: 12535</View>
          <View className='num'>问答: 123</View>
        </View>
      </View>
    )
  }
}