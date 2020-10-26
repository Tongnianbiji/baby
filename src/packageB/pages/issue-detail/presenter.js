import BaseComponent from '@common/baseComponent'
import Model from './model'
import issueDetailStore from './store/issue-detail'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
  }

  async componentDidMount(){}

  async componentDidShow(){
    const {qid} = this.$router.params;
    const {getQid,getIssueDetail,getAnswerList} =issueDetailStore;
    getQid(qid);
    await getIssueDetail();
    await getAnswerList()
  }

  

  //去回答
  goAnswer = ()=>{
    const {qid} = issueDetailStore;
    this.navto({
      url:`/packageB/pages/create-answer/index?qid=${qid}`
    })
  }
}