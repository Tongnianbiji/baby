import { observable, action} from 'mobx'
import Taro from '@tarojs/taro'
import Request from '../common/baseRequest'

const req = new Request()

const state = {
  // 基本信息
  loading: true,
  detailInfo: {},
  noData: false,
  isAttentioned: false,
  isToBottom: false,
  favoriteLock:false,

  // 置顶公告/帖子
  topPosts: [],

  // 相关圈子
  parentCircles: [
    {
      cid: 1,
      imgUrl: '#',
      name:'父圈子1'
    }
  ],
  childCircles: [
    {
      cid: 1,
      imgUrl: '#',
      name:'子圈子'
    },
    {
      cid: 1,
      imgUrl: '#',
      name:'子圈子'
    },
    {
      cid: 1,
      imgUrl: '#',
      name:'子圈子'
    },
    {
      cid: 1,
      imgUrl: '#',
      name:'子圈子'
    }
  ],

  //对应圈子帖子列表
  circlePosts:[]
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
  async getCirclePosts(cid,pageNum=1) {
    let params = {
      cid:cid,
      pageNum:pageNum,
      pageSize: 5
    }
    const ret = await req.postWithToken('/search/circle/post', params)
    const d = req.standardResponse(ret)
    if (d.code === 0) {
      if (d.data.total > this.circlePosts.length) {
        this.circlePosts = this.circlePosts.concat(d.data.items)  || []
      } else {
        this.isToBottom = true
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
    console.log('取消收藏',d)
    return d.code;
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
    circlePosts.forEach(async item => {
      if (item.pid === pid) {
        if (item.isMark) {
          let code = await this.cancelFavoritePost(pid);
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