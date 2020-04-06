import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ICONS } from '../../../../common/constant'
import './styles.scss'

export default class DefaultPanel extends Taro.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className='comp-default-panel'>
        <View className='tags-panel'>
          <View className='tags-title'>
            <View className='title'>历史记录</View>
            <View className='btn'><Image src={ICONS.DELETE} className='delete-icon' /></View>
          </View>
          <View className='tags-list'>
            <View className='tag-item'>学校</View>
            <View className='tag-item'>医院</View>
            <View className='tag-item'>输导班</View>
            <View className='tag-item'>周末</View>
          </View>
        </View>
        <View className='tags-panel'>
          <View className='tags-title'>
            <View className='title'>附近热搜</View>
          </View>
          <View className='tags-list'>
            <View className='tag-item'>济阳三村幼儿园</View>
            <View className='tag-item'>济阳一材幼儿园</View>
            <View className='tag-item'>长青幼儿园</View>
          </View>
        </View>
        <View className='tags-panel'>
          <View className='tags-title'>
            <View className='title'>热门推荐</View>
          </View>
          <View className='tags-list'>
            <View className='tag-item'>2017-2019</View>
            <View className='tag-item'>宝宝双十一买什么</View>
            <View className='tag-item'>纸尿裤那些事儿</View>
          </View>
        </View>
      </View>
    )
  }
}