import Request from '@common/baseRequest'
const request = new Request()

export default {
  tabList1: [{ title: '全部' }, { title: '帖子' }, { title: '问答' }, { title: '圈子' }, { title: '用户' }],
  tabList2: [{ title: '精华' },  { title: '帖子' }, { title: '问答' }],
  //搜索
  async search(type='ALL',keyword='',sort={},pageNum=1) {
    let params = {
      type,
      keyword,
      pageNum,
      pageSize:10,
      sort
    }
    const ret = await request.postWithToken('/search/all', params)
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
   async getNearHistoryRecord(type=1,cid=0) {
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
   async getHotHistoryRecord(type=1,cid=0) {
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
  async clearHistoryRecord(type=1,cid=0) {
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

   //获取精华列表
   async getEssenceList(cid,keyword='',sortObj={},pageNum=1) {
    let params = {
      cid,
      keyword,
      //tagIds: Array.from(this.activeTagsId),
      pageNum,
      pageSize: 5,
      sort:sortObj
    }
    const ret = await request.postWithToken('/search/circle/essence',params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  //获取帖子列表
  async getPostList(cid,keyword='',sortObj={},pageNum=1) {
    let params = {
      cid,
      keyword,
      //tagIds: Array.from(this.activeTagsId),
      pageNum,
      pageSize: 5,
      sort:sortObj
    }
    const ret = await request.postWithToken('/search/circle/post',params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

   //获取问答列表
   async getQuestionList(cid,keyword='',sortObj={},pageNum=1) {
    let params = {
      cid,
      keyword,
      //tagIds: Array.from(this.activeTagsId),
      pageNum,
      pageSize: 5,
      sort:sortObj
    }
    const ret = await request.postWithToken('/search/circle/question',params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
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