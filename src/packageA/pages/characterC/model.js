import BaseRequest from '@common/baseRequest'

const request = new BaseRequest();

export default {
  chatacterList: [
    { title: '我是妈妈', value: 1 },
    { title: '我是爸爸', value: 2 },
    { title: '我是爷爷', value: 3 },
    { title: '我是奶奶', value: 4 },
    { title: '我是外婆', value: 5 },
    { title: '我是外公', value: 6 },
    { title: '我是干妈', value: 7 },
    { title: '我是干爸', value: 8 },
    { title: '我是舅妈', value: 9 },
    { title: '我是舅舅', value: 10 },
    { title: '其他', value: 0 },
  ],
  async getData(bid){
    let params ={
      bid
    }
    const ret = await request.getWithToken('/child/family', params)
    const data = request.standardResponse(ret);
    if (data.code === 0) {
      return data
    } else {
      Taro.showToast({
        title:`${data.message}`,
        icon:'none',
        duration:2e3
      })
      return false
    }
  },
  async acceptInvite(invtKey,role){
    let params ={
      invtKey,
      role,
    }
    const ret = await request.getWithToken('/child/accept', params)
    const data = request.standardResponse(ret);
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}