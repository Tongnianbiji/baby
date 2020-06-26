import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {ICONS} from '../../../../common/constant'
import './search-bar.scss'

const ICON_CLEARN = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png'

export default class SearchBarComponent extends Taro.Component {
  onSearch = kw => {

  }

  render() {
    return (
      <View className='search-bar-comp'>
        <View className='search-inp-wrap'>
          <Input className='inp' placeholder='请输入关键字' placeholderClass='placehoder' confirmType='search' onConfirm={this.onSearch} />
          <Image src={ICONS.SEARCH} className='search-icon' />
          <Image src={ICON_CLEARN} className='clearn-icon' />
        </View>
      </View>
    )
  }
}