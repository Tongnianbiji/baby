import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileBaby extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '宝宝信息',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    const { babyList } = this.state;
    return (
      <View className='profile-baby-viewport'>
        {
          babyList.map((item, index) => {
            return (
              <View key={`item_${item.id}_${index}`} className='item' onClick={this.onClickNavTo.bind(this, item.id)}>
                <View className='item-txt'>{item.name}</View>
                <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png' />
              </View>
            )
          })
        }
        <View className='btn-wrapper'>
          <View className='btn flex-center'>添加新宝宝</View>
        </View>
      </View>
    )
  }
}
