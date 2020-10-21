import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import UserInfoItem from '../../../common/components/post-card'
import { ICONS } from '@common/constant'
import './index.scss'

export default class ProfileHome extends Presenter {
  render() {
    const { tabs, tabsCurrent,isMySelf,userInfo:{nickName,headImg,sex,district,child,signature,flow,funs,circle,marked,stared,subscr}, activeData, postData, questionData } = this.state;
    let isChildThanTwo = false;
    let childs = [];
    for (let a in child){
      childs.push(child[a])
    }
    (childs.length > 2) && (isChildThanTwo = true,childs = childs.slice(0,2))
    return (
      <View className='profile-home-viewport'>
        <View className='profile-header'>
          <View className='top-wrapper'>
            <View className='left-container'>
              <View className='avatar'>
                <Image src={headImg}></Image>
              </View>
            </View>
            {
              isMySelf ? 
              <View className='right-container'>
                <View className='ops msg' onClick={this.editProfile.bind(this)}>编辑资料</View>
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
    <View className='nick'>{nickName}</View>
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
            <View className='label'>{district}</View>
            {
              childs.map(item=>{
                return(
                  <View className='label'>{item}</View>
                )
              })
            }
            {
              isChildThanTwo && 
              <View className='more' onClick={this.viewMoreChild.bind(this)}>
                更多
                <Image src={ICONS.ARROW_RIGHT_C}></Image>
              </View>
              
            }
          </View>
          <View className='signature-wrapper'>
            {signature}
          </View>
          <View className='number-wrapper'>
            <View className='number'>
              <View className='number-value'>{funs}</View>
              <View className='number-title'>粉丝</View>
            </View>
            <View className='number'>
          <View className='number-value'>{circle}</View>
              <View className='number-title'>圈子</View>
            </View>
            <View className='number'>
          <View className='number-value'>{flow}</View>
              <View className='number-title'>关注</View>
            </View>
            <View className='number'>
          <View className='number-value'>{marked}/{stared}</View>
              <View className='number-title'>收赞/获赞</View>
            </View>
          </View>
        </View>
        <View className='profile-body'>

          <View className='tabs-container'>
            <AtTabs className='tabs' current={tabsCurrent} tabList={tabs} swipeable={false} onClick={this.onClickForTabs.bind(this)}>

              <AtTabsPane current={tabsCurrent} index={0}>
                {
                  !!activeData.length && 
                  <View className='new-info'>
                    共{activeData.length}条内容
                  </View>
                }
                <View>
                  {
                    activeData.map((item,index) => {
                      return (
                        <UserInfoItem key={index} model={item}/>
                      )
                    })
                  }
                </View>
              </AtTabsPane>
              <AtTabsPane current={tabsCurrent} index={1}>
                {
                  !!postData.length && 
                  <View className='new-info'>
                    共{postData.length}条内容
                  </View>
                }
                <View>
                  {
                    postData.map((item,index) => {
                      return (
                        <UserInfoItem key={index} model={item}/>
                      )
                    })
                  }
                </View>
              </AtTabsPane>
              <AtTabsPane current={tabsCurrent} index={2}>
                {
                  !!questionData.length && 
                  <View className='new-info'>
                    共{questionData.length}条内容
                  </View>
                }
                <View>
                  {
                    questionData.map((item,index) => {
                      return (
                        <UserInfoItem key={index} model={item}/>
                      )
                    })
                  }
                </View>
              </AtTabsPane>
            </AtTabs>
          </View>

        </View>
      </View>
    )
  }
}
