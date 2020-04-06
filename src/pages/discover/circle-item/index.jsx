import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './style.scss'

export default class CircleItem extends Taro.Component {
  static defaultProps = {
    
  }

  constructor(props) {
    super(props)
  }

  findMore = () => {
    Taro.navigateTo({ url: '/packageA/pages/more-circle/index' })
  }

  render() {
    return (
      <View className='comp-circle-item'>
        <View className='base-info'>
          <View className='avatar-wrapper'>
            <View className='avatar'></View>
          </View>
          <View className='infos'>
            <View className='title'>济阳 三村幼儿园</View>
            <View className='subtitle'>简介: 浏阳三村幼儿园地址位于上海市浦东新区的一个地方</View>
          </View>
        </View>
        <View className='numbers'>
          <View className='number'>关注: 2001</View>
          <View className='number'>帖子: 2001</View>
          <View className='number'>问答: 2001</View>
        </View>
        <View className='more' onClick={this.findMore}>发现更多&gt;</View>
      </View>
    )
  }
}