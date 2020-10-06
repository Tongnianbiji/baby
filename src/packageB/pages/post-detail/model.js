import Request from '@common/baseRequest'

const req = new Request()

export default {
  async getDetail(pid) {
    const ret = await req.postWithToken('/post/view', { pid })
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
  async getReplyList(pid, sortType = 1,pageNum=1) {
    let params = {
      pid,
      sortType,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/post/reply/view', params)
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
  async subReply(pid, replyId, content) {
    let params = {
      pid,
      replyId,
      content
    }
    const ret = await req.postWithToken('/post/reply', params)
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
  async postLike(pid, replyId, parentRid) {
    let params = {
      pid,
      replyId,
      parentRid
    }
    const ret = await req.postWithToken('/post/like', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async postLikeCancel(pid, replyId, parentRid) {
    let params = {
      pid,
      replyId,
      parentRid
    }
    const ret = await req.postWithToken('/post/like/cancel', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async postDislike(pid, replyId, parentRid) {
    let params = {
      pid,
      replyId,
      parentRid
    }
    const ret = await req.postWithToken('post/dislike', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async postDislikeCancel(pid, replyId, parentRid) {
    let params = {
      pid,
      replyId,
      parentRid
    }
    const ret = await req.postWithToken('/post/dislike/cancel', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async postMark(pid) {
    let params = {
      pid
    }
    const ret = await req.postWithToken('/post/mark', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async postMarkCancel(pid) {
    let params = {
      pid
    }
    const ret = await req.postWithToken('/post/mark/cancel', params)
    const d = req.standardResponse(ret)
    return d.code
  },
}