import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import './styles.scss'

export default class CircleDetailView extends Presenter {
  config = {
    navigationBarTitleText: '圈子'
  }

  render() {
    return (
      <View className='circle-detail-viewport'>1</View>
    )
  }
}