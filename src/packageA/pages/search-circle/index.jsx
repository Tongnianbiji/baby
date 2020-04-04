import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { ICONS } from '../../../common/constant'
import Presenter from './presenter'
import SearchCircleItem from './circle-item'
import './styles.scss'

export default class SearchCircle extends Presenter {
  config = {
    navigationBarTitleText: '搜索'
  }

  render() {
    return (
      <View className='search-circle-viewport'>
        <View className='search-bar'>
          <View className='search-inp'>
            <Input focus className='inp' onInput={this.onKwInput} value={this.state.kw} />
            <Image src={ICONS.SEARCH} className='search-icon' />
            {
              this.state.showCleanBtn && <Image src={ICONS.CLOSE_BTN} className='clean-icon' onClick={this.cleanKw} />
            }
          </View>
          <View className='search-btn'>取消</View>
        </View>
        <View className='item-wrapper'>
          {
            [1,2,3,4,5,6].map(n => {
              return (
                <SearchCircleItem key={n} recommand={n === 6} />
              )
            })
          }
        </View>
        <View className='no-data'>
          <View className='no-data-content'>
            没有找到想要的圈子
            <View className='create-circle'>创建圈子</View>
          </View>
        </View>
      </View>
    )
  }
}