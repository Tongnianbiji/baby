import BaseRequest from '../../common/baseRequest'
import { GMAP_API_KEY } from '../../common/constant'

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
  }
}