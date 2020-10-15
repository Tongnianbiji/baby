import Request from '@common/baseRequest'

const request = new Request()
export default {

  async getProfileInfo(token,userId) {
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

  async submit(cid) {
    const ret = await request.postWithToken('/profile/update', { cid })
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}