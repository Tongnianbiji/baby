import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import Presenter from './presenter'
import { ICONS } from '../../../common/constant'
import SchoolItem from './school-item'
import './styles.scss'

export default class MoreCircleView extends Presenter {
  config = {
    navigationBarTitleText: '更多圈子'
  }

  render() {
    return (
      <View className='more-circle-viewport'>
        <View className='search-box'>
          <View className='inp-wrapper'>
            <Input className='search-inp' />
            <Image src={ICONS.SEARCH} className='search-icon' />
          </View>
        </View>
        <View className='list-wrapper'>
          <View className='tabs'>
            <View className='slider' style={this.state.sliderStyle}></View>
            <View className='tab-items'>
              <View className='tab-item' onClick={this.tabChange.bind(this, 1)}>推荐</View>
              <View className='tab-item' onClick={this.tabChange.bind(this, 2)}>距离</View>
              <View className='tab-item' onClick={this.tabChange.bind(this, 3)}>热度</View>
            </View>
          </View>
          {
            [1, 2, 3, 4, 5, 6, 8, 7].map(n => {
              return (
                <SchoolItem key={n} />
              )
            })
          }
        </View>
      </View>
    )
  }
}