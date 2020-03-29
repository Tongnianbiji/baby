import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './user-info-item.scss'

export default class UserInfoItem extends Taro.Component {
  render() {
    return (
      <View className='ui-user-info-item'>
        <Text className='release-info'>李庭语妈妈发布了贴子 | 2小时前</Text>
        <View className='user-info'>
          <View className='avatar'></View>
          <View className='infos'>
            <View className='name-area'>
              <Text className='name'>李庭语妈妈</Text>
              <Image className='sex' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/female.png'></Image>
              <Text className='years-old'>3岁9个月</Text>
            </View>
            <Text className='times'>2020-03-29 21:29:00</Text>
          </View>
        </View>
        <Text className='content'>济阳三村幼儿园怎么样，算比较好的幼儿园吗？</Text>
        <View className='tags'>
          <View className='community-area'>
            <Text className='community-name'>上海 新城</Text>
          </View>
          <View className='tips'>
            <View className='views'>
              <Image className='img' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/preview.png' />
              <Text>12</Text>
            </View>
            <View className='comment'>
              <Image className='img' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/comment.png' />
              <Text>12</Text>
            </View>
            <View className='favorite'>
              <Image className='img' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/favorite.png' />
              <Text>12</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}