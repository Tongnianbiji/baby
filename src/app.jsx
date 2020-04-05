import Taro, { Component } from '@tarojs/taro'
// import Index from './test/index'
import Splash from './pages/splash'

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
      'pages/message/index',//消息
      'pages/index/index',//首页
      'pages/discover/index',//发现
      'pages/splash/index',
      'test/index',//开发测试入口页面
      
      'pages/profile/index',//我的
      'pages/login/index'
    ],
    "subPackages": [
      {
        "root": "packageA",
        "pages": [
          "pages/index/index",
          "pages/discover/index",
          "pages/character/index",
          "pages/search-circle/index",
          "pages/more-circle/index",
          "pages/home-search-panel/index"
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
    "tabBar": {
      "color": "#CCC",
      "selectedColor": "#333",
      "backgroundColor": "#FEFDFD",
      "borderStyle": "black",
      "list": [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "assets/img/tabbar/home.png",
          selectedIconPath: "assets/img/tabbar/home-actived.png"
        },
        {
          pagePath: 'pages/discover/index',
          text: "发现",
          iconPath: "assets/img/tabbar/discovery.png",
          selectedIconPath: "assets/img/tabbar/discovery-actived.png"
        },
        {
          pagePath: "pages/message/index",
          text: "消息",
          iconPath: "assets/img/tabbar/message.png",
          selectedIconPath: "assets/img/tabbar/message-actived.png"
        },
        {
          pagePath: "pages/profile/index",
          text: "我的",
          iconPath: "assets/img/tabbar/my.png",
          selectedIconPath: "assets/img/tabbar/my-actived.png"
        }
      ]
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
      <Splash />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
