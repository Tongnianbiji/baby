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
    const { tabsData, currentTab, provinceData, cityData, townData, searchResult } = this.state
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
          { !searchResult && <View className='current-city-info'>当前: {this.state.currentCity}</View> }
          {
            !searchResult &&
            <View className='location-pane'>
              <View className='title'>定位/最近访问</View>
              <View className='btn-location' onClick={this.reLocation}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/address.png' className='icon-location' />
                <Text className='btn-txt'>{this.state.locationCity}</Text>
              </View>
            </View>
          }
          { !searchResult && <UITabs tabList={tabsData} current={currentTab} onChange={this.tabChange} /> }
        </View>
        <View className='page-body'>
          <ScrollView scrollY style={{ height: '100%' }}>
            {
              searchResult ?
                <View className='search-result'>
                  {
                    searchResult.map(s => (
                      <View key={s.code} className='result-item'>
                        <View className='title'>{s.name}</View>
                        <View className='sub-title'>{s.address}</View>
                      </View>
                    ))
                  }
                </View> :
                <View className='city-list'>
                  {
                    (currentTab === 0 ? provinceData : currentTab === 1 ? cityData : townData).map(city => (
                      <View key={city.code} className='city-item' onClick={this.selectedCity.bind(this, city)}>
                        <View className='city-name'>{ city.name }</View>
                      </View>
                    ))
                  }
                </View>
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}