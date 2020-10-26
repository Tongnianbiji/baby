import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async getData(params = {
      keyword:'',
      parentCid:'',
      firstSubjectId:'',
      secondSubjectId:'',
      pageNum:1,
      pageSize:10
  }) {
    const ret = await request.postWithToken('/search/circle', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}