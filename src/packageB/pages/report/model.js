import Request from '@common/baseRequest'
import Taro, {getCurrentInstance} from '@tarojs/taro'

const req = new Request()

export default {
  async submit(contentType, contentId, informType,reason='') {
    let params = {
      contentType,
      contentId,
      informType,
      reason
    }
    const ret = await req.postWithToken('/circle/inform/content', params)
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
}