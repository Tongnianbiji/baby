import Request from '@common/baseRequest'
import Taro from '@tarojs/taro'

const req = new Request()

export default {
  async getQrCode() {
    const ret = await req.postWithToken('/user/recommend/minicode')
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  },
}