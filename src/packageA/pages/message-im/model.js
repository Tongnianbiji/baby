import BaseRequest from '@common/baseRequest'
import Taro from '@tarojs/taro'
const request = new BaseRequest();
export default {
  async getProfileData(userId) {
    let params = {
      userId
    }
    const ret = await request.getWithToken('/profile/get', params)
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
      return data.data
    } else {
      Taro.showToast({
        title:'无效的userId,无法进行任何操作',
        icon:'none',
        duration:2e3
      })
      return false
    }
  },

  async getData( fromUid,toUid,mid='') {
    let params = {
      fromUid,
      toUid,
      mid,
      pageNum:1,
      pageSize:10
    }
    const ret = await request.postWithToken('/im/queryIm', params)
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
      return data.data
    } else {
      return false
    }
  },

  async saveData(fromUid,toUid,type,content,isBlock) {
    let params = {
      fromUid,
      toUid,
      type,
      content,
      isBlock
    }
    const ret = await request.postWithToken('/im/saveIm', params)
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
      return true
    } else {
      return false
    }
  },

  async isBlockFriend(forbid) {
    let params = {
      forbid
    }
    const ret = await request.getWithToken('/block/check', params)
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
      return data.data
    } else {
      return false
    }
  }
}