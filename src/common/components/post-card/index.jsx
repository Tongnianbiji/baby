import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import FormaDate from '@common/formaDate'
import { ICONS } from '../../constant'
import Behaviors from '@common/utils/behaviors'
import staticData from '@src/store/common/static-data'
import './styles.scss'


export default class UserInfoItem extends Component {
  static defaultProps = {
    // 数据
    model: {},
    activeModel: {},
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
    isMyReply: false,
    // 是否显示tools
    isShowTools: true,
    //是否需要点赞
    needLike: false,

    //排名临时
    sortNum: 1,
    kw: '',

    cardClick: () => { },
    onHandleFavorite: () => { },
    onHandleLike: () => { },
    onShare: () => { }
  }

  highLight = (originTxt, kw) => {
    if (!kw) {
      kw = '济阳'
    }
    if (!originTxt) {
      originTxt = '济阳'
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

    console.log(333, newList)
    return newList;
  }

  cardClick = (model, e) => {
    e.stopPropagation();
    if (model.pid) {
      Taro.navigateTo({
        url: `/packageB/pages/post-detail/index?pid=${model.pid}`
      })
      getApp().sensors.track('click', {
        contentIdList: [model.pid.toString()],
        contentType: 1,
        eventType:2
      });
    }
    else if (model.qid) {
      Taro.navigateTo({
        url: `/packageB/pages/issue-detail/index?qid=${model.qid}`
      })
      getApp().sensors.track('click', {
        contentIdList: [model.qid.toString()],
        contentType: 3,
        eventType:2
      });
    }
    else if (model.entity) {
      let { pid, qid } = model.entity;
      if (pid) {
        Taro.navigateTo({
          url: `/packageB/pages/post-detail/index?pid=${pid}`
        })
        getApp().sensors.track('click', {
          contentIdList: [pid.toString()],
          contentType: 1,
          eventType:2
        });
      }
      else if (qid) {
        Taro.navigateTo({
          url: `/packageB/pages/issue-detail/index?qid=${qid}`
        })
        getApp().sensors.track('click', {
          contentIdList: [qid.toString()],
          contentType: 3,
          eventType:2
        });
      }
    }
  }

  handleFavorite = (model, e) => {
    const {isLogin} = staticData;
    e.stopPropagation();
    if(isLogin){
      this.props.onHandleFavorite(model)
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  handleLike = (model, e) => {
    const {isLogin} = staticData;
    e.stopPropagation();
    if(isLogin){
      this.props.onHandleLike(model)
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  getNickNameColor = (sex) => {
    if (sex === 'MALE') {
      return '#027AFF'
    } else {
      return '#FF1493'
    }
  }

  viewProfileInfo = (uid, e) => {
    e.stopPropagation();
    Taro.navigateTo({
      url: `/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

  viewCircleDetail = cid => {
    if (!cid) {
      cid = '10397889'
    }
    Taro.navigateTo({
      url: `/packageA/pages/circle-detail/index?cid=${cid}`
    })
  }

  share = (e) => {
    e.stopPropagation();
    //this.props.onShare(model)
  }

  render() {
    let { model, sortNum, activeModel, closeRelease, kw } = this.props;
    if (!activeModel.entity) {
      closeRelease = true
    }
    // const { userSnapshot:{customLevel, headImg, nickName, } } = model;
    return (
      <View className='ui-user-info-item'>
        {this.props.children}
        <View className='main-wrapper'>
          <View onClick={this.cardClick.bind(this, model)}>
            {

              <View className='release-info'>
                {!closeRelease && 
                <View>
                  <View className='release'>{`${activeModel.userSnapshot ? activeModel.userSnapshot.nickName : ''}${activeModel.type ? Behaviors(activeModel.type) : ''} | ${activeModel.createAt ? FormaDate(activeModel.createAt) : ''}`}</View>
                </View>
                }
                <View className='info'>
                  {
                    this.props.needDistance && <View className='distance-info'>0.9km</View>
                  }
                  {
                    this.props.needShared &&
                    <View onClick={this.share.bind(this)}>
                      <Button className='btn-share' openType="share" id={JSON.stringify(model)}>
                        <Image src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                      </Button>
                    </View>
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
                    <View>{sortNum}</View>
                  </View>
                }
                <View className='avatar' onClick={this.viewProfileInfo.bind(this, model.uid)}>
                  <Image src={model.userSnapshot && model.userSnapshot.headImg || '#'}></Image>
                </View>
                <View className='infos'>
                  <View className='name-area'>
                    <View className='is-not-text'>
                      <View className='name' style={{ color: this.getNickNameColor(model.userSnapshot && model.userSnapshot.sex || 'FEMALE') }}>{(model.userSnapshot && model.userSnapshot.nickName) || '李庭语妈妈'}</View>
                    </View>

                    <Image className='sex' src={(model.userSnapshot && model.userSnapshot.sex) ? model.userSnapshot.sex === 'MALE' ? ICONS.MALE_ICON : ICONS.FEMALE_ICON : ICONS.FEMALE_ICON}></Image>
                    <View className='is-not-text'>
                      {
                        model.userSnapshot && model.userSnapshot.city ?
                          <View>
                            <View className='years-old'>{(model.userSnapshot && model.userSnapshot.city) + ' ' + (model.userSnapshot && model.userSnapshot.country)}</View>
                          </View>
                          : null
                      }
                    </View>
                    <View className='is-not-text'>
                      {
                        model.userSnapshot && model.userSnapshot.customLevel && model.userSnapshot.customLevel.length ?
                          model.userSnapshot.customLevel.map((item) => {
                            return(
                              <View>
                                <View className='babys'>{item.desc}</View>
                              </View>
                            )
                          })
                          : null
                      }
                    </View>
                    {/* {
                      this.props.closeRelease && this.props.needShared &&
                      <Image className='btn-share' src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
                    } */}
                  </View>
                  <View className='times'>{(activeModel.createAt && FormaDate(activeModel.createAt))||(model.createTime && FormaDate(model.createTime)) || (model.createAt && FormaDate(model.createAt)) || '2020-03-29 21:29:00'}</View>
                </View>
                {
                  this.props.needLike && <Image onClick={this.handleLike.bind(this, model)} className='btn-like' src={model.isLikes ? ICONS.FULLLIKE : ICONS.LIKE} alt=''></Image>
                }
              </View>
            }
            {
              this.props.onlyReleaseTime && <View className='release-time'>{(activeModel.createAt && FormaDate(activeModel.createAt))||(model.createTime && FormaDate(model.createTime)) || (model.createAt && FormaDate(model.createAt)) || '2020-03-29 21:29:00'}</View>
            }
            {
              this.props.isAnwser ?
                <View className='content answer-wrapper'>
                  <View className='answer'>
                    <View className='icon'>问</View>
                    <View className='content'>
                      {
                        this.highLight(model.title, kw).map(t => {
                          return (
                            <View className={t.type === 'view' ? 'matched-txt' : ''} key={t.id}>{t.value}</View> 
                          )
                        })
                      }
                    </View>
                  </View>
                  {
                    model.content &&
                    <View className='answer'>
                      <View className='icon'>答</View>
                      <View className='txt'>{model.content}</View>
                    </View>
                  }

                </View> :
                activeModel.content ? 
                <View>
                  <View className='content'>{activeModel.content}</View>
                </View>
                :
                model.title ?
                <View>
                  <View className='content'>
                    {
                      this.highLight(model.title, kw).map(t => {
                        return (
                          <View className={t.type === 'view' ? 'matched-txt' : ''} key={t.id}>{t.value}</View> 
                        )
                      })
                    }
                  </View>
                </View>
                  
                  :
                  <View>
                    <View className='content'>{model.content}</View>
                  </View>
            }
            {
              this.props.isMyReply && model.title && <View className='content' style="color:#666666;;">原贴：{model.title}</View>
            }
          </View>
          <View className='tags'>
            {
              this.props.countryAble &&
              <View className='community-area' onClick={this.viewCircleDetail.bind(this, model.cid)}>
                {/* <Text className='community-name'>{(model && model.userSnapshot && model.userSnapshot.city  && `${model.userSnapshot.city} ${model.userSnapshot.country}`) || '上海 新城'}</Text> */}
                <View className='community-name'>{(model && model.cName && `${model.cName}`) || '备孕交流'}</View>
              </View>
            }
            {
              this.props.isShowTools &&
              <View className='tips'>
                <View className='views'>
                  <Image className='img' src={ICONS.PREVIEW} />
                  <View>{model.views || 0}</View>
                </View>
                <View className='comment'>
                  <Image className='img' src={ICONS.COMMENT} />
                  <View>{model.replys || 0}</View>
                </View>
                <View className='favorite'>
                  <Image className='img' onClick={this.handleFavorite.bind(this, model)} src={model.isMark ? ICONS.ISFAVORITED : ICONS.FAVORITE} />
                  <View>{model.markes || 0}</View>
                </View>
              </View>
            }
          </View>
        </View>
      </View>
    )
  }
}