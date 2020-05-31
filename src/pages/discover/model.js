import BaseRequest from '../../common/baseRequest';

const request = new BaseRequest();

export default {
  getMenus() {
    return request.get('/subject/list').then(result => {
      if (result.errMsg === request.okMsg) {
        return result.data
      }
    })
  },

  getTags({ sid }) {
    return request.get('/subject/lower', { sid }).then(result => {
      if (result.errMsg === request.okMsg) {
        return result.data
      }
    })
  },

  getCircle({ psid, sid, pn = 0, ps = 10 }) {
    return request.get('/circle/query', { psid, sid, pn, ps }).then(result => {
      if (result.errMsg === request.okMsg) {
        return result.data
      }
    })
  }
}