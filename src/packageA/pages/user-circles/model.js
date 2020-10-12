import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async getData(uid,pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await request.postWithToken('/relation/user/circles', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}