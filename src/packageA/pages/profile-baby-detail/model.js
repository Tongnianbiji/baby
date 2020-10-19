import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();
export default {
  babyList: [
    { id: 1, name: '大宝', gender: 0, birthday: '2018-04-01', grade: '小班', school: '实验幼儿一园' },
    { id: 2, name: '二宝', gender: 1, birthday: '2018-05-01', grade: '中班', school: '实验幼儿二园' },
    { id: 3, name: '三宝', gender: 0, birthday: '2018-06-01', grade: '大班', school: '实验幼儿三园' },
    { id: 4, name: '四宝', gender: 0, birthday: '2018-07-01', grade: '小班', school: '实验幼儿四园' },
  ],
  gradeSelector:[
    '幼儿园小班',
    '幼儿园中班',
    '幼儿园大班',
    '小学一年级',
    '小学二年级',
    '小学三年级',
    '小学四年级',
    '小学五年级',
    '小学六年级',
    '初中一年级',
    '初中二年级',
    '初中三年级',
    '高中一年级',
    '高中二年级',
    '高中三年级',
    '大学一年级',
    '大学二年级',
    '大学三年级',
    '大学四年级',
    '研究生一年级',
    '研究生二年级',
    '研究生三年级',
    '博士一年级',
    '博士二年级',
    '博士三年级',
    '博士四年级',
    '博士五年级',
    '博士五年级以上'
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