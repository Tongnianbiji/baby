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

  async getData(to) {
    let params = {
      to
    }
    const ret = await request.getWithToken('/im/history', params)
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
      return data.data
    } else {
      return false
    }
  },

  async saveData(friend,content) {
    let params = {
      friend,
      direct:'send',
      content
    }
    const ret = await request.postWithToken('/im/save', params)
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
      return data.data
    } else {
      return false
    }
  },

  async isBlockFriend(forbid) {
    let params = {
      forbid
    }
    const ret = await request.postWithToken('/block/check', params)
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
      return true
    } else {
      return false
    }
  }
}