import Request from '@common/baseRequest'

const request = new Request()
export default {

  async getProfileInfo(token,userId) {
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
  },

  async submit(cid) {
    const ret = await request.postWithToken('/profile/update', { cid })
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async updateHeadImgInfo(headImg) {
    let params = {
      headImg
    }
    const ret = await request.postWithToken('/profile/update', params);
    const data = request.standardResponse(ret)
    console.log(data)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async updateThemeInfo(theme) {
    let params = {
      theme
    }
    const ret = await request.postWithToken('/profile/update', params);
    const data = request.standardResponse(ret)
    console.log(data)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async updateInfo(headImg,nickName,signature,sex) {
    let params = {
      headImg,
      nickName,
      signature,
      sex
    }
    const ret = await request.postWithToken('/profile/update', params);
    const data = request.standardResponse(ret)
    console.log(data)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}