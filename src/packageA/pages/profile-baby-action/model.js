
import BaseRequest from '../../../common/baseRequest'


const request = new BaseRequest();
export default {
  tabs: [{ title: '育儿' }, { title: '孕育' }, { title: '备孕' }],

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
      return false
    }
  }
}
