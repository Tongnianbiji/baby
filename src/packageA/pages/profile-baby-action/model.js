
import BaseRequest from '../../../common/baseRequest'

const request = new BaseRequest();
import Taro, {getCurrentInstance} from '@tarojs/taro'
import staticData from '@src/store/common/static-data'

export default {
  tabs: [{ title: '育儿' }, { title: '孕育' }, { title: '备孕' }],
  gradeSelector:[
    '幼儿园小班',
    '幼儿园中班',
    '幼儿园大班',
    '小学1年级',
    '小学2年级',
    '小学3年级',
    '小学4年级',
    '小学5年级',
    '小学6年级',
    '初中1年级',
    '初中2年级',
    '初中3年级',
    '高中1年级',
    '高中2年级',
    '高中3年级',
    '大学1年级',
    '大学2年级',
    '大学3年级',
    '大学4年级',
    '硕士1年级',
    '硕士2年级',
    '硕士3年级',
    '博士1年级',
    '博士2年级',
    '博士3年级',
    '博士4年级',
    '博士5年级',
    '博士5年级以上'
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
  childCreate() {
    const data = {
      officeName: '刘德华',
      birthday: '2020-01-01',
      sex: 'male',
      yearState: 'BRINGUP',//状态, PREPARED, PREGNANCY, BRINGUP
      yearDesc: '育儿',
      grade: '幼儿园小班',
      // school: '济阳一村',
    }
    return request.postWithToken('/child/create', data).then(ret => ret
      //   {
      //   if (ret.errMsg === request.okMsg) {
      //     return ret.data
      //   }
      //   return { code: -1 }
      // }
    )
  },

  searchSchool() {
    const data = {
      keyword: '学校',
      page: 1,
      pageSize: 10
    }
    return request.post('/search/school', data).then(ret => ret)
  },

  async submit(officeName, yearState, yearDesc, role) {
    let params = {
      officeName,
      yearState,
      yearDesc,
      role:this.getRoleText(role),
      roleText:role
    }
    const ret = await request.postWithToken('/child/create', params)
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
  },
}
