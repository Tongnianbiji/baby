import BaseComponent from '@common/baseComponent'
import Model from './model'
import issueDetailStore from './store/issue-detail'
import circleIsReload from '@src/common/utils/circleIsReload'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      statusBarHeight:0,
      isCanEntranceCircle:true,
      issueDetail:{}
    }
  }

  async componentDidMount(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if(prevPage.route === 'packageA/pages/circle-detail/index'){
      this.setState({
        isCanEntranceCircle:false
      })
    }else{
      this.setState({
        isCanEntranceCircle:true
      })
    }
  }

  async componentDidShow(){
    const {qid} = this.$router.params;
    const {getQid,getIssueDetail,getAnswerList} =issueDetailStore;
    getQid(qid);
    await getIssueDetail();
    await getAnswerList();
    this.setState({
      issueDetail:issueDetailStore.issueDetail
    })
  }

  componentWillUnmount(){
    const {initPageList} = issueDetailStore
    initPageList();
    circleIsReload();
  }

   //自定义进入圈子
   entrancePage = ()=>{
    const {cid,cName} = issueDetailStore.issueDetail;
    this.navto({
      url:`/packageA/pages/circle-detail/index?cid=${cid}&cname=${cName}`
    })
  }

  //去回答
  goAnswer = ()=>{
    const {qid} = issueDetailStore;
    this.navto({
      url:`/packageB/pages/create-answer/index?qid=${qid}`
    })
  }
}