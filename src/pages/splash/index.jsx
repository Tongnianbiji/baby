import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Presenter from './presenter'
// import AppSettings from '../../../settings'
import './style.scss'

/**
 * this is view layer.
 * just jsx here, because we have presenter layer;
 */
export default class SplashView extends Presenter {
  config = {
    navigationBarTitleText: '开屏页',
    navigationStyle: 'custom'
  }
  render() {
    const tabList = [{ title: '第一tab' }, { title: '第二tab' }]
    return (
      <View className='splash-viewport'>
        <View className='header' onClick={this.goToTest}>header</View>
        <View className='content'>
          <AtTabs tabList={tabList} current={0}>
            <AtTabsPane index={0}>
              <View className='item'><View className='t'></View></View>
              <View className='item'><View className='t'></View></View>
              <View className='item'><View className='t'></View></View>
              <View className='item'><View className='t'></View></View>
              <View className='item'><View className='t'></View></View>
              <View className='item'><View className='t'></View></View>
              <View className='item'><View className='t'></View></View>
            </AtTabsPane>
            <AtTabsPane index={1}></AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}