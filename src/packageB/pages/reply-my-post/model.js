import Request from '@common/baseRequest'
const req = new Request()

export default {
  async getReplyData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/reply/me', params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  async clearMessage(type) {
    let params = {
      type
    }
    const ret = await req.getWithToken('/tnmsg/confirm', params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return true
    }else{
      return false
    }
  }
}