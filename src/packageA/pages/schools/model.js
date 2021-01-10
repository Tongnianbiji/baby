import BaseRequest from '@common/baseRequest'

import Taro, { getCurrentInstance } from '@tarojs/taro'
const request = new BaseRequest();

export default {
  async getData(keyword='',page=1) {
    let params = {
      keyword,
      page,
      pageSize:20
    }
    const ret = await request.postWithToken('/search/school', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async addData(name,type='s') {
    let params = {
     name,
     type
    }
    const ret = await request.getWithToken('/poi/save', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      if (data.code == 17) {
        Taro.showToast({
          title: '学校已存在',
          icon: 'none',
        })
      } else {
        Taro.showToast({
          title: '提交失败',
          icon: 'none',
        })
      }
      return false
    }
  }
}