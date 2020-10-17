import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async getData(keyword='',page=1) {
    let params = {
      keyword,
      page,
      pageSize:10
    }
    const ret = await request.postWithToken('/search/school', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}