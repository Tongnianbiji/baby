import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class Profile extends Presenter {
  config = {
    navigationBarTitleText: '我的',
  }

  render() {
    const { profileInfo } = this.state;
    const ICON_ARROW = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png';
    return (
      <View className='profile-viewport'>
        <View className='profile-top'>
          <View className='top-wrapper'>
            <View className='left-container'>
              <View >
                <Image className='avatar' src={profileInfo.headImg} />
              </View>
            </View>
            <View className='right-container' onClick={this.onClickNavTo.bind(this, 'profile-home')}>
              <View className='right-txt'>个人主页</View>
              <View className='right-icon'></View>
            </View>
          </View>
          <View className='number-wrapper'>
            <View className='number' onClick={this.onClickNavTo.bind(this, 'fans')}>
              <View className='number-value'>{profileInfo.funs || 0}</View>
              <View className='number-title'>粉丝</View>
            </View>
            <View className='number' onClick={this.onClickNavTo.bind(this, 'circle')}>
              <View className='number-value'>{profileInfo.circle || 0}</View>
              <View className='number-title'>圈子</View>
            </View>
            <View className='number' onClick={this.onClickNavTo.bind(this, 'focus')}>
              <View className='number-value'>{profileInfo.flow || 0}</View>
              <View className='number-title'>关注</View>
            </View>
            <View className='number'>
              <View className='number-value'>{`${profileInfo.marked || 0}/${profileInfo.stared || 0}`}</View>
              <View className='number-title'>收赞/获赞</View>
            </View>
          </View>
        </View>
        <View className='profile-body'>
          <View className='entry-wrapper'>
            <View className='entry' onClick={this.onClickNavTo.bind(this, 'collects')}>
              <Image className='entry-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-favorite.png' />
              <View className='entry-txt'>收藏点赞</View>
            </View>
            <View className='entry' onClick={this.onClickNavTo.bind(this, 'mypost')}>
              <Image className='entry-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-posts.png' />
              <View className='entry-txt'>我的帖子</View>
            </View>
            <View className='entry' onClick={this.onClickNavTo.bind(this, 'question')}>
              <Image className='entry-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-question.png' />
              <View className='entry-txt'>我的提问</View>
            </View>
            <View className='entry' onClick={this.onClickNavTo.bind(this, 'family')}>
              <Image className='entry-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-home.png' />
              <View className='entry-txt'>我的家</View>
            </View>
          </View>

          <View className='other-wrapper'>
            <View className='other' onClick={this.onClickNavTo.bind(this, 'baby')}>
              <View className='other-left'>
                <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-baby.png' />
                <View className='other-txt'>宝宝信息</View>
              </View>
              <Image className='other-right' src={ICON_ARROW} />
            </View>
            <View className='other' onClick={this.onClickNavTo.bind(this, 'share')}>
              <View className='other-left'>
                <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-share.png' />
                <View className='other-txt'>分享</View>
              </View>
              <Image className='other-right' src={ICON_ARROW} />
            </View>
            <View className='other' onClick={this.onClickNavTo.bind(this, 'setting')}>
              <View className='other-left'>
                <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-setting.png' />
                <View className='other-txt'>设置</View>
              </View>
              <Image className='other-right' src={ICON_ARROW} />
            </View>
            <View className='other' onClick={this.onClickNavTo.bind(this, 'about')}>
              <View className='other-left'>
                <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-about.png' />
                <View className='other-txt'>关于我们</View>
              </View>
              <Image className='other-right' src={ICON_ARROW} />
            </View>
            <View className='other' onClick={this.onClickNavTo.bind(this, 'contact')}>
              <View className='other-left'>
                <Image className='other-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-contact.png' />
                <View className='other-txt'>联系我们</View>
              </View>
              <Image className='other-right' src={ICON_ARROW} />
            </View>
          </View>
        </View>


      </View>
    )
  }
}
