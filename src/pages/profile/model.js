import BaseRequest from '../../common/baseRequest'

const request = new BaseRequest();
export default {
  profile(userId) {
    return request.getWithToken('/profile/get',{userId}).then(ret => {
      if (ret.errMsg === request.okMsg) {
        return ret.data
      }
      return { code: request.errCode }
    })
  }
}