import BaseRequest from '../../common/baseRequest';

const request = new BaseRequest();
let pageSize = 10;
let pageNum = 0;
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

  getCircle({ firstSubjectId, secondSubjectId }, isReload = false) {
    if (isReload) {
      pageNum = 0;
    }
    pageNum++;
    return request.postWithToken('/search/circle', { firstSubjectId, secondSubjectId, pageNum, pageSize,sort:{
      heat_rate:'desc',
      online:'desc'
    } }).then(result => {
      if (result.errMsg === request.okMsg) {
        return result.data.data
      }
    })
  },

  async getRecommendCircle() {
    const ret = await request.postWithToken('/relation/circle/recommend')
    const d = request.standardResponse(ret)
    if (d.code) {
      Taro.showToast({
        title:d.message,
        icon: 'none',
        duration:2e3
      })
    } else {
      return d.code === 0 && d.data
    }
  },

  profile(userId) {
    return request.getWithToken('/profile/get',{userId}).then(ret => {
      if (ret.errMsg === request.okMsg) {
        return ret.data
      }
    })
  },
}