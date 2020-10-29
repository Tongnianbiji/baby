import Request from '@common/baseRequest'
const req = new Request()

export default {
  tabList: [
    { title: '收藏' },
    { title: '点赞' }
  ],
  async getCollectData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/mark/get', params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  async getLikeData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/star/get', params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  async likePost(pid,replyId) {
    let params = {
      pid,
      replyId
    }
    const ret = await req.postWithToken('/post/like', params)
    const data = req.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async cancelLikePost(pid,replyId) {
    let params = {
      pid,
      replyId
    }
    const ret = await req.postWithToken('/post/like/cancel', params)
    const data = req.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async markPost(pid) {
    let params = {
      pid
    }
    const ret = await req.postWithToken('/post/mark', params)
    const data = req.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async cancelMarkPost(pid) {
    let params = {
      pid
    }
    const ret = await req.postWithToken('/post/mark/cancel', params)
    const data = req.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}