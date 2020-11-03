import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async getData(userId,pn=1) {
    let params = {
      userId,
      pn
    }
    const ret = await request.getWithToken('/subscr/funs', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },
  async cancelAttentionUser(userId) {
    let params = {
      userId
    }
    const ret = await request.postWithToken('/subscr/delete', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async attentionUser(userId) {
    let params = {
      userId
    }
    const ret = await request.postWithToken('/subscr/submit', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async clearMessage(type) {
    let params = {
      type
    }
    const ret = await request.getWithToken('/tnmsg/confirm', params)
    const d = request.standardResponse(ret)
    if(d.code == 0){
      return true
    }else{
      return false
    }
  },
}