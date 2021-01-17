import BaseComponent from '@common/baseComponent'
import Model from './model'
import Taro from '@tarojs/taro'
import staticData from '@src/store/common/static-data'
import circleIsReload from '@src/common/utils/circleIsReload'
// import circleDetailStore from '@src/store/circle-detail'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      showTip: true,
      canSave: false,
      tagList: [],
      selectedTag: [],
      files: [],
      selectedCircle: '',
      isSelectCircleControlShow: false,
    }
    this.$store = this.props.circleDetailStore;
    this.circleList = [];
    this.circleTriggerStr = '[]';
    this.selectedCircleItem = {};
  }

  componentDidMount() {
    const { cid, cname = '' } = this.$router.params
    this.setNavBarTitle(cname)
    // this.showNavLoading()
    this.init(cid)
    this.setState({
      isSelectCircleControlShow: this.$router.params.from == 'home',
    })
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

    // 首页发问答
    if (staticData.tempSelectCircleItem) {
      const { name: cname, cid } = staticData.tempSelectCircleItem;
      const { name, content } = this.state;
      this.setState({
        selectedCircle: cname,
        canSave:  this.getReplaceValue(content).length > 4 && !!cname,
      })
      this.setNavBarTitle(cname);
      this.init(cid);
      this.selectedCircleItem = staticData.tempSelectCircleItem;
      staticData.setTempSelectCircleItem(null);
    }
  }

  componentWillUnmount(){
    this.$store.updateOpPanel(false);
    circleIsReload()
  }

  async init(cid) {
    if (!cid) return;
    const tags = await Model.getTags(cid)
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
      canSave: value.length > 4 && !!this.state.selectedCircle
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
      canSave: prev.content.length > 4 && !!this.state.selectedCircle,
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
    const { cid } = this.$router.params
    if (!canSave) {
      return false
    }
    

    this.showNavLoading()

    const params = {
      cid: cid || this.selectedCircleItem.cid,
      // title: name,
      // content,
      files:files,
      title: this.getReplaceValue(content),
      tagIds: selectedTag
    }

    const pid = await Model.saveIssue(params)

    this.hideNavLoading()

    if (pid) {
      this.showToast('恭喜您, 提交成功')
      this.$store.circleQuestion = [];
      setTimeout(() => {
        this.$store.initCircleQuestion();
        Taro.navigateBack()
      }, 2000)
    } else {
      this.showToast('保存失败, 请稍候再试')
    }
  }
  getReplaceValue(content) {
    const p = /\[(.*?)\]/g;
    const replaceValue = content.replace(p, (item, $1) => {
      const circleItem = this.circleList.find(item => item.name == $1);
      return `_##_${JSON.stringify({
        name: circleItem.name,
        cid: circleItem.cid,
      })}_##_`
    })
    return replaceValue;
  }
  toSelectCircle() {
    Taro.navigateTo({
      url: '/packageB/pages/select-circle/index'
    })
  }
}