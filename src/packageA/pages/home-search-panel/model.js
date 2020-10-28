import Request from '@common/baseRequest'
const request = new Request()

export default {
  tabList1: [{ title: '全部' }, { title: '帖子' }, { title: '问答' }, { title: '圈子' }, { title: '用户' }],
  tabList2: [{ title: '全部' },{ title: '精华' },  { title: '帖子' }, { title: '问答' }],
  //搜索
  async search(type='ALL',keyword='',pageNum=1) {
    let params = {
      type,
      keyword,
      pageNum,
      pageSize:10
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
  async getHistoryRecord() {
    const ret = await request.postWithToken('/h/get')
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  //清除历史记录
  async clearHistoryRecord(word='') {
    const ret = await request.postWithToken('/h/clear',{word})
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
  }
}