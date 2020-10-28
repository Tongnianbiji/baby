import BaseRequest from '../../../common/baseRequest'

const request = new BaseRequest();
export default {
  familyMember: [
    {
      id: 1,
      name: '我',
      role: '妈妈',
      avatar: 'https://cdn.tongnian.world/head/20170710210234_y3Kf5.thumb.1000_0.jpeg',
      joinTime: '2019-12-01 12:00:00  加入童年'
    },
    {
      id: 2,
      name: '小头爸爸',
      role: '爸爸',
      avatar: 'https://cdn.tongnian.world/head/20170710210234_y3Kf5.thumb.1000_0.jpeg',
      joinTime: '2019-12-01 12:00:00  加入童年'
    },
    {
      id: 3,
      name: '西南风',
      role: '奶奶',
      avatar: 'https://cdn.tongnian.world/head/20170710210234_y3Kf5.thumb.1000_0.jpeg',
      joinTime: '2019-12-01 12:00:00  加入童年'
    }
  ],
  otherMember: [
    {
      id: 4,
      role: '爷爷'
    },
    {
      id: 5,
      role: '外公'
    },
    {
      id: 6,
      role: '外婆'
    },
    {
      id: 7,
      role: '舅舅'
    },
    {
      id: 8,
      role: '舅妈'
    },
    {
      id: 9,
      role: '叔叔'
    },
    {
      id: 10,
      role: '婶婶'
    },
    // {
    //   id: 11,
    //   role: '其他'
    // },
  ],
  // childMine() {
  //   return request.getWithToken('/child/mine', {}).then(ret => {
  //     if (ret.errMsg === request.okMsg) {
  //       return ret.data
  //     }
  //     return { code: -1 }
  //   })
  // },

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

  async getInviteData(bid){
    let params ={
      bid
    }
    const ret = await request.getWithToken('/child/invite', params)
    const data = request.standardResponse(ret);
    if (data.code === 0) {
      return data
    } else {
      return false
    }
  }

}
