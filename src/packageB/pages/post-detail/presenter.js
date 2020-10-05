import BaseComponent from '@common/baseComponent'
import React from 'react'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      detailData: {
        userSnapshot: {
          city: '',
          country: '',
          headImg: '',
          nickName: '',
          sex: '',
          customLevel: [{ desc: '3岁9个月' }]
        }
      },
      commentList: [
        {
          key: 1,
          list: [{ key: 3, list: [{ key: 4, list: [{ key: 5, list: [{ key: 6, list: [{ key: 7, list: [{ key: 8 ,list: [{ key: 9,list: [{ key: 10,list: [{ key: 11 }] }] }]}] }] }] }] }] }, { key: 16 }, { key: 26 }]
        },
        {
          key: 2
        }
      ],
      isFocus:false
    }
  }
  componentDidMount() {
    this.showNavLoading()
    this.getData()
    this.getReplyList()
  }

  //回复帖子
  replyPost = (model) => {
    console.log('回帖', model)
    this.setState({
      isFocus:true
    })
  }
  onBlur = () => {
    this.setState({
      isFocus:false
    })
  }
  onFocus = () => {
    this.setState({
      isFocus:true
    })
  }

  async getData(pid = this.$router.params.pid) {
    const d = await Model.getDetail(pid)
    console.log(d, 'dddd');
    if (d) {
      this.setState({
        detailData: JSON.parse(JSON.stringify(d))
      })
    }
    this.hideNavLoading()
    this.setNavBarTitle(d ? d.cName : '查询失败')
  }
  async getReplyList(sortType=1 ,pid = this.$router.params.pid) {
    const d = await Model.getReplyList(pid,sortType)
    console.log(d, 'dddd');
    if (d) {
      this.setState({
        commentList:d.items
     })
    }
    this.hideNavLoading()
  }
}