import BaseRequest from '../../../common/baseRequest'
import { GMAP_API_KEY } from '../../../common/constant'

const request = new BaseRequest()
export default {
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
  getCity(id, type) {
    const query = type ? `?${type}=${id}` : ''
    return request.get('/poi/locate' + query).then(request.standardResponse)
  },
  searchCity(kw) {
    return request.get(`/poi/search?kw=${kw}`).then(request.standardResponse)
  },

  async updateCityInfo(params){
    const ret = await request.postWithToken('/poi/update', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}