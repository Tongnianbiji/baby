import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './styles.scss'

export default class SchoolItem extends Taro.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className='ui-school-item'>
        <View className='title'>
          <View className='avatar'></View>
          <View className='title'>浏阳三村幼儿园</View>
        </View>
        <View className='sub-title'>简介: 济阳三村幼儿园地址位于上海市浦东区耀华路550, 是一所公办幼儿园这是一条比较长的文案. 测试能不能正常截断</View>
        <View className='numbers'>
          <View className='num'>关注: 2001</View>
          <View className='num'>帖子: 12535</View>
          <View className='num'>问答: 123</View>
        </View>
      </View>
    )
  }
}
