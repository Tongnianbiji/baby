import BaseRequest from '@common/baseRequest'
import Taro from '@tarojs/taro'
const request = new BaseRequest();

export default {
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

  async acceptInvite(invtKey,roleText){
    let params ={
      invtKey,
      //roleText:this.getRoleText(roleText),
      roleText:roleText,
      role:'OTHER'
    }
    const ret = await request.getWithToken('/child/accept', params)
    const data = request.standardResponse(ret);
    if (data.code === 0) {
      return true
    } else {
      Taro.showToast({
        title:`${data.message}`,
        icon:'none',
        duration:2e3
      })
      return false
    }
  }
}