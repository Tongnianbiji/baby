import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  typeList: [
    { title: '情感交流', value: 1, },
    { title: '生活记录', value: 2, },
    { title: '教育', value: 3, },
    { title: '健康', value: 4, },
    { title: '饮食', value: 5, },
    { title: '购物', value: 6, },
    { title: '亲子游', value: 7, },
    { title: '休闲娱乐', value: 8, },
    { title: '家庭理财', value: 9, },
    { title: '情感交流', value: 10, },
    { title: '情感交流', value: 11, },
    { title: '情感交流', value: 12, },
    { title: '情感交流', value: 13, },
    { title: '情感交流', value: 14, },
    { title: '情感交流', value: 15, },
  ],

  subTypeList: [
    { type: 1, title: '全部', value: 1, },
    { type: 1, title: '备孕', value: 2, },
    { type: 1, title: '孕期', value: 3, },
    { type: 1, title: '产后', value: 4, },
    { type: 1, title: '单亲妈妈', value: 5, },
    { type: 1, title: '二胎妈妈', value: 6, },
    { type: 1, title: '三胎妈妈', value: 7, },
    { type: 1, title: '高龄产妇', value: 8, },
    { type: 1, title: '双独家庭', value: 9, },
    { type: 1, title: '婆媳关系', value: 10, },
    { type: 1, title: '情感交流', value: 11, },
    { type: 1, title: '情感交流', value: 12, },
    { type: 1, title: '情感交流', value: 13, },
    { type: 1, title: '情感交流', value: 14, },
    { type: 1, title: '情感交流', value: 15, },
    { type: 1, title: '情感交流', value: 16, },
  ],

  async getFirstecondLeveData() {
    const ret = await request.postWithToken('/subject/list')
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async getSecondLevelData(sid=1) {
    const ret = await request.postWithToken('/subject/lower',{sid:sid})
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async getData(sids=['1']) {
    let params = {
      sids
    }
    const ret = await request.postWithToken('/subject/interest', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}