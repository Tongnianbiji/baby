import BaseRequest from '../../common/baseRequest'

const request = new BaseRequest();
export default {
  profile() {
    return request.getWithToken('/profile/get').then(ret => {
      if (ret.errMsg === request.okMsg) {
        return ret.data
      }
      return { code: request.errCode }
    })
  }
}