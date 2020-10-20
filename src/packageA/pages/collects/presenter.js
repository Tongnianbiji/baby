import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabList: Model.tabList,
      currentTab: 0,
      collectData: [
        // {
        //   createAt: "2020-10-14 15:23:21",
        //   entityId: 23,
        //   entityUid: "4a836531a49cf9170ed75dd24b488f78",
        //   title: "1223",
        //   type: 3008,
        //   uid: "4a836531a49cf9170ed75dd24b488f78",
        //   updateAt: "2020-10-14 15:23:21",
        //   userSnapshot: {
        //     headImg: "https://cdn.tongnian.world/head/20170710210234_y3Kf5.thumb.1000_0.jpeg",
        //     nickName: "小景"
        //   }
        // }
      ],
      likeData: [],
      postLock: false,
      isCollectToBottom: false,
      isLikeToBottom: false,
      showCollectLoading: true,
      showLikeLoading: true,
      collectPageNum: 1,
      likePageNum: 1
    }
  }

  componentDidMount() {
    this.getCollectData()
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
    if (res && res.items && res.items.length) {
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
      this.showToast('暂无我的收藏')
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
    if (res && res.items && res.items.length) {
      const { total, items } = res;
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
      this.showToast('暂无我的点赞')
    }
  }

  //点赞
  handleLike =async (model)=>{
    this.showToast('接口少数据')
    let {postLock,likeData} = this.state;
    let preIndex = likeData.findIndex(item=>item.pid === model.pid && item.replyId === model.replyId)
    if(!postLock){
     if(model.isSubscr){
       this.setState({
         postLock:true
       })
       let res = await Model.cancelLikePost(model.pid,model.replyId);
       this.setState({
         postLock:false
       })
       likeData[preIndex].star = false
       if(res){
         this.showToast('已取消');
       }
     }else{
       this.setState({
         postLock:true
       })
       let res = await Model.likePost(model.pid,model.replyId);
       this.setState({
         postLock:false
       })
       likeData[preIndex].star = true
       if(res){
         this.showToast('已点赞');
       }
     }
    }
    this.setState({
      likeData:likeData
    })
  }

  //点击帖子详情
  handlePostDetail(pid) {
    this.navto({
      url: '/packageB/pages/post-detail/index?pid=' + pid
    })
  }
}
