import BaseRequest from '../../common/baseRequest'

const request = new BaseRequest()
const okMsg = 'request:ok'

export default {
  getToken(opts) {
    return request.post('user/login', opts).then(ret => ret)
  },

  sendSms(mobile) {
    return request.get('user/sendSms', { mobile }).then(ret => {
      if (ret.errMsg === okMsg) {
        return ret.data
      }
      return { code: -1 }
    })
  }
}