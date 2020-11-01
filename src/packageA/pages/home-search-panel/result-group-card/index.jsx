import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { SearchResultType } from '../../../../common/enums'
import { ICONS } from '../../../../common/constant'
import FormaDate from '@common/formaDate'
import './styles.scss'
import model from '../../characterC/model'

const typeMap = {
  [SearchResultType.ANSWER]: '问答',
  [SearchResultType.CIRCLE]: '圈子',
  [SearchResultType.POST]: '帖子',
  [SearchResultType.ESSENCE]: '精华'
}

export default class SearchResultGroupCard extends Component {
  static defaultProps = {
    type: SearchResultType.CIRCLE,
    kw: '浏阳',
    model: {}
  }

  constructor(props) {
    super(props)
  }

  datas = {
  }

  onMore = () => {
    this.props.onMore(this.props.type)
  }

  goCircleDetail = (cid) => {
    if(!cid){
      cid='10397889'
    }
    Taro.navigateTo({
      url: `/packageA/pages/circle-detail/index?cid=${cid}`
    })
  }

  getNickNameColor = (sex) => {
    if (sex === 'MALE') {
      return '#027AFF'
    } else {
      return '#FF1493'
    }
  }
  viewProfileInfo = (uid,e)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url:`/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

  cardClick = (model,e) => {
    e.stopPropagation();
    if(model.pid){
      Taro.navigateTo({
        url:`/packageB/pages/post-detail/index?pid=${model.pid}`
      })
    }
    else if(model.qid){
      Taro.navigateTo({
        url:`/packageB/pages/issue-detail/index?qid=${model.qid}`
      })
    }
  }

  renderCircle() {
    const { model } = this.props;
    return (
      <View>
        {
          model && !!model.length &&
          model.slice(0, 2).map(item => {
            return (
              <View className='circle-part-wrapper' onClick={this.goCircleDetail.bind(this, item.cid)}>
                <View className='main-infos'>
                  <View className='avatar-wrapper'>
                    <View className='avatar'>
                      <Image src={item.imgUrl}></Image>
                    </View>
                  </View>
                  <View className='infos'>
                    <View className='title'>
                      <View className='txt'>{item.name}</View>
                      <View className={`btn-join ${item.isSubscribe ? 'btn-join-attentioned' : ''}`}>{item.isSubscribe ? '已加入' : '加入'}</View>
                    </View>
                    <View className='sub-title'>
                      简介：{item.description}
                    </View>
                  </View>
                </View>
                <View className='numbers'>
                  <View className='num'>关注: {item.subscribe}</View>
                  <View className='num'>帖子: {item.posts}</View>
                  <View className='num'>问答: {item.questions}</View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  renderAnswer() {
    const { model } = this.props;
    return (
      <View>
        {
          model && !!model.length &&
          model.slice(0, 2).map(item => {
            return (
              <View className='anwser-part-wrapper' onClick={this.cardClick.bind(this,item)}>
                <View className='user-info'>
                  <View className='avatar' onClick={this.viewProfileInfo.bind(this,item.uid)}>
                    <Image src={item.userSnapshot && item.userSnapshot.headImg || '#'}></Image>
                  </View>
                  <View className='infos'>
                    <View className='name-area'>
                      <Text className='name' style={{ color: this.getNickNameColor(item.userSnapshot && item.userSnapshot.sex || 'FEMALE') }}>{item.userSnapshot && item.userSnapshot.nickName}</Text>
                      <Image className='sex' src={(item.userSnapshot && item.userSnapshot.sex) ? item.userSnapshot.sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON : ICONS.FEMALE_ICON}></Image>
                      {
                        item.userSnapshot && item.userSnapshot.customLevel && item.userSnapshot.customLevel.length ?
                          item.userSnapshot.customLevel.map((items) => {
                            return <View className='years-old'>{items.desc}</View>
                          })
                          : null
                      }
                    </View>
                    <Text className='times'>{item.createTime && FormaDate(item.createTime)}</Text>
                  </View>
                </View>
                <View className='content-wrapper answer-wrapper'>
                  <View className='answer'>
                    <View className='icon'>问</View>
                    <View className='txt'>{item.title}</View>
                  </View>
                  {
                    item.content &&
                    <View className='answer'>
                      <View className='icon'>答</View>
                      <View className='txt'>{item.content}</View>
                    </View>
                  }

                </View>
                <View className='tags'>
                  <View className='community-area' onClick={this.goCircleDetail.bind(this,item.cid)}>
                    <Text className='community-name'>{(item && item.cName && `${item.cName}`) || '备孕交流'}</Text>
                  </View>
                  <View className='tips'>
                    <View className='views'>
                      <Image className='img' src={ICONS.PREVIEW} />
                      <Text>12</Text>
                    </View>
                    <View className='comment'>
                      <Image className='img' src={ICONS.COMMENT} />
                      <Text>12</Text>
                    </View>
                    <View className='favorite'>
                      <Image className='img' src={ICONS.FAVORITE} />
                      <Text>12</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  renderPost() {
    const { model } = this.props;
    return (
      <View>
        {
          model && !!model.length &&
          model.slice(0, 2).map(item => {
            return (
              <View className='post-part-wrapper' onClick={this.cardClick.bind(this,item)}>
                <View className='user-info'>
                  <View className='avatar' onClick={this.viewProfileInfo.bind(this,item.uid)}>
                    <Image src={item.userSnapshot && item.userSnapshot.headImg || '#'}></Image>
                  </View>
                  <View className='infos'>
                    <View className='name-area'>
                      <Text className='name' style={{ color: this.getNickNameColor(item.userSnapshot && item.userSnapshot.sex || 'FEMALE') }}>{item.userSnapshot && item.userSnapshot.nickName}</Text>
                      <Image className='sex' src={(item.userSnapshot && item.userSnapshot.sex) ? item.userSnapshot.sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON : ICONS.FEMALE_ICON}></Image>
                      {
                        item.userSnapshot && item.userSnapshot.customLevel && item.userSnapshot.customLevel.length ?
                          item.userSnapshot.customLevel.map((items) => {
                            return <View className='years-old'>{items.desc}</View>
                          })
                          : null
                      }
                    </View>
                    <Text className='times'>{item.createTime && FormaDate(item.createTime)}</Text>
                  </View>
                </View>
                    <Text className='content-wrapper'>{item.title}</Text>
                <View className='tags'>
                  <View className='community-area' onClick={this.goCircleDetail.bind(this,item.cid)}>
                    <Text className='community-name'>{(item && item.cName && `${item.cName}`) || '备孕交流'}</Text>
                  </View>
                  <View className='tips'>
                    <View className='views'>
                      <Image className='img' src={ICONS.PREVIEW} />
                      <Text>12</Text>
                    </View>
                    <View className='comment'>
                      <Image className='img' src={ICONS.COMMENT} />
                      <Text>12</Text>
                    </View>
                    <View className='favorite'>
                      <Image className='img' src={ICONS.FAVORITE} />
                      <Text>12</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  render() {
    const { model } = this.props;
    return (
      <View>
        {
          model && !!model.length &&
          <View className='ui-search-result-group-card'>
            <View className='title-bar'>
              <View className='title'>
                <View className='kw'>{this.props.kw}</View> - {typeMap[this.props.type]}搜索
            </View>
              <View className='btn-more' onClick={this.onMore}>
                更多
              <Image src={ICONS.ARROW_RIGHT_C} className='more-icon' />
              </View>
            </View>
            {
              this.props.type === SearchResultType.ANSWER ?
                this.renderAnswer() :
                this.props.type === SearchResultType.CIRCLE ?
                  this.renderCircle() :
                  this.renderPost()
            }
          </View>
        }
      </View>

    )
  }
}