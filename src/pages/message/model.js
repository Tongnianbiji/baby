import Request from '@common/baseRequest'
const req = new Request()

export default {
  tabsList: [{ title: '消息' }, { title: '聊天' }],
  chatList:[{ name: '张三', txt: '哈喽, 打个招呼', id: 1 },
  { name: '李四', txt: '哈喽, 打个招呼', id: 2 },
  { name: '赵六', txt: '哈喽, 打个招呼', id: 3 },
  { name: '张三', txt: '哈喽, 打个招呼', id: 4 },
  { name: '王五', txt: '回复: 哈喽, 打个招呼', id: 5 },
  { name: '张三', txt: '哈喽, 打个招呼', id: 6 },
  { name: '张三', txt: '哈喽, 打个招呼', id: 7 },
  { name: '张三', txt: '哈喽, 打个招呼', id: 8 },],
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
  },

  async getChatList(pageNum=1){
    let params ={
      pageNum,
      pageSize:10
    }
    const ret = await req.postWithToken('/im/queryImGroup',params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return d.data
    }else{
      return false
    }
  },

  async deleteChat(fromUid,toUid){
    let params ={
      fromUid,
      toUid,
    }
    const ret = await req.postWithToken('/im/deleteIm',params)
    const d = req.standardResponse(ret)
    if(d.code == 0){
      return true
    }else{
      return false
    }
  }
  
}