import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async updateInfo(signature) {
    let params = {
      signature
    }
    const ret = await request.postWithToken('/profile/update', params);
    const data = request.standardResponse(ret)
    console.log(data)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}