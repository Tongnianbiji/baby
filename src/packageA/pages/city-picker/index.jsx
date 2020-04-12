import Taro from '@tarojs/taro'
import { View, Input, Image, ScrollView, Text } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

import iconSearch from '../../../assets/img/icon-search.png'

export default class CityPickerView extends Presenter {
  config = {
    navigationBarTitleText: '选择城市'
  }

  render() {
    return (
      <View className='city-picker-vewport'>
        <View className='page-header'>
          <View className='search-box'>
            <View className='inp-wrapper'>
              <Input className='inp' placeholder='输入城市名进行搜索' />
              <Image src={iconSearch} className='icon-search' />
            </View>
            <View className='btn-cancel'>取消</View>
          </View>
          <View className='current-city-info'>当前: 上海</View>
        </View>
        <View className='page-body'>
          <ScrollView scrollY style={{ height: '100%' }}>
            <View className='location-pane'>
              <View className='title'>定位/最近访问</View>
              <View className='btn-location'>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/address.png' className='icon-location' />
                <Text className='btn-txt'>上海</Text>
              </View>
            </View>
            <View className='hot-citys'>
              <View className='title'>热门城市</View>
              <View className='city-card-wrapper'>
                <View className='city-card'>北京</View>
                <View className='city-card'>上海</View>
                <View className='city-card'>深圳</View>
                <View className='city-card'>天津</View>
                <View className='city-card'>重庆</View>
                <View className='city-card'>阿勒泰</View>
                <View className='city-card'>乌兰浩特</View>
                <View className='city-card'>科右前旗扎兰屯</View>
                <View className='city-card'>广州</View>
              </View>
            </View>
            <View className='city-list'>
              <View className='title'>所有城市</View>
              <View className='letter-title'>A</View>
              <View className='city-item'>
                <View className='city-name'>阿拉善盟</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>安阳</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>安琪</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>阿里木盆地</View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View className='nav-bar'>
          <View className='nav-item'>热门</View>
          <View className='nav-item'>A</View>
          <View className='nav-item'>C</View>
          <View className='nav-item'>D</View>
          <View className='nav-item'>E</View>
          <View className='nav-item'>F</View>
          <View className='nav-item'>G</View>
          <View className='nav-item'>J</View>
          <View className='nav-item'>K</View>
          <View className='nav-item'>L</View>
          <View className='nav-item'>M</View>
          <View className='nav-item'>N</View>
          <View className='nav-item'>O</View>
          <View className='nav-item'>W</View>
          <View className='nav-item'>X</View>
          <View className='nav-item'>Z</View>
        </View>
      </View>
    )
  }
}