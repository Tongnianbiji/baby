import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import Preloading from '@components/preloading'
import BehaviorCard from '@components/behavior-card'
import UserInfoItem from '../../../common/components/post-card'
import { ICONS } from '@common/constant'
import './index.scss'

export default class ProfileHome extends Presenter {
  render() {
    const { tabs,
      tabsCurrent,
      isMySelf,
      userInfo: { nickName, headImg, sex, district, child, signature, flow, funs, circle, marked, stared, subscr, userId, theme },
      activeData,
      postData,
      questionData,
      showActiveLoading,
      showPostLoading,
      showQuestionLoading,
      isActiveToBottom,
      isPostToBottom,
      isQuestionToBottom,
      activeDataTotal,
      postDataTotal,
      questionDataTotal,
    } = this.state;
    let isChildThanTwo = false;
    let childs = [];
    for (let a in child) {
      childs.push(child[a])
    }
    //(childs.length > 2) && (isChildThanTwo = true,childs = childs.slice(0,2))
    return (
      <View className='profile-home-viewport'>
        {
          nickName &&
          <View className='profile-header' style={{ backgroundImage: `url(${theme})` }}>
            <View className='top-wrapper'>
              <View className='left-container'>
                <View className='avatar' onClick={this.viewProfileInfo.bind(this, userId)}>
                  <Image src={headImg}></Image>
                </View>
              </View>
              {
                isMySelf ?
                  <View className='right-container'>
                    <View className='ops' style={{ width: 'auto' }} onClick={this.editProfile.bind(this)}>编辑资料</View>
                  </View>
                  :
                  <View>
                    <View className='right-container'>
                      <View onClick={this.onSubscr.bind(this)}>
                        {
                          subscr ? <View className='ops focus' style="opacity:.5">已关注</View> : <View className='ops focus'>关注</View>
                        }
                      </View>

                      <View className='ops msg' onClick={this.goToIM.bind(this)}>私信</View>
                      <View className='more' onClick={this.setProfile.bind(this)}>
                        更多
                    <Image src={ICONS.ARROW_RIGHT_C}></Image>
                      </View>
                    </View>
                  </View>
              }

            </View>
            <View className='member-wrapper'>
              <View style={{ color: this.getNickNameColor(sex || 'MALE') }} className='nick'>{nickName}</View>
              {
                sex === 'FEMALE'
                  ? <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/female.png' className='gender' />
                  : <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/male.png' className='gender' />
              }
              {/* <View className='family'>3位家庭成员</View>
            <View className='member-container'>
              <View className='member'>
                <View className='member-avatar'></View>
                <View className='member-named'>妈妈</View>
              </View>
              <View className='member'>
                <View className='member-avatar'></View>
                <View className='member-named'>爸爸</View>
              </View>
              <View className='member'>
                <View className='member-avatar'></View>
                <View className='member-named'>爷爷</View>
              </View>
            </View> */}
            </View>
            <View className='label-wrapper'>
              {
                district &&
                <View className='label'>{district}</View>
              }

              {
                childs.map(item => {
                  return (
                    <View className='label'>{item}</View>
                  )
                })
              }
              {/* {
              isChildThanTwo && 
              <View className='more' onClick={this.viewMoreChild.bind(this)}>
                更多
                <Image src={ICONS.ARROW_RIGHT_C}></Image>
              </View>
              
            } */}
            </View>
            <View className='signature-wrapper'>
              {signature}
            </View>
            <View className='number-wrapper'>
              <View className='number' onClick={this.onClickNavTo.bind(this, 'fans')}>
                <View className='number-value'>{funs}</View>
                <View className='number-title'>粉丝</View>
              </View>
              <View className='number' onClick={this.onClickNavTo.bind(this, 'circle')}>
                <View className='number-value'>{circle}</View>
                <View className='number-title'>圈子</View>
              </View>
              <View className='number' onClick={this.onClickNavTo.bind(this, 'focus')}>
                <View className='number-value'>{flow}</View>
                <View className='number-title'>关注</View>
              </View>
              <View className='number'>
                <View className='number-value'>{marked}/{stared}</View>
                <View className='number-title'>收赞/获赞</View>
              </View>
            </View>
          </View>
        }

        <View className='profile-body'>

          <View className='tabs-container'>
            <AtTabs className='tabs' current={tabsCurrent} tabList={tabs} swipeable={false} onClick={this.onClickForTabs.bind(this)}>

              <AtTabsPane current={tabsCurrent} index={0}>
                {
                  !!activeDataTotal &&
                  <View className='new-info'>
                    共{activeDataTotal}条内容
                  </View>
                }
                <View>
                  {
                    activeData.map((item, index) => {
                      // return (
                      //   <UserInfoItem key={index} model={item.entity} activeModel={item} onHandleFavorite={this.handleFavoriteActive.bind(this)} needShared/>
                      // )
                      return (
                        <BehaviorCard key={index} data={item} onHandleFavorite={this.handleFavoriteActive.bind(this,item)} onHandleSubscr={this.handleSubscrCircleActive.bind(this,item)}></BehaviorCard>
                      )
                    })
                  }
                  <Preloading showLoading={showActiveLoading} isToBottom={isActiveToBottom}></Preloading>
                </View>
              </AtTabsPane>
              <AtTabsPane current={tabsCurrent} index={1}>
                {
                  !!postDataTotal &&
                  <View className='new-info'>
                    共{postDataTotal}条内容
                  </View>
                }
                <View>
                  {
                    postData.map((item, index) => {
                      return (
                        <UserInfoItem key={index} model={item} onHandleFavorite={this.handleFavoritePost.bind(this)}/>
                      )
                    })

                  }
                  <Preloading showLoading={showPostLoading} isToBottom={isPostToBottom}></Preloading>
                </View>
              </AtTabsPane>
              <AtTabsPane current={tabsCurrent} index={2}>
                {
                  !!questionDataTotal &&
                  <View className='new-info'>
                    共{questionDataTotal}条内容
                  </View>
                }
                <View>
                  {
                    questionData.map((item, index) => {
                      return (
                        <UserInfoItem key={index} model={item} onHandleFavorite={this.handleFavoriteQuestion.bind(this)}/>
                      )
                    })
                  }
                  <Preloading showLoading={showQuestionLoading} isToBottom={isQuestionToBottom}></Preloading>
                </View>
              </AtTabsPane>
            </AtTabs>
          </View>
        </View>
      </View>
    )
  }
}
