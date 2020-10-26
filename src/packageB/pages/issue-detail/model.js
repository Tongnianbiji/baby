import Request from '@common/baseRequest'

const req = new Request()

export default {
  async getDetail(qid) {
    const ret = await req.postWithToken('/question/view', { qid })
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
  async getAnswerList(qid, sortType = 1,pageNum=1) {
    let params = {
      qid,
      sortType,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/question/reply/view', params)
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
  async subReply(qid, replyId, content,files) {
    let params = {
      qid,
      replyId,
      content,
      files
    }
    const ret = await req.postWithToken('/question/reply', params)
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
  async questionLike(qid, replyId, parentRid) {
    let params = {
      qid,
      replyId,
      parentRid,
    }
    const ret = await req.postWithToken('/question/like', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async questionLikeCancel(qid, replyId, parentRid) {
    let params = {
      qid,
      replyId,
      parentRid
    }
    const ret = await req.postWithToken('/question/like/cancel', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async questionDislike(qid, replyId, parentRid) {
    let params = {
      qid,
      replyId,
      parentRid
    }
    const ret = await req.postWithToken('question/dislike', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async questionDislikeCancel(qid, replyId, parentRid) {
    let params = {
      qid,
      replyId,
      parentRid
    }
    const ret = await req.postWithToken('/question/dislike/cancel', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async questionMark(qid) {
    let params = {
      qid
    }
    const ret = await req.postWithToken('/question/mark', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async questionMarkCancel(qid) {
    let params = {
      qid
    }
    const ret = await req.postWithToken('/question/mark/cancel', params)
    const d = req.standardResponse(ret)
    return d.code
  },
  async deleteReply(qid,replyId) {
    let params = {
      qid,
      replyId
    }
    const ret = await req.postWithToken('/question/reply/delete', params)
    const d = req.standardResponse(ret);
    if(d.code === 0){
      return true
    }else{
      return false
    }
    
  },
}