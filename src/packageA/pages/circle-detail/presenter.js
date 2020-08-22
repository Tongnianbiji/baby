import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      listType: 0,
      dataList: [1, 2, 3, 4],
      showOpPanel: false
    }

    this.$store = this.props.circleDetailStore
  }

  componentDidMount() {
    const { cid, cname = '' } = this.$router.params
    this.setNavBarTitle(cname)
    this.showLoading()
    this.initData(cid)
  }

  async initData(cid) {
    const { leaf } = await this.$store.getDetail(cid)
    await this.$store.getAttentionState(cid)
    await this.$store.getTopPost(cid)
    await this.$store.getParentCircles(cid)
    if (leaf) {
      await this.$store.getSiblingCircles(cid)
    } else {
      await this.$store.getChildCircles(cid)
    }
    this.hideLoading()
  }

  typeChange = (index, data) => {
    this.setState({ listType: index })
  }

  troggleOpPanel = () => {
    this.setState(prevState => ({
      showOpPanel: !prevState.showOpPanel
    }))
  }
}