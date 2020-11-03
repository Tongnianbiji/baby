
import BaseRequest from '../../../common/baseRequest'

const request = new BaseRequest();
import Taro, {getCurrentInstance} from '@tarojs/taro'
export default {
  tabs: [{ title: '育儿' }, { title: '孕育' }, { title: '备孕' }],
  gradeSelector:[
    '幼儿园小班',
    '幼儿园中班',
    '幼儿园大班',
    '小学一年级',
    '小学二年级',
    '小学三年级',
    '小学四年级',
    '小学五年级',
    '小学六年级',
    '初中一年级',
    '初中二年级',
    '初中三年级',
    '高中一年级',
    '高中二年级',
    '高中三年级',
    '大学一年级',
    '大学二年级',
    '大学三年级',
    '大学四年级',
    '研究生一年级',
    '研究生二年级',
    '研究生三年级',
    '博士一年级',
    '博士二年级',
    '博士三年级',
    '博士四年级',
    '博士五年级',
    '博士五年级以上'
  ],
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

  async submit(officeName, yearState, yearDesc) {
    let params = {
      officeName,
      yearState,
      yearDesc
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
