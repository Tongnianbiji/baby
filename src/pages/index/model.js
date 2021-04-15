import BaseRequest from '../../common/baseRequest'
import { GMAP_API_KEY } from '../../common/constant'
import staticData from '@src/store/common/static-data'

const request = new BaseRequest()
export default {
  tabConfig: {
    top: [
      { title: '关注' }, 
      { title: '推荐' }, 
      //{ title: '附近' }, 
      { title: '热榜' }]
  },
  getCityInfo(lon, lat) {
    return request.get('https://restapi.amap.com/v3/geocode/regeo', {
      key: GMAP_API_KEY,
      location: `${lon},${lat}`
    }).then(data => {
      if (data.data && data.data.infocode === '10000') {
        const { regeocode = {} } = data.data
        const { addressComponent = {} } = regeocode
        const { province, city, adcode, citycode, country, district } = addressComponent
        return {
          msg: 'ok',
          province,
          city: city[0] || province,
          adcode,
          citycode,
          country,
          district
        }
      } else {
        return {
          msg: '逆地址解析失败'
        }
      }
    })
  },

  async getAttentionCircle(params) {
    const ret = await request.postWithToken('/relation/user/circles', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
    console.log(ret, 'ret')
  },

  //获取关注的用户动态
  async getAttentionUsers(uid,pageNum=1) {
    let params = {
      uid,
      pageNum,
      pageSize:10

    }
    const ret = await request.postWithToken('/activity/subscribeUser', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async markPost(pid) {
    let params = {
      pid
    }
    const ret = await request.postWithToken('/post/mark', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  //获取推荐的数据
  async getrecommends(pageNum=1) {
    let params = {
      pageNum,
      pageSize:10,
      guestOpenId: staticData.isLogin? staticData.openID:'',
    }
    const ret = await request.postWithToken('/search/recommend', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  

  //获取热版的数据
  async gethots(type=1) {
    let params = {
      type
    }
    const ret = await request.postWithToken('/search/hotspot', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async cancelMarkPost(pid) {
    let params = {
      pid
    }
    const ret = await request.postWithToken('/post/mark/cancel', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async cancelMarkQuestion(qid) {
    let params = {
     qid
    }
    const ret = await request.postWithToken('/question/mark/cancel', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async markQuestion(qid) {
    let params = {
     qid
    }
    const ret = await request.postWithToken('/question/mark', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
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
  },

  async leaveCircle(cid) {
    let params = {
     cid
    }
    const ret = await request.postWithToken('/relation/circle/leave', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },

  async joinCircle(cid) {
    let params = {
     cid
    }
    const ret = await request.postWithToken('/relation/circle/join', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
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
  },

  async getMessageCount(){
    const ret = await request.getWithToken('/tnmsg/count')
    const d = request.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  //清除曝光
  async clearRead(uid){
    let params = {
      keyword: `exp:pid_openid_${staticData.openID}`,
    }
     await request.postWithToken('/test/set/cleanRead', params)
    const ret = await request.postWithToken('/test/set/cleanRead', {
      keyword: `exp:all_pid_openid_${staticData.openID}`
    })
    const d = request.standardResponse(ret)
    if(d.code == 0){
      return true
    }else{
      return false
    }
  }
}