import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
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
    
  }

  highLight = (originTxt,kw)=>{
    if(!kw){
      kw='济阳'
    }
    const reg = new RegExp(kw, 'gi');
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
    return newList;
  }

  gotoCircleDetail = (data) => {
    const { cid, name } = data
    Taro.navigateTo({ url: `/packageA/pages/circle-detail/index?cid=${cid}&cname=${name}` })
  }

  findMore = ()=>{

  }

  render() {
    const {data,data:{cid,description,leaf,imgUrl,name,posts,questions,subscribe},kw} = this.props;
    let newTitle
    return (
      <View className='search-circle-item' onClick={this.gotoCircleDetail.bind(this,data)}>
        {
          this.props.recommand &&
          <View className='recommand-title'>可能感兴趣</View>
        }
        <View className='base-infos'>
          <View className='avatar-wrapper'>
            <View className='avatar'>
              <Image src={imgUrl || ''}></Image>
            </View>
          </View>
          <View className='infos'>
            <View className='title'>
              <View className='txt'>
                {
                  this.highLight(name,kw).map(t => {
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
              <Text className='subtitle'>简介: {description}</Text>
          </View>
        </View>
        <View className='numbers'>
              <View className='num'>关注: {subscribe}</View>
              <View className='num'>帖子: {posts}</View>
              <View className='num'>问答: {questions}</View>
        </View>
        {
          leaf && <View className='more' onClick={this.findMore.bind(this)}>发现更多&gt;</View>
        }
      </View>
    )
  }
}