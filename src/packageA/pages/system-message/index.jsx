import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class SystemMessageView extends Presenter {
  config = {
    navigationBarTitleText: '系统消息'
  }

  render() {
    return (
      <View className='sys-message-viewport'>
        <View className='container'>
          <View className='message-card'>
            <View className='icon-wrapper'>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/messages.png' className='icon' />
            </View>
            <View className='infos'>
              <View className='title'>
                <View className='txt'>系统消息</View>
                <View className='time'>5分钟前</View>
              </View>
              <View className='sub-title'>恭喜你完成了一篇记录与分享，发布优质内容可以获得更多的赞哦，更有机会获得达人特权！</View>
            </View>
          </View>
          <View className='message-card'>
            <View className='icon-wrapper'>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/messages.png' className='icon' />
            </View>
            <View className='infos'>
              <View className='title'>
                <View className='txt'>系统消息</View>
                <View className='time'>5分钟前</View>
              </View>
              <View className='sub-title'>恭喜你完成了一篇记录与分享，发布优质内容可以获得更多的赞哦，更有机会获得达人特权！</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}