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
  },

  //历史记录
  async getHistoryRecord(type=1,cid=0) {
    let params = {
      type,
      cid
    }
    const ret = await request.postWithToken('/search/history/query',params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

   //附近历史记录
   async getNearHistoryRecord(type=2,cid=0) {
    let params = {
      type,
      cid
    }
    const ret = await request.postWithToken('/search/history/nearby',params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

   //热门历史记录
   async getHotHistoryRecord(type=2,cid=0) {
    let params = {
      type,
      cid
    }
    const ret = await request.postWithToken('/search/history/recommend',params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  //清除历史记录
  async clearHistoryRecord(type=2,cid=0) {
    let params = {
      type,
      cid
    }
    const ret = await request.postWithToken('/search/history/delete',params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },
}