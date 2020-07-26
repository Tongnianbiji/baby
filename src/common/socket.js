import GoEasy from 'goeasy';
import g from './global.js'

//在index.js里初始化全局GoEasy对象
g.goEasy = new GoEasy({
  host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
  appkey: "my_appkey", //替换为您的应用appkey
  onConnected: function () {
    console.log('连接成功！')
  },
  onDisconnected: function () {
    console.log('连接断开！')
  },
  onConnectFailed: function (error) {
    console.log('连接失败或错误！')
  }
});

g.goEasy.publish({
  channel: "my_channel", //替换为您自己的channel
  message: "Hello, GoEasy!" //替换为您想要发送的消息内容
});