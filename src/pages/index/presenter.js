import BaseComponent from '../../common/baseComponent'
import React from 'react'
import Model from './model'
import Taro from '@tarojs/taro'
import staticData from '@src/store/common/static-data'
import Storage from '@common/localStorage'
import analysisHelper from '@helper/analysisHelper';
const { goEasy: im } = staticData;
let exposureIdList = new Set();
let timer = null;
let pagePadding = 0;
const windowWidth = Taro.getSystemInfoSync().windowWidth;
pagePadding = windowWidth / 750 * 32 * 2;
export default class HomePage extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      topTabs: Model.tabConfig.top,
      currentTopTab: 1,
      attentionType: 1, //1: 关注的用户   2: 关注的圈子
      hotTabType: 1, //1: 24小时   2: 7天
      currentCity: '',
      tabId: 110000,
      attentionUsers: [],
      recommends: [],
      hots: [],
      isCollectMin: true,
      currentSharePid: '',
      currentShareQid: '',
      attentionPageNum: 1,
      showAttentionLoading: true,
      isAttentionToBottom: false,
      showRecommendLoading: false,
      isRecommendToBottom: false,
      postLock: false,
      isCollentMini: true,
      showNewInfoBar: false,
      total: 0,
      recommendsLength: 0,
      isPullDownRefresh: false
    }
    this.recommendsExposuredList = new Set();

  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     isCollectMin:false
    //   })
    // }, 5e3);
    this.getrecommends();
    this.gethots();
    this.getInviter()

    this.connectGoeasyIm();
  }

  componentDidShow() {
    // this.getLocation().then(info => {
    //   const city = this.getCurrentCity()
    //   if (!city) {
    //     Model.getCityInfo(info.longitude, info.latitude).then(data => {
    //       const c = data.district || data.city
    //       console.log('c',c)
    //       this.setState({ currentCity: this.getSubCityName(c) })
    //       //this.setCurrentCity(c)
    //     })
    //   } else {
    //     this.setState({ currentCity: this.getSubCityName() })
    //   }

    // }).catch(() => {
    //   this.setState({ currentCity: '请选择' })
    // })
    timer = setInterval(() => {
      this.setState({
        currentCity: this.getCurrentCity()
      })
      if (this.getCurrentCity()) {
        clearInterval(timer)
      }
    }, 300);
    try {
      const {
        lat = '31.22114',
        lon = '121.54409',
        provinceCode = '上海',
        cityCode,
        countryCode,
        cityCodeCode,
        countryCodeCode
      } = this.getCurrentLocation();
      const { tabId } = this.state;

      getApp().sensors.registerApp({
        lat: lat,
        lon: lon,
        provinceCode: provinceCode,
        cityCode: cityCodeCode,
        countryCode: countryCodeCode,
        tabId: tabId,
        uid: this.getUserInfo().userId || 'guest'
      })
    } catch (error) {
      console.error('---TODO---', error)
    }
    this.getMessageCount();
    setTimeout(() => {
      this.exposure()
    }, 800);
  }

  connectGoeasyIm() {
    if (!Storage.getInstance().getToken()) return;
    // if (!staticData.isLogin) return;
    const { userId } = this.getUserInfo();
    console.log('---userId---', userId)
    //连接GoEasy
    im.connect({
      id: userId
    }).then(function () {
      console.log("Connection successful.");
    }).catch(function (error) {
      console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
    });

  }
  async onPullDownRefresh() {
    setTimeout(() => {
      this.setState({
        showNewInfoBar: false,
      }, () => {
        Taro.stopPullDownRefresh()
      })
    }, 2e3)
    const { currentTopTab } = this.state;
    if (currentTopTab === 1) {
      await this.getrecommends();
      this.setState({
        showNewInfoBar: true,
        isPullDownRefresh: true
      })
    } else {
      Taro.stopPullDownRefresh()
    }
    Taro.vibrateShort()
  }

  onShareAppMessage(res) {
    let path = '';
    const userId = this.getUserInfo().userId;

    if (res.from === 'button') {
      const { pid, qid } = JSON.parse(res.target.id);
      if (pid) {
        path = `/packageB/pages/post-detail/index?pid=${pid}&inviter=${userId}`
      }
      if (qid) {
        path = `/packageB/pages/issue-detail/index?qid=${qid}&inviter=${userId}`
      }
    }
    return {
      title: `欢迎加入童年`,
      path: path
    }
  }

  async onReachBottom() {
    const { postLock, isAttentionToBottom, currentTopTab, attentionType, attentionUsers } = this.state;
    if (currentTopTab === 0) {
      if (attentionType === 1) {
        if (!postLock && !isAttentionToBottom) {
          this.setState((pre) => ({
            attentionPageNum: pre.attentionPageNum + 1
          }), () => {
            this.getAttentionUsers();
            let contentIdList = [];
            attentionUsers.forEach(item => {
              if (item.entity && item.entity.pid) {
                contentIdList.push(item.entity.pid.toString())
              }
            })
            getApp().sensors.registerApp({
              contentIdList: contentIdList,
              contentType: 1
            })
          })
        }
      }
    }
    else if (currentTopTab === 1) {
      this.setState({
        isPullDownRefresh: false,
        showRecommendLoading: true,
        isRecommendToBottom: false,
      }, async () => {
        if (!postLock) {
          // Taro.showLoading();
          await this.getrecommends(2);
          // Taro.hideLoading();
          this.setState({
            showRecommendLoading: false
          })
        }
      })
    }
  }

  onPageScroll() {
    this.exposure()
  }

  getInviter() {
    const { updateInviter } = staticData;
    const { inviter, scene } = this.$router.params;
    console.log('scene', scene)
    console.log('测试', this.$router.params)
    if (inviter || scene) {
      updateInviter(inviter || scene)
    }
  }

  exposure = () => {
    return
    const { attentionUsers, recommends, hots, currentTopTab, attentionType } = this.state;
    if (currentTopTab === 0 && attentionType === 1) {
      for (let i = 0; i < attentionUsers.length; i++) {
        let item = attentionUsers[i];
        if (!exposureIdList.has(item.activityId)) {
          exposureIdList.add(item.activityId);
          Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.activityId}`, (res) => {
            console.log('距离', res.intersectionRatio)
            if (res.intersectionRatio > 0) {
              let contentIdList = [];
              console.log(`进入页面${item.activityId}`)
              if (item.entity && (item.entity.pid || item.entity.qid)) {
                let entityId = item.entity.pid || item.entity.qid;
                contentIdList.push(entityId.toString())
                getApp().sensors.track('exposure', {
                  contentIdList: contentIdList,
                  contentType: item.entity.pid ? 1 : 3,
                  eventType: 1
                });
              }
            }
          })
        }
      }
    } else if (currentTopTab === 1) {
      for (let i = 0; i < recommends.length; i++) {
        let item = recommends[i];
        if (!exposureIdList.has(item.entityId)) {
          exposureIdList.add(item.entityId);
          Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.entityId}`, (res) => {
            if (res.intersectionRatio > 0) {
              let contentIdList = [];
              console.log(`进入页面${item.entityId}`)
              if (item.entity && (item.entity.pid || item.entity.qid)) {
                let entityId = item.entity.pid || item.entity.qid;
                contentIdList.push(entityId.toString())
                getApp().sensors.track('exposure', {
                  contentIdList: contentIdList,
                  contentType: item.entity.pid ? 1 : 3,
                  eventType: 1
                });
              }
            }
          })
        }
      }
    } else if (currentTopTab === 2) {
      for (let i = 0; i < hots.length; i++) {
        let item = hots[i];
        if (!exposureIdList.has(item.pid)) {
          exposureIdList.add(item.pid);
          Taro.createIntersectionObserver().relativeToViewport({ bottom: 0 }).observe(`.target-item-${item.pid}`, (res) => {
            if (res.intersectionRatio > 0) {
              let contentIdList = [];
              console.log(`进入页面${item.pid}`)
              if (item.pid) {
                let entityId = item.pid;
                contentIdList.push(entityId.toString())
                getApp().sensors.track('exposure', {
                  contentIdList: contentIdList,
                  contentType: 1,
                  eventType: 1
                });
              }
            }
          })
        }
      }
    }
  }

  topTabChange = (current) => {
    const { attentionType, hotTabType, attentionUsers, recommends } = this.state;
    let tabId = null;
    switch (current) {
      case 0:
        if (attentionType === 1) {
          tabId = 100100;
          if (!attentionUsers.length) {
            this.getAttentionUsers()
          }
        }
        else if (attentionType === 2) {
          tabId = 100204;//目前关注圈子只有圈子（其他暂时隐藏）
        }
        break;
      case 1:
        tabId = 110000;
        if (!recommends.length) {
          this.getrecommends()
        }
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
      getApp().sensors.track('click', {
        tabId: tabId,
        eventType: 2,
        contentIdList: []
      });
      this.exposure()
    })

  }

  attentionTabChange = type => {
    let tabId = null;
    const { attentionUsers } = this.state;
    this.setState({ attentionType: type + 1 },
      () => {
        if (type === 0) {
          if (!attentionUsers.length) {
            this.getAttentionUsers()
          }
        }
      })
    if (type === 0) {
      tabId = 100100;
      this.setState({
        tabId: 100100
      })
    }
    else if (type === 1) {
      tabId = 100204;
      this.setState({
        tabId: 100204//目前关注圈子只有圈子（其他暂时隐藏）
      })
    }
    getApp().sensors.track('click', {
      tabId: tabId,
      eventType: 2,
      contentIdList: []
    });
    this.exposure();
  }

  hotTabChange = type => {
    let tabId = null;
    this.setState({ hotTabType: type + 1 })
    if (type === 0) {
      tabId = 130100;
      this.setState({
        tabId: 130100
      })
    }
    else if (type === 1) {
      tabId = 130200;
      this.setState({
        tabId: 130200
      })
    }
    this.gethots()
    getApp().sensors.track('click', {
      tabId: tabId,
      eventType: 2,
      contentIdList: []
    });
    this.exposure();
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
    if (res && res.items) {
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

  //获取推荐数据
  getrecommends = async (type = 1) => {
    //type 1:下拉刷新；2:上拉刷新
    let { recommends } = this.state;
    this.setState({
      postLock: true
    })
    let res = await Model.getrecommends();
    this.setState({
      postLock: false
    })
    if (res) {
      let newRecommends = null;
      let newRes = [];
      res.forEach(item => {
        if (item.entity) {
          newRes.push(item)
        }
      })
      if (type === 1) {
        newRecommends = newRes.concat(recommends)
      } else {
        newRecommends = recommends.concat(newRes)
      }
      this.setState({
        recommends: newRecommends,
        recommendsLength: newRes.length,
        pageState: newRecommends.length == 0 ? 'noData' : 'over',
      }, () => {
        this.addRecommendsExposure();
      })
    } else {
      this.setState({
        pageState: 'error',
      })
    }
  }
  addRecommendsExposure() {
    if (this.state.recommends.length == 0) {
      this.recommendsExposuredList.clear();
    }
    setTimeout(() => {
      let isQa = false;
      let id = 0;
      this.state.recommends.forEach(item => {
        
        if (!item.entity) return;
        
        isQa = !!item.entity.qid;
        id = item.entity.qid || item.entity.pid;
        if (!this.recommendsExposuredList.has(`${isQa + 1}_${id}`)) {
          this.recommendsExposuredList.add(`${isQa + 1}_${id}`);
          console.log(444444444)
          Taro.createIntersectionObserver().relativeToViewport({ bottom: -70, top: -70, left: -pagePadding, right: -pagePadding }).observe(`#recommends-item-${id}`, (res) => {
            if (res.intersectionRatio == 0) return;
            console.log(`------#recommends-item-${id}-进入视图------`, res);
            analysisHelper.exposure({
              name: `首页推荐${isQa ? '问答' : '帖子'}列表曝光`,
              contentIdList: [id.toString()],
              contentType: isQa ? 3 : 1,
              eventType: 1,
              tabId: 110000,
            });
          })
        }
      })
    }, 500);
  }

  //获取热版数据
  gethots = async () => {
    const { hotTabType } = this.state;
    if (hotTabType === 1) {
      let res = await Model.gethots(1);
      if (res) {
        this.setState({
          hots: res || []
        })
      }
    } else {
      let res = await Model.gethots(2);
      if (res) {
        this.setState({
          hots: res || []
        })
      }
    }

  }

  handleFavoriteAttention = async (model) => {
    let { postLock, attentionUsers } = this.state;
    let preIndex = null;
    const { isLogin } = staticData;
    const { pid, qid } = model.entity;
    if (!isLogin) {
      this.navto({
        url: '/pages/login/index'
      })
      return
    }
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

  handleFavoriteRecommends = async (model) => {
    let { postLock, recommends } = this.state;
    let preIndex = null;
    const { isLogin } = staticData;
    const { pid, qid } = model.entity;
    if (!isLogin) {
      this.navto({
        url: '/pages/login/index'
      })
      return
    }
    if (pid) {
      preIndex = recommends.findIndex(item => item.activityId === model.activityId)
    }
    else if (qid) {
      preIndex = recommends.findIndex(item => item.activityId === model.activityId)
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
        recommends[preIndex].entity.isMark = false;
        recommends[preIndex].entity.markes -= 1;
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
        recommends[preIndex].entity.isMark = true;
        recommends[preIndex].entity.markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      recommends: recommends
    })
  }

  handleFavoriteHots = async (model) => {
    let { postLock, hots } = this.state;
    let preIndex = null;
    const { pid, qid } = model;
    if (pid) {
      preIndex = hots.findIndex(item => item.pid === model.pid)
    }
    else if (qid) {
      preIndex = hots.findIndex(item => item.qid === model.qid)
    }
    if (!postLock) {
      if (model.isMark) {
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
        hots[preIndex].isMark = false;
        hots[preIndex].markes -= 1;
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
        hots[preIndex].isMark = true;
        hots[preIndex].markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      hots: hots
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

  subScrUser = async (model) => {
    let { postLock, attentionUsers } = this.state;
    let preIndex = attentionUsers.findIndex(item => item.entity.userId === model.entity.userId)
    if (!postLock) {
      if (model.entity.isSubscribe) {
        this.setState({
          postLock: true
        })
        let res = await Model.cancelAttentionUser(model.entity.userId);
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
        let res = await Model.attentionUser(model.entity.userId);
        this.setState({
          postLock: false
        })
        attentionUsers[preIndex].entity.isSubscribe = true
        if (res) {
          this.showToast('已关注');
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

  getMessageCount = async () => {
    let total = 0;
    let res = await Model.getMessageCount();
    if (res) {
      const { answer, funs, mark, reply, star } = res;
      total = answer + funs + mark + reply + star + total;
      this.setState({
        total
      })
    }

    im.latestConversations().then((res) => {
      console.log('---latestConversations---', res)
      const { code, content } = res;
      if (code == 200) {
        total = content.unreadTotal + total;
        this.setState({
          total,
        })
      }
    }).catch(function (error) {
      console.log("Failed to get the latest conversations, code:" + error.code + " content:" + error.content);
    });
  }

  goMessage = async () => {
    const { userId } = this.getUserInfo();
    Taro.switchTab({
      url: '/pages/message/index'
    })
  }

  closeCollentMini = () => {
    this.setState({
      isCollentMini: false
    })
    this.setCurrentIsCollentMini(2)
  }
}
