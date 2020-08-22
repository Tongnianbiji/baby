import Request from '../../../common/baseRequest'

const req = new Request()

export default {
  async getTags(cid) {
    const ret = await req.post('post/getTag', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0 && d.data && d.data.items.length) {
      return d.data.items
    } else {
      return [
        { tagName: '这是', tagId: '1' },
        { tagName: '测试的', tagId: '2' },
        { tagName: '数据', tagId: '3' },
        { tagName: '生活', tagId: '4' },
        { tagName: '灌水', tagId: '5' },
        { tagName: '生活', tagId: '6' },
        { tagName: '灌水', tagId: '7' }
      ]
    }
  },

  async savePost(params) {
    const ret = await req.postWithToken('/post/submit', params)
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data
  }
}