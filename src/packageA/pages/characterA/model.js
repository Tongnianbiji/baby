import Request from '@common/baseRequest'

const request = new Request()

export default {
  tabTypes: { topTabs: 'topTabs', subTabs: 'subTabs' },
  topTabs: [{ title: '我是妈妈' }, { title: '我是爸爸' }, { title: '其他' }],
  subTabs: [{ title: '育儿' }, { title: '孕育' }, { title: '备孕' }],
  babyList: [{ title: '单胞胎', value: 1 }, { title: '双胞胎', value: 2 }, { title: '三胞胎', value: 3 }, { title: '未知', value: 0 }],
  maxBabyCount: 8,

  async submit(officeName, yearState, yearDesc) {
    let params = {
      officeName,
      yearState,
      yearDesc
    }
    const ret = await request.postWithToken('/child/create', params)
    const data = request.standardResponse(ret);
    console.log('*****',data)
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  }
}