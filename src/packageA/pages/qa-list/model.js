import Request from '@common/baseRequest'
const req = new Request()

export default {
  async getQuestionData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/user/question', params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  async getAnswerData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/user/answer', params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  async leaveCircle(cid) {
    let params = {
     cid
    }
    const ret = await request.postWithToken('/relation/circle/leave', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async joinCircle(cid) {
    let params = {
     cid
    }
    const ret = await request.postWithToken('/relation/circle/join', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}