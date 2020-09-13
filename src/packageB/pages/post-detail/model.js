import Request from '@common/baseRequest'

const req = new Request()

export default {
  async getDetail(pid) {
    const ret = await req.postWithToken('/post/view', { pid })
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  }
}