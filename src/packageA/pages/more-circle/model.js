import BaseRequest from '@common/baseRequest'
import Taro from '@tarojs/taro'
const request = new BaseRequest();
export default {
  async getData(cid,type,pageNum=1) {
    let params = {
     cid,
     pageNum
    }
    let ret=null;
    if(type === 'parent'){
      ret = await request.postWithToken('/circle/parents/base', params)
    }
    else if(type === 'sibling'){
      ret = await request.postWithToken('/circle/sibling/base', params)
    }
    else{
      ret = await request.postWithToken('/circle/children/base', params)
    }
    
    const data = request.standardResponse(ret)
    if (data.code === 0 && data.data) {
      return data.data
    } else {
      return false
    }
  },

  async getSearchData(params = {
      keyword:'',
      parentCid:'',
      firstSubjectId:'',
      secondSubjectId:'',
      pageNum:1,
      pageSize:10,
      sort:{
        _score:'desc'
      }
  }) {
    const ret = await request.postWithToken('/search/circle', params)
    const data = request.standardResponse(ret)
    if (data.code === 0) {
      return data.data
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
  }
  
}