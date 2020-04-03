import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { ICONS } from '../../../common/constant'
import './user-info-item.scss'

export default class UserInfoItem extends Taro.Component {
  static defaultProps = {
    needShared: false,
    needDistance: false
  }

  data = {
    
  }
  
  render() {
    return (
      <View className='ui-user-info-item'>
        <View className='release-info'>
          <Text className='release'>李庭语妈妈发布了贴子 | 2小时前</Text>
          <View className='info'>
            {
              this.props.needDistance && <View className='distance-info'>0.9km</View>
            }
            {
              this.props.needShared && <Image className='btn-share' src={ICONS.SHARE_BTN_GRAY} alt=''></Image>
            }
          </View>
        </View>
        <View className='user-info'>
          <View className='avatar'></View>
          <View className='infos'>
            <View className='name-area'>
              <Text className='name'>李庭语妈妈</Text>
              <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
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
              <Image className='img' src={ICONS.PREVIEW} />
              <Text>12</Text>
            </View>
            <View className='comment'>
              <Image className='img' src={ICONS.COMMENT} />
              <Text>12</Text>
            </View>
            <View className='favorite'>
              <Image className='img' src={ICONS.FAVORITE} />
              <Text>12</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}