import Taro, { getCurrentInstance } from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data.js'
export default class ProfileHomePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: Model.tabs,
      tabsCurrent: 0,
      userInfo: {},
      userId: '',
      postLock: false,
      activeData: [],
      postData: [],
      questionData: [],
      activeDataTotal: 0,
      postDataTotal: 0,
      questionDataTotal: 0,
      isMySelf: false,

      isActiveToBottom: false,
      isPostToBottom: false,
      isQuestionToBottom: false,
      showActiveLoading: true,
      showPostLoading: true,
      showQuestionLoading: true,
      activePageNum: 1,
      postPageNum: 1,
      questionPageNum: 1,
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.onAutoLogin().then(res => {
      this.getActiveData()
      this.getProfileInfo();
    })

  }

  componentWillUnmount() { }

  componentDidShow() {
    if (this.isloaded) {
      this.getProfileInfo();
    }
    this.isloaded = true;
  }

  componentDidHide() { }

  onShareAppMessage(res) {
    const userId = this.getUserInfo().userId;
    let path = `/packageA/pages/profile-home/index?userId=${userId}`;

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

  onReachBottom() {
    const { postLock, isPostToBottom, isActiveToBottom, isQuestionToBottom, tabsCurrent } = this.state;
    if (tabsCurrent === 0) {
      if (!postLock && !isActiveToBottom) {
        this.setState((pre) => ({
          activePageNum: pre.activePageNum + 1
        }), () => {
          this.getActiveData()
        })
      }
    }
    else if (tabsCurrent === 1) {
      if (!postLock && !isPostToBottom) {
        this.setState((pre) => ({
          postPageNum: pre.postPageNum + 1
        }), () => {
          this.getPostData()
        })
      }
    }
    else if (tabsCurrent === 2) {
      if (!postLock && !isQuestionToBottom) {
        this.setState((pre) => ({
          questionPageNum: pre.questionPageNum + 1
        }), () => {
          this.getQuestionData()
        })
      }
    }
  }

  /**
   * tab 点击
   * @param {Number} value 索引
   */
  onClickForTabs(value) {
    this.setState({
      tabsCurrent: value,
    });
    this.initData();
    switch (value) {
      case 0:
        this.getActiveData();
        break;
      case 1:
        this.getPostData();
        break;
      case 2:
        this.getQuestionData();
        break;
    }
  }

  //初始化参数
  initData = () => {
    const { tabsCurrent } = this.state;
    switch (tabsCurrent) {
      case 0:
        this.setState({
          activeData: [],
          postLock: false,
          isActiveToBottom: false,
          showActiveLoading: true,
          activePageNum: 1,
        });
        break;
      case 1:
        this.setState({
          postData: [],
          postLock: false,
          isPostToBottom: false,
          showPostLoading: true,
          postPageNum: 1,
        });
        break;
      case 2:
        this.setState({
          questionData: [],
          postLock: false,
          isQuestionToBottom: false,
          showQuestionLoading: true,
          questionPageNum: 1,
        });
        break;
    }
  }

  //获取个人信息
  getProfileInfo = async () => {
    const { userId } = getCurrentInstance().router.params;
    const mySelfUserId = this.getUserInfo().userId;
    this.setState({
      userId: userId
    })
    let token = this.isLogin();
    if (userId && userId != mySelfUserId) {
      this.setState({
        isMySelf: false
      })
      let res = await Model.getData(token, userId);
      this.setState({
        userInfo: res,
      })
    } else {
      let uid = this.getUserInfo().userId;
      this.setState({
        isMySelf: true
      })
      let res = await Model.getData(token, uid);
      this.setState({
        userInfo: res,
        userId: uid,
      })
    }
  }

  //获取动态数据
  getActiveData = async () => {
    const { activeData, activePageNum } = this.state;
    const { userId } = getCurrentInstance().router.params;
    let uid = null;
    if (userId) {
      uid = userId;
    } else {
      uid = this.getUserInfo().userId;
    }

    this.setState({
      postLock: true
    })
    let res = await Model.getActiveData(uid, activePageNum);
    this.setState({
      postLock: false
    })

    if (res && res.items) {
      const { total, items } = res;
      this.setState({
        activeDataTotal: total
      })
      if (!activeData.length) {
        this.setState({
          activeData: items || []
        })

      } else {
        this.setState((pre) => ({
          activeData: pre.activeData.concat(items || [])
        }))
      }
      if (!total || total <= this.state.activeData.length) {
        this.setState({
          showActiveLoading: false,
          isActiveToBottom: true
        })
      }
    }

  }

  //获取帖子数据
  getPostData = async () => {
    const { postData, postPageNum } = this.state;
    const { userId } = getCurrentInstance().router.params;
    let uid = null;
    if (userId) {
      uid = userId;
    } else {
      uid = this.getUserInfo().userId;
    }
    this.setState({
      postLock: true
    })
    let res = await Model.getPostData(uid, postPageNum);
    this.setState({
      postLock: false
    })
    if (res && res.items) {
      const { total, items } = res;
      this.setState({
        postDataTotal: total
      })
      if (!postData.length) {
        this.setState({
          postData: items || []
        })

      } else {
        this.setState((pre) => ({
          postData: pre.postData.concat(items || [])
        }))
      }
      if (!total || total <= this.state.postData.length) {
        this.setState({
          showPostLoading: false,
          isPostToBottom: true
        })
      }
    }
  }

  //获取问答数据
  getQuestionData = async () => {
    const { questionData, questionPageNum } = this.state;
    const { userId } = getCurrentInstance().router.params;
    let uid = null;
    if (userId) {
      uid = userId;
    } else {
      uid = this.getUserInfo().userId;
    }
    this.setState({
      postLock: true
    })
    let res = await Model.getQuestionData(uid, questionPageNum);
    this.setState({
      postLock: false
    })
    if (res && res.items) {
      const { total, items } = res;
      this.setState({
        questionDataTotal: total
      })
      if (!questionData.length) {
        this.setState({
          questionData: items || []
        })

      } else {
        this.setState((pre) => ({
          questionData: pre.questionData.concat(items || [])
        }))
      }
      if (!total || total <= this.state.questionData.length) {
        this.setState({
          showQuestionLoading: false,
          isQuestionToBottom: true
        })
      }
    }
  }

  //动态收藏
  handleFavoriteActive = async (model) => {
    let { postLock, activeData } = this.state;
    let preIndex = null;
    const { pid, qid } = model.entity;
    if (pid) {
      preIndex = activeData.findIndex(item => item.activityId === model.activityId)
    }
    else if (qid) {
      preIndex = activeData.findIndex(item => item.activityId === model.activityId)
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
        activeData[preIndex].entity.isMark = false;
        activeData[preIndex].entity.markes -= 1;
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
        activeData[preIndex].entity.isMark = true;
        activeData[preIndex].entity.markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      activeData: activeData
    })
  }


  //加入/取消
  handleSubscrCircleActive = async (model) => {
    let { postLock, activeData } = this.state;
    let preIndex = activeData.findIndex(item => item.activityId === model.activityId)
    if (!postLock) {
      if (model.entity.isSubscribe) {
        this.setState({
          postLock: true
        })
        let res = await Model.leaveCircle(model.entity.cid);
        this.setState({
          postLock: false
        })
        activeData[preIndex].entity.isSubscribe = false
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
        activeData[preIndex].entity.isSubscribe = true
        if (res) {
          this.showToast('已加入');
        }
      }
    }
    this.setState({
      activeData: activeData
    })
  }

  //帖子收藏
  handleFavoritePost = async (model) => {
    let { postLock, postData } = this.state;
    let preIndex = postData.findIndex(item => item.pid === model.pid)
    if (!postLock) {
      if (model.isMark) {
        this.setState({
          postLock: true
        })
        let res = await Model.cancelMarkPost(model.pid);
        this.setState({
          postLock: false
        })
        postData[preIndex].isMark = false;
        postData[preIndex].markes -= 1;
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = await Model.markPost(model.pid);
        this.setState({
          postLock: false
        })
        postData[preIndex].isMark = true;
        postData[preIndex].markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      postData: postData
    })
  }

  //问题收藏
  handleFavoriteQuestion = async (model) => {
    console.log('******', model)
    let { postLock, questionData } = this.state;
    let preIndex = questionData.findIndex(item => item.qid === model.qid)
    if (!postLock) {
      if (model.isMark) {
        this.setState({
          postLock: true
        })
        let res = await Model.cancelMarkQuestion(model.qid);
        this.setState({
          postLock: false
        })
        questionData[preIndex].isMark = false;
        questionData[preIndex].markes -= 1;
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = await Model.markQuestion(model.qid);
        this.setState({
          postLock: false
        })
        questionData[preIndex].isMark = true;
        questionData[preIndex].markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      questionData: questionData
    })
  }

  onClickNavTo(type) {
    const { userId } = this.state;
    switch (type) {
      case 'fans'://粉丝
        this.navto({ url: `/packageA/pages/fans/index?userId=${userId}` })
        break;
      case 'circle'://圈子
        this.navto({ url: `/packageA/pages/user-circles/index?userId=${userId}` })
        break;
      case 'focus'://关注
        this.navto({ url: `/packageA/pages/attentions/index?userId=${userId}` })
        break;
    }
  }
  toCircle(cid) {
    if (!cid) return;
    this.navto({
      url: `/packageA/pages/circle-detail/index?cid=${cid}`,
    })
  }
  //个人页面编辑
  editProfile = () => {
    this.navto({
      url: '/packageA/pages/profile-setting-info/index'
    })
  }

  //查看更多宝宝
  viewMoreChild = () => {
    this.navto({
      url: '/packageA/pages/profile-baby/index'
    })
  }
  //设置个人信息
  setProfile = () => {
    const { userId } = this.state;
    this.navto({
      url: '/packageA/pages/profile-setting-privacy/index?uid=' + userId
    })
  }

  //私信
  goToIM = () => {
    const { userInfo: { nickName, userId, headImg } } = this.state;
    this.navto({
      url: `/packageA/pages/message-im/index?name=${nickName}&id=${userId}&headImg=${headImg}`
    })
  }

  //关注
  onSubscr = async () => {
    let { postLock, userInfo, userInfo: { subscr }, userId = 1 } = this.state;
    if (!postLock) {
      if (subscr) {
        this.setState({
          postLock: true
        })
        let res = await Model.cancelAttentionUser(userId);
        this.setState({
          postLock: false
        })
        userInfo.subscr = false
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = await Model.attentionUser(userId);
        this.setState({
          postLock: false
        })
        userInfo.subscr = true
        if (res) {
          this.showToast('已关注');
        }
      }
    }
    this.setState({
      userInfo: userInfo
    })
  }

  subScrUser = async (model) => {
    let { postLock, activeData } = this.state;
    let preIndex = activeData.findIndex(item => item.entity.userId === model.entity.userId)
    if (!postLock) {
      if (model.entity.isSubscribe) {
        this.setState({
          postLock: true
        })
        let res = await Model.cancelAttentionUser(model.entity.userId);
        this.setState({
          postLock: false
        })
        activeData[preIndex].entity.isSubscribe = false
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
        activeData[preIndex].entity.isSubscribe = true
        if (res) {
          this.showToast('已关注');
        }
      }
    }
    this.setState({
      activeData: activeData
    })
  }

  getNickNameColor = (sex) => {
    if (sex === 'MALE') {
      return '#027AFF'
    } else {
      return '#FF1493'
    }
  }

  viewProfileInfo = (uid, e) => {
    e.stopPropagation();
    Taro.navigateTo({
      url: `/packageA/pages/profile-home/index?userId=${uid}`
    })
  }
}
