import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { ICONS } from '@common/constant'

import './index.scss'

export default class CommentItemView extends Taro.Component {
  static defaultProps = {
    model: {}
  }

  render() {
    const { avatar, content = '我也不知道, 大家说要送吗' } = this.props.model
    return (
      <View className='comment-item-view'>
        <View className='user-info'>
          <View className='avatar'>
            {
              avatar ?
                <Image src={avatar} className='avatar-img' /> :
                null
            }
          </View>
          <View className='infos'>
            <View className='name-area'>
              <Text className='name'>李庭语妈妈</Text>
              <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
              <Text className='years-old'>3岁9个月</Text>
              <View className='like-btns'>
                <View className='btns-wrapper'>
                  <View className='like-btn'>
                    <Image src={ICONS.LIKE} className='like-btn-img' />
                    18
                  </View>
                  <View className='like-btn'>
                    <Image src={ICONS.DISLIKE} className='like-btn-img' />
                    18
                  </View>
                </View>
              </View>
            </View>
            <Text className='times'>贴主 2小时前</Text>
          </View>
        </View>
        <View className='answer'>
          <View className='icon'>答</View>
          <View className='txt'>{content}</View>
        </View>
      </View>
    )
  }
}