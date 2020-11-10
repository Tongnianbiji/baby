import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import FormaDate from '@common/formaDate'
import Behaviors from '@common/utils/behaviors'
import './styles.scss'

export default class CircleItem extends Component {
  static defaultProps = {
    data: null,
    activeModel:{},
    isShowReleaseTime:false,
    // 是否在最上方显示 [可能感兴趣] 一栏
    recommand: false,
    isShowDistance:false,
    kw: '济阳',
    onHandleSubscr:()=>{}
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

  findMore = (e)=>{
    const { cid, name } = this.props.data;
    e.stopPropagation();
    Taro.navigateTo({ url: `/packageA/pages/more-circle/index?cid=${cid}&cname=${name}` })
  }

  handleSubscr = (model,e)=>{
    e.stopPropagation();
    this.props.onHandleSubscr(model)
  }

  render() {
    const {isShowDistance,data,data:{cid,uid,description,leaf,imgUrl,name,posts,questions,subscribe,isSubscribe},kw,activeModel,isShowReleaseTime} = this.props;
    return (
      <View className='search-circle-item' onClick={this.gotoCircleDetail.bind(this,data)}>
        {
          activeModel.userSnapshot && isShowReleaseTime && 
          <View className="behavior">{`${activeModel.userSnapshot && activeModel.userSnapshot.nickName}${Behaviors(activeModel.type)} | ${activeModel.updateAt && FormaDate(activeModel.updateAt)}`}</View>
        }
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
              {
                isShowDistance && 
              <View style="color:#999;font-size:13px;margin-right:5px;">{data.distance}</View>
              }
              <View onClick={this.handleSubscr.bind(this,data)} className={`btn ${isSubscribe? 'btn-attentioned' : ''}`}>{isSubscribe  ? '已加入' : '加入'}</View>
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
          !leaf && <View className='more' onClick={this.findMore.bind(this)}>发现更多&gt;</View>
        }
      </View>
    )
  }
}