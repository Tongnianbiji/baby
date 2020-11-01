import BaseRequest from '@common/baseRequest'
import Taro from '@tarojs/taro'
const request = new BaseRequest();
export default {
  async getData(cid) {
    let params = {
     cid
    }
    const ret = await request.postWithToken('/circle/children/base', params)
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
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