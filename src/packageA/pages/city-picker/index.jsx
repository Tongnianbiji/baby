import Taro from '@tarojs/taro'
import { View, Input, Image, Text, ScrollView } from '@tarojs/components'
import UITabs from '../../../common/components/ui-tabs'
import Presenter from './presenter'
import './index.scss'
import iconSearch from '../../../assets/img/icon-search.png'

export default class CityPickerView extends Presenter {
  config = {
    navigationBarTitleText: '选择城市'
  }

  render() {
    const { tabsData, currentTab } = this.state
    return (
      <View className='city-picker-vewport'>
        <View className='page-header'>
          <View className='search-box'>
            <View className='inp-wrapper'>
              <Input className='inp' placeholder='输入城市名进行搜索' onInput={this.kwChange} />
              <Image src={iconSearch} className='icon-search' />
            </View>
            <View className='btn-cancel' onClick={this.goBack}>取消</View>
          </View>
          <View className='current-city-info'>当前: {this.state.currentCity}</View>
          <View className='location-pane'>
            <View className='title'>定位/最近访问</View>
            <View className='btn-location' onClick={this.reLocation}>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/address.png' className='icon-location' />
              <Text className='btn-txt'>{this.state.locationCity}</Text>
            </View>
          </View>
          <UITabs tabList={tabsData} current={currentTab} change={this.tabChange} />
        </View>
        <View className='page-body'>
          <ScrollView scrollY style={{ height: '100%' }}>
            <View className='city-list'>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
              <View className='city-item'>
                <View className='city-name'>乌兰浩特</View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}