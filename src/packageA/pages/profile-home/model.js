import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  tabs: [{ title: '动态' }, { title: '帖子' }, { title: '问答' }],
  async getData(token,userId) {
    let params = {
      token,
      userId
    }
    const ret = await request.getWithToken('/profile/get', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  }
}