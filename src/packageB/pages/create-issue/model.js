import Request from '@common/baseRequest'
import Taro, {getCurrentInstance} from '@tarojs/taro'

const req = new Request()

export default {
  async getTags(cid) {
    const ret = await req.post('question/getTag', { cid })
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

  async saveIssue(params) {
    const ret = await req.postWithToken('/question/submit', params)
    const d = req.standardResponse(ret)
    if (d.code) {
      Taro.showToast({
        title:d.message,
        icon: 'none',
        duration:2e3
      })
    } else {
      return d.code === 0 && d.data
    }
  }
}