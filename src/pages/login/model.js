import BaseRequest from '../../common/baseRequest'

const request = new BaseRequest()

export default {
  getToken(opts) {
    return request.post('user/login', opts).then(ret => ret)
  }
}