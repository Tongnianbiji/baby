import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { ICONS } from '@common/constant'
import { observer, inject } from 'mobx-react'
import Model from '../../model'

import './index.scss'
@inject('postDetail')
@observer
export default class MainPanelComponent extends Component {
  static defaultProps = {
    info: {},
    onShare:()=>{}
  }

  share = (pid)=>{
    this.props.onShare(pid)
  }

  handleFavorite = async() => {
    const {updatePostFavoriteMarks, detailData} = this.props.postDetail;
    const { isMark, pid } = detailData;
    let params = {
      markes: 1,
      isMark:true
    }
    
    if (isMark) {
      params.markes = -1;
      params.isMark = false;
      const d = await Model.postMarkCancel(pid);
    } else {
      const d = await Model.postMark(pid);
    }
    Taro.vibrateShort();
    updatePostFavoriteMarks(params)
  }
  render() {
    const {
      imgprofile: avatar,
      pid,
      title,
      content,
      views = 0,
      replys = 0,
      markes = 0,
      isMark = false,
      createTime = '2020-03-29 21:29:00',
      
      userSnapshot: {
        city,
        country = '宝山',
        headImg = '',
        nickName = '昵称1',
        sex = 'MALE',
        customLevel : [{desc='3岁9个月'}]
      }
    } = this.props.postDetail.detailData
    return (
      <View className='main-panel-view'>
        <View className='user-info'>
          <View className='avatar'>
            {
              headImg ?
                <Image src={headImg} className='avatar-img' /> :
                null
            }
          </View>
          <View className='infos'>
            {
              <View className='name-area'>
                <Text className='name'>{nickName}</Text>
                <Image className='sex' src={sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON}></Image>
                <Text className='years-old'>{ city + ' ' + country}</Text>
                <Text className='years-old'>{desc}</Text>
                <Button className='btn-share' open-type='share' onClick={this.share.bind(this,pid)}>
                  <Image src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                </Button>
                
              </View>
            }
            <Text className='times'>{createTime}</Text>
          </View>
        </View>
        <View className='title'>{title}</View>
        <View className='content'>{content}</View>
        <View className='tags'>
          <View className='tips'>
            <View className='views'>
              <Image className='img' src={ICONS.PREVIEW} />
              <Text>{views}</Text>
            </View>
            <View className='comment'>
              <Image className='img' src={ICONS.COMMENT} />
              <Text>{replys}</Text>
            </View>
            <View className='favorite'>
              <Image className='img' onClick={this.handleFavorite} src={isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE} />
              <Text>{markes}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}