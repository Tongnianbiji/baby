import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();
export default {
  babyList: [
    { id: 1, name: '大宝', gender: 0, birthday: '2018-04-01', grade: '小班', school: '实验幼儿一园' },
    { id: 2, name: '二宝', gender: 1, birthday: '2018-05-01', grade: '中班', school: '实验幼儿二园' },
    { id: 3, name: '三宝', gender: 0, birthday: '2018-06-01', grade: '大班', school: '实验幼儿三园' },
    { id: 4, name: '四宝', gender: 0, birthday: '2018-07-01', grade: '小班', school: '实验幼儿四园' },
  ],
  async getData(token) {
    let params = {
      token
    }
    const ret = await request.getWithToken('/child/mine', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async updateData(bid,officeName,yearState,yearDesc) {
    let params = {
      bid,
      officeName,
      yearState,
      yearDesc
    }
    const ret = await request.postWithToken('/child/update', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },
}