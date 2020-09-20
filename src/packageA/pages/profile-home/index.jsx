import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import UserInfoItem from '../../../common/components/post-card'
import './index.scss'

export default class ProfileHome extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#494949',
    "navigationBarTextStyle": "white"
  }

  render() {
    const { tabs, tabsCurrent } = this.state;
    return (
      <View className='profile-home-viewport'>
        <View className='profile-header'>
          <View className='top-wrapper'>
            <View className='left-container'>
              <View className='avatar'></View>
              <View className='heart'></View>
              <View className='avatar'></View>
            </View>
            <View className='right-container'>
              <View className='ops focus'>关注</View>
              <View className='ops msg'>私信</View>
              <View className='more-item' />
              <View className='more-item' />
              <View className='more-item' />
            </View>
          </View>
          <View className='member-wrapper'>
            <View className='nick'>小红妈妈</View>
            {
              true
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
            <View className='label'>上海浦东</View>
            <View className='label'>大宝 5岁10个月</View>
            <View className='label'>小宝 两岁1个月</View>
          </View>
          <View className='signature-wrapper'>
            家有两只可爱吞金兽
          </View>
          <View className='number-wrapper'>
            <View className='number'>
              <View className='number-value'>42</View>
              <View className='number-title'>粉丝</View>
            </View>
            <View className='number'>
              <View className='number-value'>20</View>
              <View className='number-title'>圈子</View>
            </View>
            <View className='number'>
              <View className='number-value'>73</View>
              <View className='number-title'>关注</View>
            </View>
            <View className='number'>
              <View className='number-value'>200/50</View>
              <View className='number-title'>收赞/获赞</View>
            </View>
          </View>
        </View>
        <View className='profile-body'>

          <View className='tabs-container'>
            <AtTabs className='tabs' current={tabsCurrent} tabList={tabs} swipeable={false} onClick={this.onClickForTabs.bind(this)}>

              <AtTabsPane current={tabsCurrent} index={0}>
                <View className='new-info'>
                  共3条内容
                </View>
                <View>
                  {
                    [1, 2, 3].map(key => {
                      return (
                        <UserInfoItem key={key} />
                      )
                    })
                  }
                </View>
              </AtTabsPane>
              <AtTabsPane current={tabsCurrent} index={1}>
                <View className='new-info'>
                  共5条内容
                </View>
                <View>
                  {
                    [1, 2, 3, 4, 5].map(key => {
                      return (
                        <UserInfoItem key={key} />
                      )
                    })
                  }
                </View>
              </AtTabsPane>
              <AtTabsPane current={tabsCurrent} index={2}>
                <View className='new-info'>
                  共2条内容
                </View>
                <View>
                  {
                    [1, 2].map(key => {
                      return (
                        <UserInfoItem key={key} />
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
