import Request from '@common/baseRequest'

const req = new Request()

export default {
  async getDetail(pid) {
    const ret = await req.postWithToken('/post/view', { pid })
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
  async getReplyList(pid, sortType = 1,pageNum=1) {
    let params = {
      pid,
      sortType,
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/post/reply/view', params)
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  }
}