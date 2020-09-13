import BaseComponent from '@common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      detailData: {},
      commentList: [
        {
          key: 1,
          list: [{ key: 3, list: [{ key: 6 }] }, { key: 4 }, { key: 7 }]
        },
        {
          key: 2
        }
      ]
    }
  }
  componentDidMount() {
    this.showNavLoading()
    this.getData()
  }

  async getData(pid = this.$router.params.pid) {
    const d = await Model.getDetail(pid)
    console.log(d, 'dddd');
    if (d) {
      this.setState({
        detailData: d
      })
    }
    this.hideNavLoading()
    this.setNavBarTitle(d ? d.cName : '查询失败')
  }
}