import { observable, action, set } from 'mobx'
import Taro from '@tarojs/taro'
import Request from '../common/baseRequest'
import BaseComponent from '@common/baseComponent'
import GetDistance from '@common/utils/calcDistance'

const req = new Request()

const state = {
  // 基本信息
  detailInfo: {},
  loading: true,
  noData: false,
  isAttentioned: false,
  favoriteLock: false,
  cid: '',
  listType: 1,
  centerHeight: '',
  fixed: false,
  postLock: false,
  showOpPanel:false,
  //是否定制圈子
  isCustomCircle:false,
  customConfig:{},

  //顶部排序tab
  activeTopTab:0,
  sortObj:{},
  //子tab active tags
  activeTags: new Set(),
  activeTagsId: new Set(),

  // 置顶公告/帖子
  topPosts: [],

  // 相关圈子
  parentCircles: [],
  childCircles: [],
  parentCirclesLength:0,
  childCirclesLength:0,

  //对应圈子帖子列表
  circlePosts: [],
  postsPageNum: 1,
  loadingPosts: true,
  isToBottomPosts: false,
  //对应圈子精华列表
  circleEssence: [],
  essencePageNum: 1,
  loadingEssence: true,
  isToBottomEssence: false,
  //对应圈子问答列表
  circleQuestion: [],
  questionPageNum: 1,
  loadingQuestion: true,
  isToBottomQuestion: false,
  //对应圈子热版列表
  circleHots: [],
  hotsPageNum: 1,
  loadinghots: true,
  isToBottomhots: false,
  //对应圈子用户列表
  circleUser: [],
  userPageNum: 1,
  loadingUser: true,
  isToBottomUser: false,
}

