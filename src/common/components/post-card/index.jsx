import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import FormaDate from '@common/formaDate'
import { ICONS } from '../../constant'
import './styles.scss'


export default class UserInfoItem extends Component {
  static defaultProps = {
    // 数据
    model: {},
    // 是否显示 [分享] 按钮
    needShared: false,
    // 是否显示 [距离]
    needDistance: false,
    // 是否显示左下角 [圈子信息]
    countryAble: true,
    // 是否在头像左边显示 [排位]
    showOrder: false,
    // 最上面 预留的槽位
    preContent: null,
    // 是否关闭 发布信息 那一行
    closeRelease: false,
    // 是否为问答 卡
    isAnwser: false,
    // 是否只显示发布时间, 不显示发贴人信息
    onlyReleaseTime: false,
    // 是否为我的回复
    isMyReply:false,
    // 是否显示tools
    isShowTools:true,

    //排名临时
    sortNum:1,

    cardClick: () => { },
    onHandleFavorite: () => { }
  }

  cardClick = () => {
    this.props.onCardClick(this.model)
  }

  handleFavorite = (pid,e) => {
    e.stopPropagation()
    this.props.onHandleFavorite(pid)
  }

  render() {
    const { model,sortNum } = this.props;
    // const { userSnapshot:{customLevel, headImg, nickName, } } = model;
    return (
      <View className='ui-user-info-item'>
        {this.props.children}
        <View className='main-wrapper'>
          <View onClick={this.cardClick}>
            {
              !this.props.closeRelease &&
              <View className='release-info'>
                <Text className='release'>李庭语妈妈发布了贴子 | 2天前</Text>
                <View className='info'>
                  {
                    this.props.needDistance && <View className='distance-info'>0.9km</View>
                  }
                  {
                    this.props.needShared && <Image className='btn-share' src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                  }
                </View>
              </View>
            }
            {
              !this.props.onlyReleaseTime &&
              <View className='user-info'>
                {
                  this.props.showOrder &&
                  <View className='order'>
                    <Image className='icon-order' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/ranking.png' />
                    <Text>{sortNum}</Text>
                  </View>
                }
                <View className='avatar'>
                  <Image src={model.userSnapshot && model.userSnapshot.headImg || '#'}></Image>
                </View>
                <View className='infos'>
                  <View className='name-area'>
                    <View className='is-not-text'>
                      <View className='name'>{(model.userSnapshot && model.userSnapshot.nickName) || '李庭语妈妈'}</View>
                    </View>

                    <Image className='sex' src={(model.userSnapshot && model.userSnapshot.sex) ? model.userSnapshot.sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON : ICONS.FEMALE_ICON}></Image>
                    <View className='is-not-text'>
                      {
                        model.userSnapshot && model.userSnapshot.city ?
                          <View className='years-old'>{(model.userSnapshot && model.userSnapshot.city) + ' ' + (model.userSnapshot && model.userSnapshot.country)}</View>
                          : null
                      }
                    </View>
                    <View className='is-not-text'>
                      {
                        model.userSnapshot && model.userSnapshot.customLevel.length ?
                          model.userSnapshot.customLevel.map((item) => {
                            return <View className='years-old'>{item.desc}</View>
                          })
                          : null
                      }
                    </View>
                    {
                      this.props.closeRelease && this.props.needShared &&
                      <Image className='btn-share' src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                    }
                  </View>
                  <Text className='times'>{(model.createTime && FormaDate(model.createTime)) || (model.createAt && FormaDate(model.createAt)) || '2020-03-29 21:29:00'}</Text>
                </View>
              </View>
            }
            {
              this.props.onlyReleaseTime && <View className='release-time'>{(model.createTime && FormaDate(model.createTime)) || (model.createAt && FormaDate(model.createAt)) || '2020-03-29 21:29:00'}</View>
            }
            {
              this.props.isAnwser ?
                <View className='content answer-wrapper'>
                  <View className='answer'>
                    <View className='icon'>问</View>
                    <View className='txt'>济阳三村最近可以交娃的社保了吗？</View>
                  </View>
                  <View className='answer'>
                    <View className='icon'>答</View>
                    <View className='txt'>可以了，11月以后就可以交了</View>
                  </View>
                </View> : <Text className='content'>{model.title || '济阳三村幼儿园怎么样，算比较好的幼儿园吗?'}</Text>
            }
            {
              this.props.isMyReply && <View className='content'>原贴：{model.content || '济阳三村幼儿园怎么样，算比较好的幼儿园吗?'}</View>
            }
          </View>
          <View className='tags'>
            {
              this.props.countryAble &&
              <View className='community-area'>
                <Text className='community-name'>{(model && model.userSnapshot && model.userSnapshot.city  && `${model.userSnapshot.city} ${model.userSnapshot.country}`) || '上海 新城'}</Text>
              </View>
            }
            {
              this.props.isShowTools &&
              <View className='tips'>
                <View className='views'>
                  <Image className='img' src={ICONS.PREVIEW} />
                  <Text>{model.views || 0}</Text>
                </View>
                <View className='comment'>
                  <Image className='img' src={ICONS.COMMENT} />
                  <Text>{model.replys || 0}</Text>
                </View>
                <View className='favorite'>
                  <Image className='img' onClick={this.handleFavorite.bind(this,model.pid)} src={model.isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE} />
                  <Text>{model.markes || 0}</Text>
                </View>
              </View>
            }
            
          </View>
        </View>
      </View>
    )
  }
}