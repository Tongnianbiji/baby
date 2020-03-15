import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import Presenter from './presenter'
import './style.scss'

export default class Login extends Presenter {
  config = {
    navigationBarTitleText: '登录'
  }
  render() {
    return (
      <View className='login-viewport'>
        <View className='logo-wrapp'>
          <Text>LOGO</Text>
        </View>
        <View className='invite-tip'>
          <Text>小富爸爸邀请你一起使用“童年”，共同关注小福的成长</Text>
        </View>
        <Button className='btn-wechat'>微信一键登陆</Button>
        <Button className='btn-phone'>手机号验证登陆</Button>
      </View>
    )
  }
}