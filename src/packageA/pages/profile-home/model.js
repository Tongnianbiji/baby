import BaseRequest from '@common/baseRequest'
import Taro from '@tarojs/taro'
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
    console.log('***',data)
    if (data.code === 0 && data.data) {
      return data.data
    } else {
      Taro.showToast({
        title:'无效的userId,无法进行任何操作',
        icon:'none',
        duration:2e3
      })
      return false
    }
  },
  //获取动态数据
  async getActiveData(userId,pn=1){
    let params = {
      userId,
      pn
    }
    const ret = await request.getWithToken('/activity/get', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },
  //获取帖子数据
  async getPostData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await request.postWithToken('/user/post', params)
    const d = request.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  //获取问答数据
  async getQuestionData(uid, pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10
    }
    const ret = await request.postWithToken('/user/question', params)
    const d = request.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  async cancelAttentionUser(userId) {
    let params = {
      userId
    }
    const ret = await request.postWithToken('/subscr/delete', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async attentionUser(userId) {
    let params = {
      userId
    }
    const ret = await request.postWithToken('/subscr/submit', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}