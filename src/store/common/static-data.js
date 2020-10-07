import { observable, action} from 'mobx'
import Taro from '@tarojs/taro'
import Request from '@common/baseRequest'

const req = new Request()


class Data {
  //获取帖子标签列表
  @action getTagList = async (cid) => {
    const ret = await req.postWithToken('post/getTag', { cid })
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  }
}

const store = new Data();

export default store;