import BaseRequest from '../../common/baseRequest'

const request = new BaseRequest();
export default {
  profile(userId) {
    return request.getWithToken('/profile/get',{userId}).then(ret => {
      if (ret.errMsg === request.okMsg) {
        return ret.data
      }
    })
  },

  async checkregist(code){
    let params = {
      code
    }
    const ret = await request.get('/user/checkregist', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async childMine() {
    const ret = await request.getWithToken('/child/mine')
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}