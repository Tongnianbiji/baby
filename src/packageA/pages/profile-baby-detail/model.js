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
    '小学1年级',
    '小学2年级',
    '小学3年级',
    '小学4年级',
    '小学5年级',
    '小学6年级',
    '初中1年级',
    '初中2年级',
    '初中3年级',
    '高中1年级',
    '高中2年级',
    '高中3年级',
    '大学1年级',
    '大学2年级',
    '大学3年级',
    '大学4年级',
    '硕士1年级',
    '硕士2年级',
    '硕士3年级',
    '博士1年级',
    '博士2年级',
    '博士3年级',
    '博士4年级',
    '博士5年级',
    '博士5年级以上'
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
    // console.log(1111, params);
    // return
    
    const ret = await request.postWithToken('/child/update', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },
}