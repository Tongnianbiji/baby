import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  tabs: [{ title: '动态' }, { title: '帖子' }, { title: '问答' }],
  async getData(token,userId) {
    let params = {
      token,
      userId
    }
    const ret = await request.getWithToken('/profile/get', params)
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
  }
}