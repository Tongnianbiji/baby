
import BaseRequest from '../../../common/baseRequest'


const request = new BaseRequest();
export default {
  tabs: [{ title: '育儿' }, { title: '孕育' }, { title: '备孕' }],

  childCreate() {
    const data = {
      officeName: '刘德华',
      infantName: '华华',
      birthday: '2020-01-01',
      sex: '男',
      yearState: 'PREPARED',//状态, PREPARED, PREGNANCY, BRINGUP
      yearDesc: '备孕',
      grade: '',
      school: '',
    }
    return request.post('/child/create', data).then(ret => ret
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
  }
}
