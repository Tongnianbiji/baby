import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async blockUser(forbid) {
    let params = {
      forbid
    }
    const ret = await request.getWithToken('/block/save', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async canCelBlockUser(forbid) {
    let params = {
      forbid
    }
    const ret = await request.getWithToken('/block/delete', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async checkBlockUser(forbid) {
    let params = {
      forbid
    }
    const ret = await request.getWithToken('/block/check', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data
    } else {
      return false
    }
  }
}