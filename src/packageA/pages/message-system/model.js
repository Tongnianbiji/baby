import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();
export default {
  async getData(mid='') {
    let params = {
      mid
    }
    const ret = await request.getWithToken('/tnmsg/system', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}
