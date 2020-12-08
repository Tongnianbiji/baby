import BaseRequest from '@common/baseRequest'
import Taro from '@tarojs/taro'
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
        title:`包含非法字符，麻烦修改后再次尝试`,
        icon:'none',
        duration:2e3
      })
      return false
    }
  }
}