import Request from '@common/baseRequest'
const request = new Request()

export default {
   //清除曝光
   async clearRead(uid){
    let params = {
      keyword:`exp:pid_${uid}`
    }
    const ret = await request.postWithToken('/test/set/cleanRead',params)
    const d = request.standardResponse(ret)
    if(d.code == 0){
      return true
    }else{
      return false
    }
  }
}