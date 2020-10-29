import { observable, action} from 'mobx'
import Taro from '@tarojs/taro'
import Request from '@common/baseRequest'
import Model from '../model'

const req = new Request();

class IssueDetailStore{
  @observable qid = '';
  @observable answerList=[
  //   {questionReplyBo:
  //   {
  //     content:'',
  //     createTime :'',
  //     dislikes : 0,
  //     isDislikes:false,
  //     isLikes : false,
  //     likes : 0,
  //     files : [],
  //     qid:6,
  //     replyId:1,
  //     userSnapshot: {
  //       city : '',
  //       country : '',
  //       headImg :'',
  //       nickName:'',
  //       sex :'',
  //       customLevel : [{ desc: '' }]
  //     }
  //   }
  // }
  ];
  @observable activeSortType=1;
  @observable issueDetail = {
    replys:0,
    isMark:false,
    qid:1,
    markes:0,
    userSnapshot: {
      city:'',
      country : '',
      headImg :'',
      nickName :'',
      sex :'',
      customLevel : [{desc:''}]
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

  @action initPageList = ()=>{
    this.answerList = [],
    this.issueDetail = {
      replys:0,
      isMark:false,
      qid:1,
      markes:0,
      userSnapshot: {
        city:'',
        country : '',
        headImg :'',
        nickName :'',
        sex :'',
        customLevel : [{desc:''}]
      }
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
    this.answerList[preIndex].questionReplyBo.likes += likes;
    this.answerList[preIndex].questionReplyBo.isLikes = isLikes;
  }

  @action updateAnswerListIsDislike = (params)=>{
    const {preIndex,dislikes,isDislikes} = params;
    this.answerList[preIndex].questionReplyBo.dislikes += dislikes;
    this.answerList[preIndex].questionReplyBo.isDislikes = isDislikes;
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