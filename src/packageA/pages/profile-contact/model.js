import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async postSuggest(suggest,contact) {
    let params = {
      suggest,
      contact
    }
    const ret = await request.postWithToken('/system/contact', params);
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}