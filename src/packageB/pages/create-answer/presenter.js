import BaseComponent from '@common/baseComponent'
import Model from './model'
import Taro from '@tarojs/taro'
import staticData from '@src/store/common/static-data'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      showTip: true,
      canSave: false,
      tagList: [],
      selectedTag: [],
      files:[]
    }
    this.$store = this.props.circleDetailStore;
    this.circleList = [];
    this.circleTriggerStr = '[]';
  }

  componentDidMount() {
    const { qid, cname = '' } = this.$router.params

    this.setNavBarTitle(cname)
    this.showNavLoading()

    this.init(qid)
  }
  componentDidShow() {
    if (staticData.tempCircleItem) {
      this.circleList.push(staticData.tempCircleItem);
      let content = this.state.content;
      this.setState({
        content: content.replace(this.circleTriggerStr, `[${staticData.tempCircleItem.name}]`),
      })
    }
    staticData.setTempCircleItem(null);
  }

  componentWillUnmount(){
    this.$store.updateOpPanel(false)
  }

  async init(qid) {
    const tags = await Model.getTags(qid)
    this.setState({
      tagList: tags
    })

    this.hideNavLoading()
  }

  contentInput = (e) => {
    const value = e.detail.value;
    if (value.indexOf(this.circleTriggerStr) > -1) {
      Taro.navigateTo({
        url: '/packageA/pages/user-circles/index?mode=select'
      })
    }

    this.setState({
      content: value,
      canSave: value.length > 4
    })
  }

  hideTip = () => {
    this.setState({ showTip: false })
  }

  tagClick = tag => {
    const { selectedTag } = this.state
    const index = selectedTag.indexOf(tag.tagId)

    if (index > -1) {
      selectedTag.splice(index, 1)
    } else {
      selectedTag.push(tag.tagId)
    }

    this.setState(prev => ({
      canSave: prev.content.length > 4,
      selectedTag
    }))
  }
  getFiles = (file) => {
    this.setState(prev => ({
      files: prev.files.concat([file])
    }))
  }

  async doSubmit() {
    const { canSave, selectedTag, name, content, files } = this.state
    const { qid } = this.$router.params
    if (!canSave) {
      return false
    }
    

    this.showNavLoading()
    const p = /\[(.*?)\]/g;
    const replaceValue = content.replace(p, (item, $1) => {
      const circleItem = this.circleList.find(item => item.name == $1);
      return `_##_${JSON.stringify({
        name: circleItem.name,
        cid: circleItem.cid,
      })}_##_`
    })
    const params = {
      qid,
      // title: name,
      // content,
      files:files,
      content: replaceValue,
      tagIds: selectedTag
    }

    const pid = await Model.saveIssue(params)

    this.hideNavLoading()

    if (pid) {
      this.showToast('恭喜您, 提交成功')
      setTimeout(() => {
        Taro.navigateBack()
      }, 2000)
    } else {
      this.showToast('保存失败, 请稍候再试')
    }
  }
}