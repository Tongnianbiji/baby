import Request from '@common/baseRequest'
const req = new Request()

export default {
  tabsList: [{ title: '消息' }, { title: '聊天' }],
  getMessage() {
    
  },
  async getMessageCount(){
    const ret = await req.getWithToken('/tnmsg/count')
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  }
  
}