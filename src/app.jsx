import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'mobx-react'

import { setGlobalData } from './global_data'
import GoEasy from './libs/goeasy-1.0.17'
// store(s)
import circleDetailStore from './store/circle-detail'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  circleDetailStore
}

class App extends Component {

  componentDidMount() {
    // console.log('app did mounted')
    Taro.login().then(({ errMsg, code }) => {
      if (errMsg === 'login:ok') {
        setGlobalData('loginCode', code)
      }
    })
    new GoEasy({
      host: 'hangzhou.goeasy.io',
      appkey: 'BC-d71d87e7f5f54b519e77da2c5a1e1bba',
      onConnected() {
        console.log('连接成功')
      },
      onDisconnected() {
        console.log('断开连接')
      },
      onConnectFailed(error) {
        console.log('连接失败', error)
      }
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
