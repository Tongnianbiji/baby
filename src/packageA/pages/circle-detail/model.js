import Request from '../../../common/baseRequest'
import circleDetail from '@src/store/circle-detail'
import Taro from '@tarojs/taro'
const request = new Request()
const {defaultGroupFlag,defaultRegionFlag,defaultGroup,defaultRegion} = circleDetail.customConfig
export default {
  async getDetail(cid) {
    const ret = await request.postWithToken('/circle/visit', { cid })
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async getCustomConfig(cid){
    const ret = await request.postWithToken('/circle/custom/query', { cid })
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      return false
    }
  },

  async configCustom(
    params={
      cid:circleDetail.cid,
      defaultGroupFlag:defaultGroupFlag,
      defaultRegionFlag:defaultRegionFlag,
      defaultGroup:defaultGroup,
      defaultRegion:defaultRegion
    }
  ){
    let newParams = {
      cid:circleDetail.cid,
      defaultGroupFlag:defaultGroupFlag,
      defaultRegionFlag:defaultRegionFlag,
      defaultGroup:defaultGroup,
      defaultRegion:defaultRegion
    }
    Object.assign(newParams,params)
    const ret = await request.postWithToken('/circle/custom/config', newParams)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
    } else {
      Taro.showToast({
        title:`关注圈子后才可定制圈子哦`,
        icon:'none',
        duration:2e3
      })
      return false
    }
  }

}