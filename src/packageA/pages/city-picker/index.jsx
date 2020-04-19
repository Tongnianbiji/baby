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
              <Input className='inp' placeholder='输入城市名进行搜索' onInput={this.kwChange} />
              <Image src={iconSearch} className='icon-search' />
            </View>
            <View className='btn-cancel' onClick={this.goBack}>取消</View>
          </View>
          <View className='current-city-info'>当前: {this.state.currentCity}</View>
        </View>
        <View className='page-body'>
          <ScrollView scrollY style={{ height: '100%' }} scrollIntoView={this.state.anchor}>
            <View className='location-pane'>
              <View className='title'>定位/最近访问</View>
              <View className='btn-location' onClick={this.reLocation}>
                <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/address.png' className='icon-location' />
                <Text className='btn-txt'>{this.state.locationCity}</Text>
              </View>
            </View>
            <View className='hot-citys' id='__my_id_letter_hot'>
              <View className='title'>热门城市</View>
              <View className='city-card-wrapper'>
                {
                  this.state.allcity[0].item.map(city => {
                    return (
                      <View className='city-card' key={city.name} onClick={this.pickCity.bind(this, city.name)}>{city.name}</View>
                    )
                  })
                }
              </View>
            </View>
            <View className='city-list'>
              <View className='title'>所有城市</View>
              {
                this.state.currentList.map(group => {
                  return group.type !== 'hot' ? (
                    <View id={'__my_id_letter_' + group.title}>
                      <View className='letter-title' key={group.title}>{group.title}</View>
                      {
                        group.item.map(city => {
                          return (
                            <View className='city-item' key={city.name} onClick={this.pickCity.bind(this, city.name)}>
                              <View className='city-name'>{city.name}</View>
                            </View>
                          )
                        })
                      }
                    </View>
                  ) : null
                })
              }
            </View>
          </ScrollView>
        </View>
        <View className='nav-bar'>
          <View className='nav-item' onClick={this.jumpToKey.bind(this, 'hot')}>热门</View>
          {
            this.state.currentList.map(group => {
              return group.type !== 'hot' ? (
                <View className='nav-item' key={group.title} onClick={this.jumpToKey.bind(this, group.title)}>{group.title}</View>
              ) : null
            })
          }
        </View>
      </View>
    )
  }
}