import Taro, { Component } from '@tarojs/taro'
import Index from './test/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config = {
    pages: [
      //主package
      'test/index',//开发测试入口页面
      'pages/index/index',//首页
      'pages/discover/index',//发现
      'pages/message/index',//消息
      'pages/profile/index',//我的
      'pages/splash/index',
      'pages/login/index'
    ],
    "subPackages": [
      {
        "root": "packageA",
        "pages": [
          "pages/index/index",
          "pages/discover/index"
        ]
      },
      {
        "root": "packageB",
        "pages": [
          "pages/index/index",
          "pages/discover/index"
        ]
      }
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "permission": {
      "scope.userLocation": {
        "desc": "需要您的位置信息, 匹配附近的宝宝家长"
      }
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
