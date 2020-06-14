import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import MainInfoPanel from './main-info-panel'
import TypeTabs from './type-tabs'
import './styles.scss'

export default class CircleDetailView extends Presenter {
  config = {
    navigationBarTitleText: '圈子'
  }

  loadingRender() {
    return (
      <View></View>
    )
  }

  render() {
    const { loading } = this.state
    return loading ? this.loadingRender() : (
      <View className='circle-detail-viewport'>
        <MainInfoPanel />
        <TypeTabs />
      </View>
    )
  }
}