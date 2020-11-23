import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabList: Model.tabList,
      currentTab: 0,
      collectData: [],
      likeData: [],
      postLock: false,
      isCollectToBottom: false,
      isLikeToBottom: false,
      showCollectLoading: true,
      showLikeLoading: true,
      collectPageNum: 1,
      likePageNum: 1,
      currentSharePid: '',
      currentShareQid: ''
    }
  }

  componentDidMount() {
    this.getCollectData();
  }

  componentDidShow() { }

  onReachBottom() {
    const { postLock, isCollectToBottom, isLikeToBottom, currentTab } = this.state;
    if (currentTab === 0) {
      if (!postLock && !isCollectToBottom) {
        this.setState((pre) => ({
          collectPageNum: pre.collectPageNum + 1
        }), () => {
          this.getCollectData()
        })
      }
    } else {
      if (!postLock && !isLikeToBottom) {
        this.setState((pre) => ({
          likePageNum: pre.likePageNum + 1
        }), () => {
          this.getLikeData()
        })
      }
    }
  }

  tabChange = index => {
    this.setState({ currentTab: index });
    this.initData();
    if (index === 0) {
      this.getCollectData()
    } else {
      this.getLikeData()
    }
  }

  //初始化参数
  initData = () => {
    const { currentTab } = this.state;
    if (currentTab === 0) {
      this.setState({
        collectData: [],
        postLock: false,
        isCollectToBottom: false,
        showCollectLoading: true,
        collectPageNum: 1,
      })
    } else {
      this.setState({
        likeData: [],
        postLock: false,
        isLikeToBottom: false,
        showLikeLoading: true,
        likePageNum: 1
      })
    }
  }

  //获取收藏数据
  getCollectData = async () => {
    const { collectData, collectPageNum } = this.state;
    const { userId } = this.getUserInfo();
    this.setState({
      postLock: true
    })
    let res = await Model.getCollectData(userId, collectPageNum);
    this.setState({
      postLock: false
    })
    if (res && res.items) {
      const { total, items } = res;
      if (!collectData.length) {
        this.setState({
          collectData: items || []
        })

      } else {
        this.setState((pre) => ({
          collectData: pre.collectData.concat(items || [])
        }))
      }
      if (total <= this.state.collectData.length) {
        this.setState({
          showCollectLoading: false,
          isCollectToBottom: true
        })
      }
    } else {
      // this.showToast('暂无我的收藏')
    }
  }

  //获取我的点赞数据
  getLikeData = async () => {
    const { likeData, likePageNum } = this.state;
    const { userId } = this.getUserInfo();
    this.setState({
      postLock: true
    })
    let res = await Model.getLikeData(userId, likePageNum);
    this.setState({
      postLock: false
    })
    if (res && res.items) {
      const { total, items } = res;
      items.forEach(likeItem=>{
        likeItem.entity.replyId = likeItem.originalId;
        likeItem.entity.isLikes=true
      })
      if (!likeData.length) {
        this.setState({
          likeData: items || []
        })

      } else {
        this.setState((pre) => ({
          likeData: pre.likeData.concat(items || [])
        }))
      }
      if (total <= this.state.likeData.length) {
        this.setState({
          showLikeLoading: false,
          isLikeToBottom: true
        })
      }
    } else {
      // this.showToast('暂无我的点赞')
    }
  }

  //收藏
  handleFavorite = async (model) => {
    let { postLock, collectData } = this.state;
    let preIndex = null;
    const { pid, qid } = model;
    if (pid) {
      preIndex = collectData.findIndex(item => item.entity.pid === model.pid)
    }
    else if (qid) {
      preIndex = collectData.findIndex(item => item.entity.qid === model.qid)
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
        collectData[preIndex].entity.isMark = false;
        collectData[preIndex].entity.markes -= 1;
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
        collectData[preIndex].entity.isMark = true;
        collectData[preIndex].entity.markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      collectData: collectData
    })
  }

  //点赞
  handleLike = async (model) => {
    console.log('点赞',model)
    let { postLock, likeData } = this.state;
    const { pid, qid } = model;
    let preIndex = null;
    if (pid) {
      preIndex = likeData.findIndex(item => item.entity.pid === pid && item.entity.replyId === model.replyId)
    }
    else if (qid) {
      preIndex = likeData.findIndex(item => item.entity.qid === qid && item.entity.replyId === model.replyId)
    }
    if (!postLock) {
      if (model.isLikes) {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.cancelLikePost(model.pid, model.replyId);
        }
        else if (qid) {
          res = await Model.cancelLikeQuestion(model.qid, model.replyId);
        }
        this.setState({
          postLock: false
        })
        likeData[preIndex].entity.isLikes = false
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.likePost(model.pid, model.replyId);
        }
        else if (qid) {
          res = await Model.likeQuestion(model.qid, model.replyId);
        }
        this.setState({
          postLock: false
        })
        likeData[preIndex].entity.isLikes = true
        if (res) {
          this.showToast('已点赞');
        }
      }
    }
    this.setState({
      likeData: likeData
    })
  }

  //点击帖子详情
  handlePostDetail(pid) {
    this.navto({
      url: '/packageB/pages/post-detail/index?pid=' + pid
    })
  }
}
