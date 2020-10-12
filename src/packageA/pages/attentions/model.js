import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async getData(token,userId,pn=1) {
    let params = {
      token,
      userId,
      pn
    }
    const ret = await request.getWithToken('/subscr/get', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}