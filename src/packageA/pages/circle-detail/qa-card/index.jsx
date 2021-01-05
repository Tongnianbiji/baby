import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import analysisHelper from '@helper/analysisHelper';
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
    analysisHelper.singleExposure({
      trackName: '问答卡片点击',
      contentIdList: [qid.toString()],
      contentType: 3,
      eventType: 2
    });
  }

  handleFavorite = (model,e)=>{
    e.stopPropagation();
    this.props.onHandleFavorite(model)
  }

  share = (e)=>{
    e.stopPropagation()
  }
  getMapContent(content) {
    content = content || '';
    const p = /_\#\#_(.*?)_\#\#_/g;
    const nodeList = [];
    content.split(/_\#\#_.*?_\#\#_/).forEach(item => {
      if (!!item) {
        nodeList.push({
          value: item,
          type: 'text',
        })
      }
      const pExecRes = p.exec(content);
      if (pExecRes) {
        nodeList.push({
          value: JSON.parse(pExecRes[1]).name,
          cid: JSON.parse(pExecRes[1]).cid,
          type: 'circle',
        })
      }
    });
    console.log(444, nodeList)
    return nodeList;
  }


  render() {
    const { title, views, replys, markes,qid,answer } = this.props.model;
    const {model} = this.props;
    return (
      <View className='qa-card-view' onClick={this.cardClick.bind(this,qid)}>
        
        <View className='questions'>
          <View className='icon'>问</View>
          <View className='txt'>{
            this.getMapContent(title).map(item => (
              item.type == 'circle' ? <Text className='item-circle'>{item.value}</Text> : <Text className='item-text'>{item.value}</Text>
            ))}</View>
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