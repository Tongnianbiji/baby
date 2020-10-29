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
 
  async cancelMarkQuestion(qid) {
    let params = {
     qid
    }
    const ret = await req.postWithToken('/question/mark/cancel', params)
    const data = req.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async markQuestion(qid) {
    let params = {
     qid
    }
    const ret = await req.postWithToken('/question/mark', params)
    const data = req.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}