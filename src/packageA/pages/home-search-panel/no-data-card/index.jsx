import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import './styles.scss'

export default class NoDataShowCreate extends Taro.Component {
  render() {
    return (
      <View className='car-no-data'>
        <View className='no-data-content'>
          没有找到想要的圈子
          <View className='create-circle'>创建圈子</View>
        </View>
      </View>
    )
  }
}