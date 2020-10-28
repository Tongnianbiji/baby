import BaseRequest from '@common/baseRequest'
import Taro, { getCurrentInstance } from '@tarojs/taro'
const request = new BaseRequest();

export default {
  async updateInfo(nickName) {
    let params = {
      nickName
    }
    const ret = await request.postWithToken('/profile/update', params);
    const data = request.standardResponse(ret)
    console.log(data)
    if (data.code === 0) {
      return true
    } else {
      Taro.showToast({
        title:`${data.message}`,
        icon:'none',
        duration:2e3
      })
      return false
    }
  }
}