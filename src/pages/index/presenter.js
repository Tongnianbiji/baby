import BaseComponent from '../../common/baseComponent'
import React from 'react'
import Model from './model'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import staticData from '@src/store/common/static-data'
import Storage from '@common/localStorage'
import analysisHelper from '@helper/analysisHelper';
const { goEasy: im } = staticData;
let exposureIdList = new Set();
let timer = null;
let pagePadding = 0;
let pageTop = 0;
const windowWidth = Taro.getSystemInfoSync().windowWidth;
pagePadding = windowWidth / 750 * 32 * 2;
pageTop = windowWidth / 750 * 165;
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
      isPullDownRefresh: false,
      showOpPanel: false,
    }
    this.recommendsExposuredList = new Set();
    this.attentionUsersExposuredList = new Set();
    this.hotsExposuredList1 = new Set();
    this.hotsExposuredList2 = new Set();
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     isCollectMin:false
    //   })
    // }, 5e3);
    this.onAutoLogin().then(res => {
      this.getrecommends();
      this.gethots();
      this.getInviter()

      this.connectGoeasyIm();

      this.setCommonAnalysisData();

      this.setState({
        currentCity: this.getCurrentCity()
      })
    })
  }

  componentDidShow() {
    if (this.isLoaded && staticData.isLogin) {
      this.getMessageCount();
      this.setState({
        currentCity: this.getCurrentCity()
      })
    }
    this.isLoaded = true;
  }
  setCommonAnalysisData() {
    const {
      lat,
      lon,
      provinceCode,
      cityCode,
      countryCode,
      cityCodeCode,
      countryCodeCode
    } = this.getCurrentLocation();
    const { tabId } = this.state;

    analysisHelper.setCommonData({
      lat: lat,
      lon: lon,
      provinceCode: provinceCode,
      cityCode: cityCodeCode,
      countryCode: countryCodeCode,
      tabId: tabId,
      uid: staticData.userId || 'guest'
    })
  }
  connectGoeasyIm() {
    if (!Storage.getInstance().getToken()) return;
    // if (!staticData.isLogin) return;
    const { userId } = staticData;
    console.log('---userId---', userId)
    //连接GoEasy
    im.connect({
      id: userId
    }).then(() => {
      console.log("Connection successful.");
      this.getMessageCount();
    }).catch(function (error) {
      console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
    });

  }
  async onPullDownRefresh() {
    // TODO - showNewInfoBar节流优化
    clearTimeout(this.newInfoBarTimer);
    this.setState({
      isPullDownRefresh: true,
      // recommends: [],
    })
    Taro.vibrateShort();

    const { currentTopTab } = this.state;
    if (currentTopTab === 1) {
      await this.getrecommends();
      this.setState({
        showNewInfoBar: true,
        isPullDownRefresh: false
      }, () => {
        this.newInfoBarTimer = setTimeout(() => {
          this.setState({
            showNewInfoBar: false,
          })
        }, 2000);
      })
    }

    Taro.stopPullDownRefresh()

  }

  onShareAppMessage(res) {
    let path = '';
    const userId = staticData.userId;

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
          })
        }
      }
    }
    else if (currentTopTab === 1) {
      if (!postLock) {
        // Taro.showLoading();
        await this.getrecommends(2);
        // Taro.hideLoading();
        // this.setState({
        //   showRecommendLoading: false
        // })
      }
    }
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
      analysisHelper.singleExposure({
        trackName: '首页一级tab切换',
        tabId: tabId,
        eventType: 2,
      });
    })

  }

  attentionTabChange = type => {
    let tabId = null;
    const { attentionUsers } = this.state;
    this.setState({ attentionType: type + 1 },
      () => {
        if (type === 0) {
          if (!attentionUsers.length) {
            this.getAttentionUsers();
            return;
          }
          this.addAttentionUsersExposure(true);
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
    analysisHelper.singleExposure({
      trackName: '首页关注tab切换',
      tabId: tabId,
      eventType: 2,
    });
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
    this.gethots(true);
    analysisHelper.singleExposure({
      trackName: '首页热榜tab切换',
      tabId: tabId,
      eventType: 2,
    });
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
    const { userId } = staticData;
    this.setState({
      postLock: true
    })
    let res = await Model.getAttentionUsers(userId, attentionPageNum);
    this.setState({
      postLock: false
    })
    if (res && res.items) {
      const { total, items } = res;
      const newAttentionUsers = attentionUsers.length ? attentionUsers.concat(items || []) : items || [];
      this.setState({
        attentionUsers: newAttentionUsers,
      }, () => {
        this.addAttentionUsersExposure();
      });

      if (total <= this.state.attentionUsers.length) {
        this.setState({
          showAttentionLoading: false,
          isAttentionToBottom: true
        })
      }
    } else {
      this.setState({
        showAttentionLoading: false,
        isAttentionToBottom: false
      })
    }
  }
  addAttentionUsersExposure(isNodeReload = false) {
    if (this.state.attentionUsers.length == 0 || isNodeReload) {
      this.attentionUsersExposuredList.clear();
    }
    setTimeout(() => {
      this.state.attentionUsers.forEach(item => {
        let isQa = false;
        let id = 0;
        if (!item.entity) return;
        id = item.entity.qid || item.entity.pid;
        if (!id) return; // 有可能不是帖子也不是问答
        isQa = !!item.entity.qid;

        if (!this.attentionUsersExposuredList.has(`${isQa + 1}_${id}`)) {
          this.attentionUsersExposuredList.add(`${isQa + 1}_${id}`);
          Taro.createIntersectionObserver().relativeToViewport({ bottom: -70, top: -pageTop - 70, left: -pagePadding, right: -pagePadding }).observe(`#attention-users-item-${id}`, (res) => {
            if (res.intersectionRatio == 0) return;
            console.log(`------#attention-users-item-${id}-进入视图------`, res);
            analysisHelper.exposure({
              trackName: `首页关注的用户${isQa ? '问答' : '帖子'}列表曝光`,
              contentIdList: [id.toString()],
              contentType: isQa ? 3 : 1,
              eventType: 1,
              tabId: 100100,
            });
          })
        }
      })
    }, 500);
  }
  //获取推荐数据
  getrecommends = async (type = 1) => {
    //type 1:下拉刷新；2:上拉刷新
    const oldRecommends = this.state.recommends;
    this.setState({
      postLock: true, // TODO - 这是啥
    })

    let moreRecommends = await Model.getrecommends();
    if (moreRecommends.length == 0) {
      await Model.clearRead(staticData.userId);
      moreRecommends = await Model.getrecommends();
    }

    if (moreRecommends) {
      const newRecommends = type == 1 ? [...moreRecommends, ...oldRecommends] : [...oldRecommends, ...moreRecommends];
      this.setState({
        recommends: newRecommends.slice(0, type == 1 ? 10 : newRecommends.length - 1),
        recommendsLength: moreRecommends.length,
        postLock: false,
        pageState: newRecommends.length > 0 ? 'over' : 'noData',
      }, () => {
        this.addRecommendsExposure();
      });
    } else {
      this.setState({
        pageState: 'error',
      })
    }
  }
  addRecommendsExposure(isNodeReload = false) {
    if (this.state.recommends.length == 0 || isNodeReload) {
      this.recommendsExposuredList.clear();
    }
    setTimeout(() => {
      this.state.recommends.forEach(item => {
        let isQa = false;
        let id = 0;
        if (!item.entity) return;

        isQa = !!item.entity.qid;
        id = item.entity.qid || item.entity.pid;
        if (!this.recommendsExposuredList.has(`${isQa + 1}_${id}`)) {
          this.recommendsExposuredList.add(`${isQa + 1}_${id}`);
          Taro.createIntersectionObserver().relativeToViewport({ bottom: -70, top: -pageTop - 70, left: -pagePadding, right: -pagePadding }).observe(`#recommends-item-${id}`, (res) => {
            if (res.intersectionRatio == 0) return;
            console.log(`------#recommends-item-${id}-进入视图------`, res);
            analysisHelper.exposure({
              trackName: `首页推荐${isQa ? '问答' : '帖子'}列表曝光`,
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
  gethots = async (isReload = false) => {
    if (isReload) {
      this.setState({
        hots: [],
      })
    }
    const { hotTabType } = this.state;
    let res = {};
    if (hotTabType === 1) {
      res = await Model.gethots(1);
      this.setState({
        hots: res.slice(0, 5) || []
      }, () => {
        // this.addHotsExposure1(isReload);
        setTimeout(() => {
          this.setState({
            hots: res || []
          }, () => {
            this.addHotsExposure1(isReload);
          })
        }, 0);


      })
    } else {
      res = await Model.gethots(2);
      this.setState({
        hots: res.slice(0, 5) || []
      }, () => {
        // this.addHotsExposure1(isReload);
        setTimeout(() => {
          this.setState({
            hots: res || []
          }, () => {
            this.addHotsExposure1(isReload);
          })
        }, 0);

      })
    }
    if (res) {

    }
  }
  addHotsExposure1(isNodeReload = false) {
    if (this.state.hots.length == 0 || isNodeReload) {
      this.hotsExposuredList1.clear();
    }
    const { tabId, hotTabType } = this.state;
    setTimeout(() => {
      this.state.hots.forEach(item => {
        if (!this.hotsExposuredList1.has(`${hotTabType}_${item.pid}`)) {
          this.hotsExposuredList1.add(`${hotTabType}_${item.pid}`);
          Taro.createIntersectionObserver().relativeToViewport({ bottom: -70, top: -pageTop - 70, left: -pagePadding, right: -pagePadding }).observe(`#hots-${hotTabType}-item-${item.pid}`, (res) => {
            if (res.intersectionRatio == 0) return;
            console.log(`------#hots-${hotTabType}-item-${item.pid}-进入视图------`, res);
            analysisHelper.exposure({
              trackName: `首页热榜近24小时帖子列表曝光`,
              contentIdList: [item.pid.toString()],
              contentType: 1,
              eventType: 1,
              tabId: 130100,
            });
          })
        }
      })
    }, 500);
  }
  addHotsExposure2(isNodeReload = false) {
    if (this.state.hots.length == 0 || isNodeReload) {
      this.hotsExposuredList2.clear();
    }
    const { tabId, hotTabType } = this.state;
    setTimeout(() => {
      this.state.hots.forEach(item => {
        if (!this.hotsExposuredList2.has(`${hotTabType}_${item.pid}`)) {
          this.hotsExposuredList2.add(`${hotTabType}_${item.pid}`);
          Taro.createIntersectionObserver().relativeToViewport({ bottom: -70, top: -70, left: -pagePadding, right: -pagePadding }).observe(`#hots-${hotTabType}-item-${item.pid}`, (res) => {
            if (res.intersectionRatio == 0) return;
            console.log(`------#hots-${hotTabType}-item-${item.pid}-进入视图------`, res);
            analysisHelper.exposure({
              trackName: `首页热榜近7天帖子列表曝光`,
              contentIdList: [item.pid.toString()],
              contentType: 1,
              eventType: 1,
              tabId: 130200,
            });
          })
        }
      })
    }, 500);
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
    const { userId } = staticData;
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
  troggleOpPanel = () => {
    this.setState({
      showOpPanel: !this.state.showOpPanel
    })
  }

  toCreatePost = () => {
    const { cid, cname = '' } = getCurrentInstance().router.params
    const { isLogin } = staticData;
    if (isLogin) {
      this.navto({ url: `/packageB/pages/create-post/index?cid=${cid}&cname=${cname}&from=home` })
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
  }

  toCreateIssue = () => {
    const { cid, cname = '' } = getCurrentInstance().router.params;
    const { isLogin } = staticData;
    if (isLogin) {
      this.navto({ url: `/packageB/pages/create-issue/index?cid=${cid}&cname=${cname}}&from=home` })
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
  }
  //全局刷新
  overallFreshList = () => {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    this.onPullDownRefresh();
  }
}
