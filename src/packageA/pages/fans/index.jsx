import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class FansView extends Presenter {
  config = {
    navigationBarTitleText: '粉丝'
  }

  render() {
    return (
      <View className='fans-vewport'>
        {
          [{ name: '张三', attention: false }, { name: '李四', attention: true }, { name: '王二麻子', attention: false }].map(n => {
            return (
              <View key={n.name} className='fans-card'>
                <View className='avatar-wrapper'>
                  <View className='avatar'></View>
                </View>
                <View className='contents'>
                  <View className='title'>{n.name}</View>
                  <View className='msg'>01/24 关注了你</View>
                </View>
                <View className={`btn-attention${n.attention ? ' attentioned' : ''}`}>{n.attention ? '已关注' : '关注'}</View>
              </View>
            )
          })
        }
      </View>
    )
  }
}