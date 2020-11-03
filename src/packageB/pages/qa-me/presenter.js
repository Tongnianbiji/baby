import BaseComponent from '@common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      answerData:[],
      postLock:false,
      isAnswerToBottom:false,
      showAnswerLoading:true,
      answerPageNum:1
    }
  }

  componentDidMount() {
   this.getAnswerData();
   Model.clearMessage('answer')
  }
  
  componentDidShow(){}

  onReachBottom(){
    const {postLock,isAnswerToBottom} = this.state;
    if(!postLock && !isAnswerToBottom){
      this.setState((pre)=>({
        answerPageNum:pre.answerPageNum+1
      }),()=>{
        this.getAnswerData()
      })
    }
  }

  //初始化参数
  initData = ()=>{
    this.setState({
      answerData:[],
      postLock:false,
      isAnswerToBottom:false,
      showAnswerLoading:true,
      answerPageNum:1
    })
  }

  

  //获取我的回答数据
  getAnswerData = async ()=>{
    const {answerData,answerPageNum} = this.state;
    const {userId} = this.getUserInfo();
    this.setState({
      postLock:true
    })
    let res = await Model.getAnswerData(userId,answerPageNum);
    this.setState({
      postLock:false
    })
    if(res && res.items && res.items.length){
      const {total,items} = res;
      if (!answerData.length) {
        this.setState({
          answerData : items || []
        })
        
      } else {
        this.setState((pre)=>({
          answerData:pre.answerData.concat(items || [])
        }))
      }
      if (total <= this.state.answerData.length) {
        this.setState({
          showAnswerLoading:false,
          isAnswerToBottom:true
        })
      }
    }
  }

  //回答收藏
  handleFavoriteAnswer = async (model)=>{
    let {postLock,answerData} = this.state;
    let preIndex = answerData.findIndex(item=>item.entity.qid === model.qid)
    if(!postLock){
     if(model.isMark){
       this.setState({
         postLock:true
       })
       let res = await Model.cancelMarkQuestion(model.qid);
       this.setState({
         postLock:false
       })
       answerData[preIndex].entity.isMark = false;
       answerData[preIndex].entity.markes -= 1;
       if(res){
         this.showToast('已取消');
       }
     }else{
       this.setState({
         postLock:true
       })
       let res = await Model.markQuestion(model.qid);
       this.setState({
         postLock:false
       })
       answerData[preIndex].entity.isMark = true;
       answerData[preIndex].entity.markes += 1;
       if(res){
         this.showToast('已收藏');
       }
     }
    }
    this.setState({
      answerData:answerData
    })
  }

   //点击帖子详情
   handlePostDetail(model) {
    this.navto({
      url:'/packageB/pages/issue-detail/index?qid='+(model.qid || model.entityId)
    })
  }
}