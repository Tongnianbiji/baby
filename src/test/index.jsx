import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  navigate(key) {
    switch (key) {
      //PAGES
      case 'splash':
        Taro.navigateTo({ url: '/pages/splash/index' })
        break;
      case 'index':
        Taro.navigateTo({ url: '/pages/index/index' })
        break;
      case 'discover':
        Taro.navigateTo({ url: '/pages/discover/index' })
        break;
      case 'message':
        Taro.navigateTo({ url: '/pages/message/index' })
        break;
      case 'profile':
        Taro.navigateTo({ url: '/pages/profile/index' })
        break;
      case 'login':
        Taro.navigateTo({ url: '/pages/login/index' })
        break;

      //PACKAGEA
      case 'character':
        Taro.navigateTo({ url: '/packageA/pages/character/index' })
        break;

      //PACKAGEB
      default:
        break;
    }
  }

  config = {
    navigationBarTitleText: '页面入口'
  }

  render() {
    return (
      <View className='test'>
        <Button onClick={() => this.navigate('splash')}>开屏</Button>
        <Button onClick={() => this.navigate('login')}>登录</Button>
        <Button onClick={() => this.navigate('character')}>选择身份</Button>
        <Button onClick={() => this.navigate('index')}>首页</Button>
        <Button onClick={() => this.navigate('discover')}>发现</Button>
        <Button onClick={() => this.navigate('message')}>消息</Button>
        <Button onClick={() => this.navigate('profile')}>我的</Button>
        <Button onClick={() => this.navigate('profile')}>页面一</Button>
        <Button onClick={() => this.navigate('profile')}>页面一</Button>
        <Button onClick={() => this.navigate('profile')}>页面一</Button>
      </View>
    )
  }

}
