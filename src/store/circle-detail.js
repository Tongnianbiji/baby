import { observable, action, set } from 'mobx'
import Taro from '@tarojs/taro'
import Request from '../common/baseRequest'

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

  //子tab active tags
  activeTags: new Set(),
  activeTagsId: new Set(),

  // 置顶公告/帖子
  topPosts: [],

  // 相关圈子
  parentCircles: [
    {
      cid: 1,
      imgUrl: '#',
      name: '父圈子1'
    }
  ],
  childCircles: [
    {
      cid: 1,
      imgUrl: '#',
      name: '子圈子'
    },
    {
      cid: 1,
      imgUrl: '#',
      name: '子圈子'
    },
    {
      cid: 1,
      imgUrl: '#',
      name: '子圈子'
    },
    {
      cid: 1,
      imgUrl: '#',
      name: '子圈子'
    }
  ],

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
  //对应圈子用户列表
  circleUser: [],
  userPageNum: 1,
  loadingUser: true,
  isToBottomUser: false,
}

const actions = {
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
    // if (d.code === 0) {
    //   //只显示一个父圈子多余的不显示
    //   this.parentCircles = d.data.items.slice(0,1) || []
    // }
  },

  async getChildCircles(cid) {
    const ret = await req.postWithToken('/circle/children/base', { cid })
    const d = req.standardResponse(ret)
    // if (d.code === 0) {
    //   //只显示3个子圈子多余的不显示
    //   this.childCircles = d.data.items.slice(0,3) || []
    // }
  },

  async getSiblingCircles(cid) {
    const ret = await req.postWithToken('/circle/sibling/base', { cid })
    const d = req.standardResponse(ret)
    // if (d.code === 0) {
    //   //只显示3个子圈子多余的不显示
    //   this.childCircles = d.data.items.slice(0,3) || []
    // }
  },

  //获取圈子对应的帖子列表
  async getCirclePosts(cid) {
    let params = {
      cid: cid,
      tagIds: Array.from(this.activeTagsId),
      pageNum: this.postsPageNum,
      pageSize: 5
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
  },

  //获取圈子对应的精华列表
  async getCircleEssence(cid) {
    let params = {
      cid: cid,
      tagIds: Array.from(this.activeTagsId),
      pageNum: this.essencePageNum,
      pageSize: 5
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
  async getCircleQuestion(cid) {
    let params = {
      cid: cid,
      tagIds: Array.from(this.activeTagsId),
      pageNum: this.questionPageNum,
      pageSize: 5
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

  //获取圈子对应的用户列表
  async getCircleUser(cid) {
    let params = {
      cid: cid,
      keyword: '',
      pageNum: this.userPageNum,
      pageSize: 5
    }
    this.postLock = true;
    const ret = await req.postWithToken('/search/circle/user', params)
    const d = req.standardResponse(ret)
    this.postLock = false;
    if (d.code === 0) {

      if (!this.circleUser.length) {
        this.circleUser = d.data.items || []
      } else {
        this.circleUser = this.circleUser.concat(d.data.items || [])
      }
      if (d.data.total <= this.circleUser.length) {
        this.isToBottomUser = true;
        this.loadingUser = false;
      }
    }
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

  //获取获取圈子cid
  updateCircleId(cid) {
    this.cid = cid;
  },

  //切换子tag关键词数组
  updateActiveTags(tag) {
    if (this.activeTags.has(tag.tagName)) {
      this.activeTags.delete(tag.tagName)
    } else {
      this.activeTags.add(tag.tagName)
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
        return !circleEssence.length;
      case 1:
        return !circlePosts.length;
      case 2:
        return !circleQuestion.length;
      case 4:
        return !circleUser.length;
    }
  },

  async typeTabPost() {
    const { cid, listType } = this;
    console.log(listType)
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
      case 4:
        await this.getCircleUser(cid);
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

  }

}

export default observable(Object.assign(state, actions))