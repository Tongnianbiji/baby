import Request from '@common/baseRequest'
import Taro from '@tarojs/taro'
const request = new Request()

export default {
  tabTypes: { topTabs: 'topTabs', subTabs: 'subTabs' },
  topTabs: [{ title: '我是妈妈' }, { title: '我是爸爸' }, { title: '其他' }],
  subTabs: [{ title: '育儿' }, { title: '孕育' }, { title: '备孕' }],
  babyList: [{ title: '单胞胎', value: 1 }, { title: '双胞胎', value: 2 }, { title: '三胞胎', value: 3 }, { title: '未知', value: 0 }],
  maxBabyCount: 8,

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

  async submit(officeName, yearState, yearDesc,roleText) {
    let params = {
      officeName,
      yearState,
      yearDesc,
      role:this.getRoleText(roleText),
      roleText
    }
    const ret = await request.postWithToken('/child/create', params)
    const data = request.standardResponse(ret);
    if (data.code === 0) {
      return true
    } else {
      Taro.showToast({
        title:data.message,
        icon:"none",
        duration:2e3
      })
      return false
    }
  }
}