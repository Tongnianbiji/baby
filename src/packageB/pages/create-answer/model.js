import Request from '@common/baseRequest'
import Taro, {getCurrentInstance} from '@tarojs/taro'

const req = new Request()

export default {
  async getTags(qid) {
    const ret = await req.post('question/getTag', { qid })
    const d = req.standardResponse(ret)
    if (d.code === 0 && d.data && d.data.items.length) {
      return d.data.items
    } else {
      return [
        { tagName: '这是', tagId: '1' ,scrollId:'A'},
        { tagName: '测试的', tagId: '2',scrollId:'B' },
        { tagName: '数据', tagId: '3' ,scrollId:'C'},
        { tagName: '生活1', tagId: '4',scrollId:'D' },
        { tagName: '灌水1', tagId: '5',scrollId:'E' },
        { tagName: '生活', tagId: '6',scrollId:'F' },
        { tagName: '灌水', tagId: '7' ,scrollId:'G'}
      ]
    }
  },

  async saveIssue(params) {
    const ret = await req.postWithToken('/question/reply', params)
    const d = req.standardResponse(ret)
    if (d.code) {
      Taro.showToast({
        title:d.message,
        icon: 'none',
        duration:2e3
      })
    } else {
      return d.code === 0 && d.data
    }
  }
}