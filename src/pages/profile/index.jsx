import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileIndex extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '我的',
  }

  render() {
    return (
      <View className='profile-viewport'>
        <View className='profile-top'>
          <View className='top-wrapper'>
            <View className='left-container'>
              <View className='avatar'></View>
              <View className='heart'></View>
              <View className='avatar'></View>
            </View>
            <View className='right-container' onClick={this.onClickForNavToPersonal.bind(this)}>
              <View className='right-txt'>个人主页</View>
              <View className='right-icon'></View>
            </View>
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
              <View className='number-value'>200</View>
              <View className='number-title'>收赞/获赞</View>
            </View>
          </View>
        </View>
        <View className='profile-body'>
          <View className='entry-wrapper'>
            <View className='entry'>
              <Image className='entry-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-favorite.png' />
              <View className='entry-txt'>收藏点赞</View>
            </View>
            <View className='entry'>
              <Image className='entry-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-posts.png' />
              <View className='entry-txt'>我的帖子</View>
            </View>
            <View className='entry'>
              <Image className='entry-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-question.png' />
              <View className='entry-txt'>我的提问</View>
            </View>
            <View className='entry'>
              <Image className='entry-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-home.png' />
              <View className='entry-txt'>我的家</View>
            </View>
          </View>

          <View className='other-wrapper'>
            <View className='other'>
              <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-baby.png' />
              <View className='other-txt'>宝宝信息</View>
            </View>
            <View className='other'>
              <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-share.png' />
              <View className='other-txt'>分享</View>
            </View>
            <View className='other'>
              <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-setting.png' />
              <View className='other-txt'>设置</View>
            </View>
            <View className='other'>
              <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-about.png' />
              <View className='other-txt'>关于我们</View>
            </View>
            <View className='other'>
              <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-contact.png' />
              <View className='other-txt'>联系我们</View>
            </View>
          </View>
        </View>


      </View>
    )
  }
}
