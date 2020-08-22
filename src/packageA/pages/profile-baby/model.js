import BaseRequest from '../../../common/baseRequest'

const request = new BaseRequest();
export default {
  childMine() {
    return request.getWithToken('/child/mine', {}).then(ret => {
      if (ret.errMsg === request.okMsg) {
        return ret.data
      }
      return { code: -1 }
    })
  }
}
