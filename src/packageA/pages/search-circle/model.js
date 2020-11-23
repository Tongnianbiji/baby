import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  async getData(params = {
      keyword:'',
      parentCid:'',
      firstSubjectId:'',
      secondSubjectId:'',
      pageNum:1,
      pageSize:10,
      sort
  }) {
    const ret = await request.postWithToken('/search/circle', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async leaveCircle(cid) {
    let params = {
     cid
    }
    const ret = await request.postWithToken('/relation/circle/leave', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async joinCircle(cid) {
    let params = {
     cid
    }
    const ret = await request.postWithToken('/relation/circle/join', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  //保存历史记录
  async saveSecachHistory(type=1,content,cid=0) {
    let params = {
     content,
     type,
     cid
    }
    const ret = await request.postWithToken('/search/history/add',params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}