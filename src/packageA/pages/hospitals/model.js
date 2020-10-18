import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async getData(keyword='',page=1) {
    let params = {
      keyword,
      page,
      pageSize:20
    }
    const ret = await request.postWithToken('/search/hospital', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async addData(name,type='h') {
    let params = {
     name,
     type
    }
    const ret = await request.getWithToken('/poi/save', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}