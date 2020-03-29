import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'
import iconSearch from '../../assets/img/icon-search.png'
import arrowDown from '../../assets/img/arrow-down.png'
import iconRing from '../../assets/img/icon-ring.png'

export default class Index extends Presenter {

  config = {
    navigationBarTitleText: '童年'
  }

  render() {
    return (
      <View className='home-page-viewport'>
        <View className='search-bar'>
          <View className='location-info'>
            <Text>上海</Text>
            <Image src={arrowDown} className='icon-arrow-down'></Image>
          </View>
          <View className='search-info'>
            <View className='search-inp'>
              <Image src={iconSearch} className='icon-search'></Image>
              <Text>搜索</Text>
            </View>
          </View>
          <View className='notice-info'>
            <Image src={iconRing} className='icon-ring'></Image>
          </View>
        </View>
      </View>
    )
  }
}
