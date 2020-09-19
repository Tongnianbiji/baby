import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class ProfileBaby extends Presenter {
  config = {
    navigationBarTitleText: '家',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    const { familyMember, otherMember } = this.state;
    return (
      <View className='profile-family-viewport'>
        {
          familyMember.map((item, index) => {
            return (
              <View key={`item_${item.id}_${index}`} className='item' onClick={this.onClickNavTo.bind(this, item.id)}>
                <Image className='item-avatar' src={item.avatar} />
                <View className='item-txt'>
                  <View>{item.role ? `${item.name}(${item.role})` : item.name}</View>
                  <View>{item.joinTime}</View>
                </View>
                <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
              </View>
            )
          })
        }
        <View className='other-wrapper '>
          <View className='other-tips'>您还可以邀请</View>
          <View className='other-items'>
            {
              otherMember.map((item, index) => {
                return (
                  <View className='other-item' key={`item_${item.id}_${index}`}>{item.role}</View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
