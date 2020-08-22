import BaseRequest from '../../common/baseRequest'
import { GMAP_API_KEY } from '../../common/constant'

const request = new BaseRequest()
export default {
  tabConfig: {
    top: [{ title: '关注' }, { title: '推荐' }, { title: '附近' }, { title: '热榜' }]
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

  //
  async getAttentionCircle(params) {
    const ret = await request.post('/relation/user/circles', params)
    console.log(ret, 'ret')
  }
}