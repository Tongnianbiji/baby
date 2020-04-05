import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import {ICONS} from '../../common/constant'
import Presenter from './presenter'
import './index.scss'

export default class Index extends Presenter {

  config = {
    navigationBarTitleText: '消息'
  }

  render() {
    return (
      <View className='message-viewport'>
        <AtTabs tabList={this.state.tabList} current={0} className='tabs'>
          <AtTabsPane className='message-tabs-pane' index={0} >
            <View className='entry-wrapper'>
              <View className='entry'>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-fans.png' className='icon' />
                <Text className='txt'>粉丝</Text>
              </View>
              <View className='entry'>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-like.png' className='icon' />
                <Text className='txt'>收藏/获赞</Text>
              </View>
              <View className='entry'>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-posts.png' className='icon' />
                <Text className='txt'>回贴</Text>
              </View>
              <View className='entry'>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/m-quesion.png' className='icon' />
                <Text className='txt'>回答</Text>
              </View>
            </View>
            <View className='message-list'>
              <View className='message-card'>
                <View className='icon-wrapper'>
                  <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/messages.png' className='icon' />
                </View>
                <View className='infos'>
                  <Text className='title'>系统消息</Text>
                  <Text className='sub-title'>恭喜你完成了一篇记录与分享, 恭喜你完成了一篇记录与分享</Text>
                  <Image src={ICONS.ARROW_RIGHT_C} className='btn-more' />
                </View>
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