const actions = {

  async initData(){
    this.listType=1;
    this.detailInfo={};
    this.customConfig={};
    this.activeTags=new Set();
    this.activeTagsId=new Set();
    this.topPosts=[];
    this.parentCircles=[];
    this.childCircles=[];
    this.circlePosts=[];
    this.circleEssence=[];
    this.circleQuestion=[];
    this.circleUser=[];
    this.postsPageNum=1;
    this.loadingPosts=true;
    this.isToBottomPosts=false;
    this.essencePageNum=1;
    this.loadingEssence=true;
    this.isToBottomEssence=false;
    this.questionPageNum=1;
    this.loadingQuestion=true;
    this.isToBottomQuestion=false;
    this.userPageNum=1;
    this.loadingUser=true;
    this.isToBottomUser=false;
    this.circleHots=[];
    this.hotsPageNum=1;
    this.loadinghots=true;
    this.isToBottomhots=false;
  },

  async getDetail(cid) {
    this.loading = true
    const ret = await req.postWithToken('/circle/visit', { cid })
    const data = req.standardResponse(ret)
    this.loading = false

    if (data.code === 0 && data.data) {
      this.detailInfo = data.data
      return data.data
    } else {
      this.noData = true
      return {}
    }
  },
  async getTopPost(cid) {
    const ret = await req.postWithToken('/circle/top/post', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0 && d.data && (d.data.items || []).length) {
      let tmp = []
      const r = []
      d.data.items.map(item => {
        if (tmp.length === 2) {
          r.push(tmp)
          tmp = []
        } else {
          tmp.push(item)
        }
      })
      this.topPosts = r
    }
  },

  async getParentCircles(cid) {
    const ret = await req.postWithToken('/circle/parents/base', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0) {
      //只显示一个父圈子多余的不显示
      if(d.data.items){
        this.parentCircles = d.data.items || [];
        this.parentCirclesLength=d.data.total;
      }
    }
  },

  async getChildCircles(cid) {
    const ret = await req.postWithToken('/circle/children/base', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0) {
      //只显示3个子圈子多余的不显示
      if(d.data.items){
        this.childCircles = d.data.items || [];
        this.childCirclesLength=d.data.total;
      }
      
    }
  },
  async getSiblingCircles(cid) {
    const ret = await req.postWithToken('/circle/sibling/base', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0) {
      //只显示3个子圈子多余的不显示
      if(d.data.items){
        this.childCircles = d.data.items || [];
        this.childCirclesLength=d.data.total;
      }
    }
  },

  //获取圈子对应的帖子列表
  async getCirclePosts(cid, isReload = false) {
    if (isReload) {
      this.postsPageNum = 1;
      this.circlePosts = [];
      this.isToBottomPosts = false;
      this.loadingPosts = true;
    }
    let params = {
      cid: cid,
      tagIds: Array.from(this.activeTagsId),
      pageNum: this.postsPageNum,
      pageSize: 10,
      sort:this.sortObj
    }
    this.postLock = true;
    const ret = await req.postWithToken('/search/circle/post', params);
    const d = req.standardResponse(ret);
    this.postLock = false;
    if (d.code === 0) {
      if (!this.circlePosts.length) {
        this.circlePosts = d.data.items || []
      } else {
        this.circlePosts = this.circlePosts.concat(d.data.items || [])
      }
      if (d.data.total <= this.circlePosts.length) {
        this.isToBottomPosts = true;
        this.loadingPosts = false;
      }
    }
    return this.circlePosts
  },

  //获取圈子对应的精华列表
  async getCircleEssence(cid) {
    let params = {
      cid: cid,
      tagIds: Array.from(this.activeTagsId),
      pageNum: this.essencePageNum,
      pageSize: 5,
      sort:this.sortObj
    }
    this.postLock = true;
    const ret = await req.postWithToken('/search/circle/essence', params)
    const d = req.standardResponse(ret)
    this.postLock = false;
    if (d.code === 0) {

      if (!this.circleEssence.length) {
        this.circleEssence = d.data.items || []
      } else {
        this.circleEssence = this.circleEssence.concat(d.data.items || [])
      }
      if (d.data.total <= this.circleEssence.length) {
        this.isToBottomEssence = true;
        this.loadingEssence = false;
      }
    }
  },

  //获取圈子对应的问答列表
  async getCircleQuestion(cid, isReload = false) {
    if (isReload) {
      this.questionPageNum = 1;
      this.circleQuestion = [];
      this.isToBottomQuestion = false;
      this.loadingQuestion = true;
    }
    let params = {
      cid: cid,
      tagIds: Array.from(this.activeTagsId),
      pageNum: this.questionPageNum,
      pageSize: 10,
      sort:this.sortObj
    }
    this.postLock = true;
    const ret = await req.postWithToken('/search/circle/question', params)
    const d = req.standardResponse(ret)
    this.postLock = false;
    if (d.code === 0) {

      if (!this.circleQuestion.length) {
        this.circleQuestion = d.data.items || []
      } else {
        this.circleQuestion = this.circleQuestion.concat(d.data.items || [])
      }
      if (d.data.total <= this.circleQuestion.length) {
        this.isToBottomQuestion = true;
        this.loadingQuestion = false;
      }
    }
  },
  async initCircleQuestion() {
    const { cid } = this;
    this.getCircleQuestion(cid, true);
  },
  async initCirclePosts() {
    const { cid } = this;
    this.getCirclePosts(cid, true);
  },
  //获取圈子对应的热版列表
  async getCircleHots(cid,type=1) {
    let params = {
      cid: cid,
      type,
    }
    this.postLock = true;
    const ret = await req.postWithToken('/search/circle/hotspot', params);
    const d = req.standardResponse(ret);
    this.postLock = false;
    if (d.code === 0) {
      this.circleHots = d.data || []
    }
  },

  //获取圈子对应的用户列表
  async getCircleUser(cid) {
    const {lat,lon} = (new BaseComponent()).getCurrentLocation()
    let params = {
      cid: cid,
      keyword: '',
      pageNum: this.userPageNum,
      pageSize: 5,
      sort:{
        location:'asc'
      }
    }
    this.postLock = true;
    const ret = await req.postWithToken('/search/circle/user', params)
    const d = req.standardResponse(ret)
    this.postLock = false;
    if (d.code === 0) {
      let userList = d.data.items;
      // userList.forEach(item=>{
      //   item.distance = GetDistance(lat,lon,item.lat,item.lng)
      // })
      if (!this.circleUser.length) {
        this.circleUser = userList || []
      } else {
        this.circleUser = this.circleUser.concat(userList || [])
      }
      if (d.data.total <= this.circleUser.length) {
        this.isToBottomUser = true;
        this.loadingUser = false;
      }
    }
    //this.circleUser = this.sortDistance(this.circleUser);
  },

  //排序
  sortDistance(arr){
    const stableSorting = (s1, s2) => {
      let s1D = s1.distance.slice(0,s1.distance.length-2);
      let s2D = s2.distance.slice(0,s2.distance.length-2)
      if (s1D < s2D) return -1;
      return 1;
    };
    return arr.sort(stableSorting);
  },

  //获取定制圈子配置查询
  async getCustomCircleConfig(cid){
    let params = {
      cid: cid
    }
    this.postLock = true;
    const ret = await req.postWithToken('/circle/custom/query', params);
    const d = req.standardResponse(ret)
    this.postLock = false;
  },


  async getAttentionState(cid) {
    const ret = await req.postWithToken('/relation/circle/isSubscribe', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0) {
      this.isAttentioned = d.data
    }
  },

  async joinCircle(cid) {
    const ret = await req.postWithToken('/relation/circle/join', { cid })
    const d = req.standardResponse(ret)
    let ok = false
    if (d.code === 0 && d.data) {
      this.isAttentioned = true
      ok = true
    }
    return ok
  },

  async leaveCircle(cid) {
    const ret = await req.postWithToken('/relation/circle/leave', { cid })
    const d = req.standardResponse(ret)
    let ok = false
    if (d.code === 0 && d.data) {
      this.isAttentioned = false
      ok = true
    }
    return ok
  },

  updateOpPanel(status){
    this.showOpPanel = status;
  },

  //收藏帖子
  async favoritePost(pid) {
    const ret = await req.postWithToken('/post/mark', { pid })
    const d = req.standardResponse(ret)
    console.log('收藏', d)
    return d.code;
  },
  //取消收藏帖子

  async cancelFavoritePost(pid) {
    const ret = await req.postWithToken('/post/mark/cancel', { pid })
    const d = req.standardResponse(ret)
    console.log('取消收藏', d)
    return d.code;
  },

  //收藏问答
  async favoriteQuestion(qid) {
    const ret = await req.postWithToken('/question/mark', { qid })
    const d = req.standardResponse(ret)
    console.log('收藏', d)
    return d.code;
  },
  //取消收藏问答

  async cancelFavoriteQuestion(qid) {
    const ret = await req.postWithToken('/question/mark/cancel', { qid })
    const d = req.standardResponse(ret)
    console.log('取消收藏', d)
    return d.code;
  },

  //关注用户与取消
  async cancelAttentionUser(userId) {
    let params = {
      userId
    }
    const ret = await req.postWithToken('/subscr/delete', params)
    const data = req.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async attentionUser(userId) {
    let params = {
      userId
    }
    const ret = await req.postWithToken('/subscr/submit', params)
    const data = req.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  //更新是否显示定制圈子
  updateCustomStatus(status){
    this.isCustomCircle = status
  },

  //保存定制圈子的配置
  saveCustomConfig(config){
    this.customConfig = config
  },

   //更新定制圈子区域配置
   updateCustomRegionFlag(flag){
    this.customConfig.defaultRegionFlag = flag;
  },
   //更新定制圈子年龄配置
   updateCustomAgeGroupFlag(flag){
    this.customConfig.defaultGroupFlag = flag;
  },

  //获取获取圈子cid
  updateCircleId(cid) {
    this.cid = cid;
  },

  //更新顶部排序tab
  updateActiveTopTab(tab){
    this.activeTopTab = tab;
    switch(tab){
      case 0:
        this.sortObj= {heat_rate:'desc'};
        break;
      case 1:
        this.sortObj= {create_time:'desc'};
        break;
      case 2:
        this.sortObj= {last_reply_time:'desc'};
        break;
    }
  },

  //切换子tag关键词数组
  updateActiveTags(tag) {
    if (this.activeTags.has(tag.tagId)) {
      this.activeTags.delete(tag.tagId)
    } else {
      this.activeTags.add(tag.tagId)
    }
    if (this.activeTagsId.has(tag.tagId)) {
      this.activeTagsId.delete(tag.tagId)
    } else {
      this.activeTagsId.add(tag.tagId)
    }
  },
  //清空tag
  clearActiveTags() {
    this.activeTags.clear();
    this.activeTagsId.clear()
  },


  //更新tabtype
  updateListType(tabType) {
    this.listType = tabType
  },
  //更新是否冻住
  updateIsFiexd(status) {
    this.fixed = status
  },

  //更新冻住框子的中心高度
  updateCenterHeight(centerHeight) {
    this.centerHeight = centerHeight
  },

  //更新tab所对应列表的pageNum
  updateTabPageNum(tab) {
    switch (tab) {
      case 0:
        this.essencePageNum += 1;
        break;
      case 1:
        this.postsPageNum += 1;
        break;
      case 2:
        this.questionPageNum += 1;
        break;
      case 4:
        this.userPageNum += 1;
        break;
    }
  },

  //重置对应tab的列表状态
  resetTabListStatus(tab) {
    switch (tab) {
      case 0:
        this.essencePageNum = 1;
        this.circleEssence = [];
        this.loadingEssence = true;
        this.isToBottomEssence = false;
        break;
      case 1:
        this.postsPageNum = 1;
        this.circlePosts = [];
        this.loadingPosts = true;
        this.isToBottomPosts = false;
        break;
      case 2:
        this.questionPageNum = 1;
        this.circleQuestion = [];
        this.loadingQuestion = true;
        this.isToBottomQuestion = false;
        break;
      case 4:
        this.userPageNum = 1;
        this.circleUser = [];
        this.loadingUser = true;
        this.isToBottomUser = false;
        break;
    }
  },

  isTabCash(tab) {
    const { circlePosts, circleEssence, circleQuestion, circleUser } = this
    switch (tab) {
      case 0:
        return !!circleEssence.length;
      case 1:
        return !!circlePosts.length;
      case 2:
        return !!circleQuestion.length;
      case 4:
        return !!circleUser.length;
    }
  },

  async typeTabPost() {
    const { cid, listType } = this;
    switch (listType) {
      case 0:
        await this.getCircleEssence(cid);
        break;
      case 1:
        await this.getCirclePosts(cid);
        break;
      case 2:
        await this.getCircleQuestion(cid);
        break;
      case 3:
        await this.getCircleHots(cid);
        break;
      case 4:
        await this.getCircleUser(cid);
        break;
      case 5:
        await this.getCustomCircleConfig(cid);
        break;
    }
  },

  isToBottom() {
    const { isToBottomPosts, isToBottomEssence, isToBottomQuestion, isToBottomUser, listType } = this;
    switch (listType) {
      case 0:
        return isToBottomEssence;
      case 1:
        return isToBottomPosts;
      case 2:
        return isToBottomQuestion;
      case 4:
        return isToBottomUser;
    }
  },

  setIsToBottom(status) {
    this.isToBottom = status;
  },
  setCirclePostsEmpty() {
    this.circlePosts = []
  },
  updateCirclePosts(posts){
    this.circlePosts = posts
  },

  updateCirclePostsByFavorite(pid) {
    Taro.showLoading();
    let circlePosts = this.circlePosts;
    this.postLock = true;
    circlePosts.forEach(async item => {
      if (item.pid === pid) {
        if (item.isMark) {
          let code = await this.cancelFavoritePost(pid);
          this.postLock = false;
          Taro.hideLoading();
          if (code === 0) {
            item.isMark = false;
            item.markes -= 1;
            this.circlePosts = JSON.parse(JSON.stringify(circlePosts));
            Taro.showToast({
              title:'取消收藏',
              icon: 'none',
              duration:2e3
            })
          } else {
            Taro.showToast({
              title:'取消失败',
              icon: 'none',
              duration:2e3
            })
          }
        } else {
          let code = await this.favoritePost(pid);
          this.postLock = false;
          Taro.hideLoading();
          if (code === 0) {
            item.isMark = true;
            item.markes += 1;
            this.circlePosts = JSON.parse(JSON.stringify(circlePosts));
            Taro.showToast({
              title:'已收藏',
              icon: 'success',
              duration:2e3
            })
          } else {
            Taro.showToast({
              title:'收藏失败',
              icon: 'none',
              duration:2e3
            })
          }
        }
      }
    })
  },

  updateCircleQuestionsByFavorite(qid) {
    Taro.showLoading();
    let circleQuestion = this.circleQuestion;
    this.postLock = true;
    circleQuestion.forEach(async item => {
      if (item.qid === qid) {
        if (item.isMark) {
          let code = await this.cancelFavoriteQuestion(qid);
          this.postLock = false;
          Taro.hideLoading();
          if (code === 0) {
            item.isMark = false;
            item.markes -= 1;
            this.circleQuestion = JSON.parse(JSON.stringify(circleQuestion));
            Taro.showToast({
              title:'取消收藏',
              icon: 'none',
              duration:2e3
            })
          } else {
            Taro.showToast({
              title:'取消失败',
              icon: 'none',
              duration:2e3
            })
          }
        } else {
          let code = await this.favoriteQuestion(qid);
          this.postLock = false;
          Taro.hideLoading();
          if (code === 0) {
            item.isMark = true;
            item.markes += 1;
            this.circleQuestion = JSON.parse(JSON.stringify(circleQuestion));
            Taro.showToast({
              title:'已收藏',
              icon: 'success',
              duration:2e3
            })
          } else {
            Taro.showToast({
              title:'收藏失败',
              icon: 'none',
              duration:2e3
            })
          }
        }
      }
    })
  },

  updateCircleHotsByFavorite(pid) {
    Taro.showLoading();
    let circleHots = this.circleHots;
    this.postLock = true;
    circleHots.forEach(async item => {
      if (item.pid === pid) {
        if (item.isMark) {
          let code = await this.cancelFavoritePost(pid);
          this.postLock = false;
          Taro.hideLoading();
          if (code === 0) {
            item.isMark = false;
            item.markes -= 1;
            this.circleHots = JSON.parse(JSON.stringify(circleHots));
            Taro.showToast({
              title:'取消收藏',
              icon: 'none',
              duration:2e3
            })
          } else {
            Taro.showToast({
              title:'取消失败',
              icon: 'none',
              duration:2e3
            })
          }
        } else {
          let code = await this.favoritePost(pid);
          this.postLock = false;
          Taro.hideLoading();
          if (code === 0) {
            item.isMark = true;
            item.markes += 1;
            this.circleHots = JSON.parse(JSON.stringify(circleHots));
            Taro.showToast({
              title:'已收藏',
              icon: 'success',
              duration:2e3
            })
          } else {
            Taro.showToast({
              title:'收藏失败',
              icon: 'none',
              duration:2e3
            })
          }
        }
      }
    })
  },

  async updateCircleUserSubsrc(model){
    let {postLock,circleUser} = this;
    let preIndex = circleUser.findIndex(item=>item.userId === model.userId)
    if(!postLock){
     if(model.isSubscribe){
       this.postLock = true;
       let res = await this.cancelAttentionUser(model.userId);
       this.postLock = false;
       circleUser[preIndex].isSubscribe = false
       if(res){
         Taro.showToast({
           title:'已取消',
           icon:'none'
         });
       }
     }else{
      this.postLock = true;
       let res = await this.attentionUser(model.userId);
       this.postLock = false;
       circleUser[preIndex].isSubscribe = true
       if(res){
        Taro.showToast({
          title:'已关注',
          icon:'none'
        });
       }
     }
    }
    this.circleUser=circleUser
   }
}

export default observable(Object.assign(state, actions))