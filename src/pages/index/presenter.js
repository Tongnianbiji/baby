import BaseComponent from '../../common/baseComponent'
import React from 'react'
import Model from './model'
import Taro from '@tarojs/taro'
export default class HomePage extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      topTabs: Model.tabConfig.top,
      currentTopTab: 1,
      attentionType: 1, //1: 关注的用户   2: 关注的圈子
      hotTabType: 1, //1: 24小时   2: 7天
      currentCity: this.getCurrentCity(),
      tabId: 110000,
      attentionUsers: [],
      isCollectMin: true,
      currentSharePid: '',
      currentShareQid: '',
      attentionPageNum: 1,
      showAttentionLoading: true,
      isAttentionToBottom: false,
      postLock: false,
      isCollentMini: true,
      showNewInfoBar:false
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     isCollectMin:false
    //   })
    // }, 5e3);
  }

  componentDidShow() {
    // this.getLocation().then(info => {
    //   const city = this.getCurrentCity()
    //   if (!city) {
    //     Model.getCityInfo(info.longitude, info.latitude).then(data => {
    //       const c = data.district || data.city
    //       console.log('c',c)
    //       this.setState({ currentCity: this.getSubCityName(c) })
    //       this.setCurrentCity(c)
    //     })
    //   } else {
    //     this.setState({ currentCity: this.getSubCityName() })
    //   }

    // }).catch(() => {
    //   this.setState({ currentCity: '请选择' })
    // })
    console.log('当前城市', this.getCurrentCity());
    const {
      lat,
      lon,
      provinceCode,
      cityCode,
      countryCode
    } = this.getCurrentLocation();
    const { tabId } = this.state;
    getApp().sensors.registerApp({
      lat: lat,
      lon: lon,
      provinceCode: provinceCode,
      cityCode: cityCode,
      countryCode: countryCode,
      tabId: tabId,
      uid: this.getUserInfo().userId || 'guest'
    })
    this.setState({
      currentCity: this.getCurrentCity()
    })
  }


  onPullDownRefresh() {
    const {currentTopTab} = this.state;
    if(currentTopTab === 1){
      this.setState({
        showNewInfoBar:true
      })
    }
    setTimeout(()=>{
      Taro.stopPullDownRefresh()
      this.setState({
        showNewInfoBar:false
      })
    },2e3)
  }

  onShareAppMessage (res){
    let path= '';
    console.log('分享',res)
    if (res.from === 'button') {
      const {pid,qid} =JSON.parse(res.target.id);
      if(pid){
        path = `/packageB/pages/post-detail/index?pid=${pid}`
      }
      if(qid){
        path = `/packageB/pages/issue-detail/index?qid=${qid}`
      }
    }
    return {
      title: `欢迎加入童年`,
      path:path
    }
  }

  onReachBottom() {
    const { postLock, isAttentionToBottom, currentTopTab, attentionType } = this.state;
    if (currentTopTab === 0) {
      if (attentionType === 1) {
        if (!postLock && !isAttentionToBottom) {
          this.setState((pre) => ({
            attentionPageNum: pre.attentionPageNum + 1
          }), () => {
            this.getAttentionUsers()
          })
        }
      }
    }
  }

  topTabChange = (current) => {
    const { attentionType, hotTabType,attentionUsers } = this.state;
    let tabId = null;
    switch (current) {
      case 0:
        if (attentionType === 1) {
          tabId = 100100;
          if(!attentionUsers.length){
            this.getAttentionUsers()
          }
        }
        else if (attentionType === 2) {
          tabId = 100204;//目前关注圈子只有圈子（其他暂时隐藏）
        }
        break;
      case 1:
        tabId = 110000;
        break;
      case 2:
        if (hotTabType === 1) {
          tabId = 130100;
        }
        else if (hotTabType === 2) {
          tabId = 130200;
        }
        break;
    }
    this.setState({
      currentTopTab: current,
      tabId: tabId
    }, () => {
      //const {tabId} = this.state;
      getApp().sensors.registerApp({
        tabId: tabId,
        eventType: 2
      })
    })
  }

  attentionTabChange = attentionType => {
    let tabId = null;
    const {attentionUsers } = this.state;
    this.setState({ attentionType },
      () => {
        if (attentionType === 1) {
          if(!attentionUsers.length){
            this.getAttentionUsers()
          }
        }
      })
    if (attentionType === 1) {
      tabId = 100100;
      this.setState({
        tabId: 100100
      })
    }
    else if (attentionType === 2) {
      tabId = 100204;
      this.setState({
        tabId: 100204//目前关注圈子只有圈子（其他暂时隐藏）
      })
    }
    getApp().sensors.registerApp({
      tabId: tabId,
      eventType: 2
    })
  }

  hotTabChange = hotTabType => {
    let tabId = null;
    this.setState({ hotTabType })
    if (hotTabType === 1) {
      tabId = 130100;
      this.setState({
        tabId: 130100
      })
    }
    else if (hotTabType === 2) {
      tabId = 130200;
      this.setState({
        tabId: 130200
      })
    }
    getApp().sensors.registerApp({
      tabId: tabId,
      eventType: 2
    })
  }

  goSearch = () => {
    this.navto({ url: '/packageA/pages/home-search-panel/index?searchScope=all' })
  }

  onLongPressForDebug() {
    this.navto({ url: '/test/index' })
  }

  selectCity = () => {
    this.navto({ url: '/packageA/pages/city-picker/index' })
  }

  getSubCityName = (name = undefined) => {
    const city = name || this.getCurrentCity() || '请选择'
    return city.length > 3 ? `${city.substr(0, 3)}...` : city
  }

  jump2circle = () => {
    this.navto({ url: '/packageA/pages/circle-detail/index' })
  }

  //获取关注用户数据
  getAttentionUsers = async () => {
    const { attentionUsers, attentionPageNum } = this.state;
    const { userId } = this.getUserInfo();
    this.setState({
      postLock: true
    })
    let res = await Model.getAttentionUsers(userId, attentionPageNum);
    this.setState({
      postLock: false
    })
    if (res && res.items && res.items.length) {
      const { total, items } = res;
      if (!attentionUsers.length) {
        this.setState({
          attentionUsers: items || []
        })

      } else {
        this.setState((pre) => ({
          attentionUsers: pre.attentionUsers.concat(items || [])
        }))
      }
      if (total <= this.state.attentionUsers.length) {
        this.setState({
          showAttentionLoading: false,
          isAttentionToBottom: true
        })
      }
    }
  }

  handleFavoriteAttention = async (model) => {
    let { postLock, attentionUsers } = this.state;
    let preIndex = null;
    const { pid, qid } = model.entity;
    if (pid) {
      preIndex = attentionUsers.findIndex(item => item.activityId === model.activityId)
    }
    else if (qid) {
      preIndex = attentionUsers.findIndex(item => item.activityId === model.activityId)
    }
    if (!postLock) {
      if (model.entity.isMark) {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.cancelMarkPost(pid);
        }
        else if (qid) {
          res = await Model.cancelMarkQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        attentionUsers[preIndex].entity.isMark = false;
        attentionUsers[preIndex].entity.markes -= 1;
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.markPost(pid);
        }
        else if (qid) {
          res = await Model.markQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        attentionUsers[preIndex].entity.isMark = true;
        attentionUsers[preIndex].entity.markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      attentionUsers: attentionUsers
    })
  }

  //加入/取消
  handleSubscrCircleAttention = async (model) => {
    let { postLock, attentionUsers } = this.state;
    let preIndex = attentionUsers.findIndex(item => item.activityId === model.activityId)
    if (!postLock) {
      if (model.entity.isSubscribe) {
        this.setState({
          postLock: true
        })
        let res = await Model.leaveCircle(model.entity.cid);
        this.setState({
          postLock: false
        })
        attentionUsers[preIndex].entity.isSubscribe = false
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = await Model.joinCircle(model.entity.cid);
        this.setState({
          postLock: false
        })
        attentionUsers[preIndex].entity.isSubscribe = true
        if (res) {
          this.showToast('已加入');
        }
      }
    }
    this.setState({
      attentionUsers: attentionUsers
    })
  }

  share = (model) => {
    const { pid, qid } = model;
    this.setState({
      currentSharePid: '',
      currentShareQid: ''
    })
    if (pid) {
      this.setState({
        currentSharePid: pid
      })
    } else if (qid) {
      this.setState({
        currentShareQid: qid
      })
    }
  }

  closeCollentMini = () => {
    this.setState({
      isCollentMini: false
    })
    this.setCurrentIsCollentMini(2)
  }
}
