import BaseRequest from '../../common/baseRequest'

const request = new BaseRequest()

export default {
  getToken(opts) {
    return request.post('user/login', opts).then(ret => ret)
  },

  sendSms(mobile) {
    return request.get('user/sendSms', { mobile }).then(ret => {
      if (ret.errMsg === request.okMsg) {
        return ret.data
      }
      return { code: -1 }
    })
  }
}