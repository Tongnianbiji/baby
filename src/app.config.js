export default {
  pages: [
    //主package
    'pages/index/index',//首页
    'pages/discover/index',//发现
    'pages/message/index',//消息
    'pages/profile/index',//我的
    'pages/splash/index',
    'test/index',//开发测试入口页面

    'pages/login/index'
  ],
  "subPackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/attentions/index",
        "pages/characterA/index",
        "pages/characterB/index",
        "pages/characterX/index",
        "pages/discover/index",
        "pages/home-search-panel/index",
        "pages/index/index",
        "pages/interest/index",
        "pages/more-circle/index",
        "pages/search-circle/index",
        "pages/profile-home/index",
        "pages/profile-baby/index",
        "pages/profile-baby-detail/index",
        "pages/profile-baby-action/index",
        "pages/profile-setting/index",
        "pages/profile-setting-info/index",
        "pages/profile-setting-info-nickname/index",
        "pages/profile-setting-info-signature/index",
        "pages/profile-setting-privacy/index",
        "pages/profile-about/index",
        "pages/profile-about-base/index",
        "pages/profile-about-agreements/index",
        "pages/profile-about-privacy/index",
        "pages/profile-contact/index",
        "pages/profile-family/index",
        "pages/fans/index",
        "pages/postReply/index",
        "pages/qa-list/index",
        "pages/collects/index",
        "pages/collects-message/index",
        "pages/message-system/index",
        "pages/message-im/index",
        "pages/city-picker/index",
        "pages/circle-detail/index",
        "pages/circle-desc/index",
        "pages/circle-list/index",
        "pages/user-circles/index",
        "pages/schools/index",
        "pages/hospitals/index",
        "pages/profile-setting-baby-nickname/index"
      ]
    },
    {
      "root": "packageB",
      "pages": [
        "pages/index/index",
        "pages/discover/index",
        "pages/create-post/index",
        "pages/my-post/index",
        "pages/post-detail/index",
        "pages/create-issue/index",
        "pages/issue-detail/index",
        "pages/reply-post/index",
        "pages/report/index"
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    "enablePullDownRefresh": true
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