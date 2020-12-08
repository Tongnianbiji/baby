import BaseRequest from '@common/baseRequest'
import Taro from '@tarojs/taro'
const request = new BaseRequest();

export default {
  chatacterList: [
    { title: '我是妈妈', value: 1 },
    { title: '我是爸爸', value: 2 },
    { title: '我是爷爷', value: 3 },
    { title: '我是奶奶', value: 4 },
    { title: '我是外婆', value: 5 },
    { title: '我是外公', value: 6 },
    { title: '我是干妈', value: 7 },
    { title: '我是干爸', value: 8 },
    { title: '我是舅妈', value: 9 },
    { title: '我是舅舅', value: 10 },
    { title: '其他', value: 0 },
  ],
  roleTable:{
    "MAMA": "妈妈",
    "GRANDMA": "奶奶",
    "XIAOYI": "小姨",
    "DADY": "爸爸",
    "GRANDFATHER": "爷爷",
    "YIMA": "姨妈",
    "WAIGONG": "外公",
    "GANMA": "干妈",
    "OTHER": "",
    "AYI": "阿姨",
    "UNCLE": "叔叔",
    "JIUJIU": "舅舅",
    "GANBA": "干爸",
    "WAIPO": "外婆",
    "GUGU": "姑姑",
    "JIUMA": "舅妈"
  },
  getRoleText (role){
    for(let i in this.roleTable){
      if(this.roleTable[i] === role){
        return i
      }
    }
  },

  async getData(bid){
    let params ={
      bid
    }
    const ret = await request.getWithToken('/child/family', params)
    const data = request.standardResponse(ret);
    if (data.code === 0) {
      return data
    } else {
      Taro.showToast({
        title:`${data.message}`,
        icon:'none',
        duration:2e3
      })
      return false
    }
  },
  async acceptInvite(invtKey,roleText){
    let params ={
      invtKey,
      role:this.getRoleText(roleText),
      roleText
    }
    const ret = await request.getWithToken('/child/accept', params)
    const data = request.standardResponse(ret);
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },
}