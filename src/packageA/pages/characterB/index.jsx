import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class CharacterB extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '选择身份'
  }

  render() {
    const { chatacterList } = this.state;
    return (
      <View className='characterB-viewport'>
        <View className='header-wrapper'>小福爸爸邀请你一起使用“童年”，共同关注小福的成长</View>
        <View className='body-wrapper'>
          {
            chatacterList.map((item, index) => {
              return (
                <View className='item flex-between' key={item.value}>
                  <View>{item.title}</View>
                  <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png'></Image>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
