import { observable, action} from 'mobx'
import Taro from '@tarojs/taro'
import Request from '@common/baseRequest'
import Model from '../model'

const req = new Request();

class IssueDetailStore{
  @observable qid = '';
  @observable answerList=[
    {questionReplyBo:
    {
      content:'这是一个测试回答（模拟数据）',
      createTime :'2020-03-29 21:29:00',
      dislikes : 0,
      isDislikes:false,
      isLikes : false,
      likes : 0,
      files : [],
      qid:6,
      replyId:1,
      userSnapshot: {
        city : '上海',
        country : '宝山',
        headImg :'',
        nickName:'昵称1',
        sex :'MALE',
        customLevel : [{ desc: '3岁9个月' }]
      }
    }
  }
  ];
  @observable activeSortType=1;
  @observable issueDetail = {
    replys:18,
    isMark:false,
    qid:1,
    markes:0,
    userSnapshot: {
      city:'上海',
      country : '宝山',
      headImg :'',
      nickName :'昵称1',
      sex :'MALE',
      customLevel : [{desc:'3岁9个月'}]
    }
  };
  @action getQid=(qid)=>{
    this.qid = qid
  }

  @action getIssueDetail=async ()=>{
    let res = await Model.getDetail(this.qid);
    if(res){
      this.issueDetail = res
    }
  }

  @action getAnswerList = async()=>{
    const {qid,activeSortType} = this;
    let res = await Model.getAnswerList(qid,activeSortType);
    if(res && res.items.length){
      this.answerList = res.items
    }
  }

  @action updateAnswerListIsLike = (params)=>{
    const {preIndex,likes,isLikes} = params;
    this.answerList[preIndex].likes += likes;
    this.answerList[preIndex].isLikes = isLikes;
  }

  @action updateAnswerListIsDislike = (params)=>{
    const {preIndex,dislikes,isDislikes} = params;
    this.answerList[preIndex].dislikes += dislikes;
    this.answerList[preIndex].isDislikes = isDislikes;
  }

  @action getActiveSortType = (type)=>{
   this.activeSortType=type;
  }

  @action updateQuestionFavoriteMarks = (params) => {
    const { markes, isMark } = params;
    this.issueDetail.markes += markes;
    this.issueDetail.isMark = isMark;
  }

}


const store = new IssueDetailStore();

export default store;