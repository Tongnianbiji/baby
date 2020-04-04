export default {
  getMenus() {
    return new Promise(res => {
      res({ data: [
        {
          id: 1,
          title: '推荐'
        },
        {
          id: 2,
          title: '生活记录',
          actived: true
        },
        {
          id: 3,
          title: '教育'
        },
        {
          id: 4,
          title: '健康'
        },
        {
          id: 5,
          title: '饮食'
        },
        {
          id: 6,
          title: '购物'
        },
        {
          id: 7,
          title: '亲子游'
        },
        {
          id: 8,
          title: '休闲娱乐'
        },
        {
          id: 9,
          title: '家庭理财'
        },
        {
          id: 10,
          title: '宝爸'
        },
        {
          id: 11,
          title: '宝妈'
        },
      ]})
    })
  },

  getTags() {
    return new Promise(resolve => {
      resolve({
        data: ['备孕', '孕期', '产后', '单亲妈妈', '二胎妈妈', '三胎妈妈', '高龄产妇', '双独家庭', '婆媳关系', '生活记录', '职场生活', '两性关系', '护肤关系', '减肥瘦身', '美丽微整']
      })
    })
  }
}