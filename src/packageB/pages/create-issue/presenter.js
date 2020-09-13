import BaseComponent from '@common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      showTip: true,
      canSave: false,
      tagList: [],
      selectedTag: []
    }
  }

  componentDidMount() {
    const { cid, cname = '' } = this.$router.params

    this.setNavBarTitle(cname)
    this.showNavLoading()

    this.init(cid)
  }

  async init(cid) {
    const tags = await Model.getTags(cid)
    this.setState({
      tagList: tags
    })

    this.hideNavLoading()
  }

  contentInput = ({ detail }) => {
    this.setState({
      content: detail.value,
      canSave: detail.value.length > 4
    })
  }

  hideTip = () => {
    this.setState({ showTip: false })
  }

  tagClick = tag => {
    const { selectedTag } = this.state
    const index = selectedTag.indexOf(tag)

    if (index > -1) {
      selectedTag.splice(index, 1)
    } else {
      selectedTag.push(tag)
    }

    this.setState(prev => ({
      canSave: prev.content.length > 4,
      selectedTag
    }))
  }

  async doSubmit() {
    const { canSave, selectedTag, name, content } = this.state
    const { cid } = this.$router.params
    if (!canSave) {
      return false
    }

    this.showNavLoading()

    const params = {
      cid,
      title: name,
      content,
      tagIds: selectedTag
    }

    const pid = await Model.saveIssue(params)

    this.hideNavLoading()

    if (pid) {
      this.showToast('恭喜您, 提交成功')
      setTimeout(() => {
        // 跳哪去?
      }, 2000)
    } else {
      this.showToast('保存失败, 请稍候再试')
    }
  }
}