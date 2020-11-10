import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { ICONS } from '../../../../common/constant'
import './index.scss'

export default class QACardView extends Component {

  static defaultProps = {
    model: {},
    onHandleFavorite:()=>{}
  }
  constructor(props) {
    super(props)
  }

  cardClick = (qid)=>{
    Taro.navigateTo({
      url:`/packageB/pages/issue-detail/index?qid=${qid}`
    })
  }

  handleFavorite = (model,e)=>{
    e.stopPropagation();
    this.props.onHandleFavorite(model)
  }

  share = (e)=>{
    e.stopPropagation()
  }

  render() {
    const { title, views, replys, markes,qid,answer } = this.props.model;
    const {model} = this.props;
    return (
      <View className='qa-card-view' onClick={this.cardClick.bind(this,qid)}>
        
        <View className='questions'>
          <View className='icon'>问</View>
          <View className='txt'>{title}</View>
          <Button className='share-btn' open-type="share" id={JSON.stringify(model)} onClick={this.share.bind(this)}>
            <Image src={ICONS.SHARE_BTN_GRAY} alt='' className='share-icon' />
          </Button>
        </View>

       
          { answer && 
            <View className='anwser'>
              <View className='icon'>答</View>
              <View className='txt' style="width:300px">{answer}</View>
            </View>
          }
        

        <View className='tips'>
          <View className='views'>
            <Image className='img' src={ICONS.PREVIEW} />
            <Text>{views}</Text>
          </View>
          <View className='comment'>
            <Image className='img' src={ICONS.EDIT} />
            <Text>{replys}</Text>
          </View>
          <View className='favorite'>
            <Image className='img' src={model.isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE} onClick={this.handleFavorite.bind(this,model)}/>
            <Text>{markes}</Text>
          </View>
        </View>
      </View>
    )
  }
}