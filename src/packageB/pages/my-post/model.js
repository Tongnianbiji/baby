import Request from '@common/baseRequest'
const req = new Request()

export default {
  async getPostData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/user/post', params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  async getReplyData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/user/reply', params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
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