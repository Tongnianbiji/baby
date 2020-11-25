import Request from '@common/baseRequest'
import Taro, {getCurrentInstance} from '@tarojs/taro'

const req = new Request()

export default {
  async getTags(cid) {
    const ret = await req.post('question/getTag', { cid })
    const d = req.standardResponse(ret)
    if (d.code === 0 && d.data) {
      return d.data.items
    } else {
      return false
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