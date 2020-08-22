import Request from '../../../common/baseRequest'

const request = new Request()

export default {
  async getDetail(cid) {
    const ret = await request.postWithToken('/circle/visit', { cid })
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}