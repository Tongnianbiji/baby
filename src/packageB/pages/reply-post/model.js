import Request from '@common/baseRequest'
import Taro, {getCurrentInstance} from '@tarojs/taro'

const req = new Request()

export default {
  async subReply(pid, replyId, content,files) {
    let params = {
      pid,
      replyId,
      content,
      files
    }
    const ret = await req.postWithToken('/post/reply', params)
    const d = req.standardResponse(ret)
    return d
  },
}