import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import Request from '../common/baseRequest'

const req = new Request()

const state = {
  // 基本信息
  loading: true,
  detailInfo: {},
  noData: false,
  isAttentioned: false,

  // 置顶公告/帖子
  topPosts: [],

  // 相关圈子
  parentCircles: [],
  childCircles: []
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
    if (d.code === 0) {
      this.parentCircles = d.data.items || []
    }
  },

  async getChildCircles(cid) {
    const ret = await req.postWithToken('/circle/children/base', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0) {
      this.childCircles = d.data.items || []
    }
  },

  async getSiblingCircles(cid) {
    const ret = await req.postWithToken('/circle/sibling/base', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0) {
      this.childCircles = d.data.items || []
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
  }
}

export default observable(Object.assign(state, actions))