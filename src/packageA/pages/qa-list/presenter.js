import BaseComponent from '@common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [{ title: '我的提问' }, { title: '我的回答' }],
      currentTab: 0,
      questionData:[],
      answerData:[
        // {
        //   cName: "备孕交流",
        //   cid: 10397889,
        //   createTime: "2020-10-19 11:21:42",
        //   files: [],
        //   isMark: false,
        //   markes: 0,
        //   qid: 8,
        //   replys: 0,
        //   tags: [],
        //   title: "再测试一下",
        //   uid: "4a836531a49cf9170ed75dd24b488f78",
        //   unReads: 0,
        //   userSnapshot:{
        //     city: "上海",
        //     country: "浦东",
        //   }
        // }
      ],
      postLock:false,
      isQuestionToBottom:false,
      isAnswerToBottom:false,
      showQuestionoading:true,
      showAnswerLoading:true,
      questionPageNum:1,
      answerPageNum:1
    }
  }

  componentDidMount() {
   this.getQuestionData()
  }
  
  componentDidShow(){}

  onReachBottom(){
    const {postLock, isQuestionToBottom,isAnswerToBottom,currentTab} = this.state;
    if(currentTab ===0){
      if(!postLock && !isQuestionToBottom){
        this.setState((pre)=>({
          questionPageNum:pre.questionPageNum+1
        }),()=>{
          this.getQuestionData()
        })
      }
    }else{
      if(!postLock && !isAnswerToBottom){
        this.setState((pre)=>({
          answerPageNum:pre.answerPageNum+1
        }),()=>{
          this.getAnswerData()
        })
      }
    }
  }

  tabChange = index => {
    this.setState({ currentTab: index });
    this.initData();
    if(index ===0 ){
      this.getQuestionData()
    }else{
      this.getAnswerData()
    }
  }

  //初始化参数
  initData = ()=>{
    const {currentTab} = this.state;
    if(currentTab === 0){
      this.setState({
        questionData:[],
        postLock:false,
        isQuestionToBottom:false,
        showQuestionoading:true,
        questionPageNum:1,
      })
    }else{
      this.setState({
        answerData:[],
        postLock:false,
        isAnswerToBottom:false,
        showAnswerLoading:true,
        answerPageNum:1
      })
    }
  }

  //获取我的提问数据
  getQuestionData = async ()=>{
    const {questionData,questionPageNum} = this.state;
    const {userId} = this.getUserInfo();
    this.setState({
      postLock:true
    })
    let res = await Model.getQuestionData(userId,questionPageNum);
    this.setState({
      postLock:false
    })
    if(res && res.items){
      const {total,items} = res;
      if (!questionData.length) {
        this.setState({
          questionData : items || []
        })
        
      } else {
        this.setState((pre)=>({
          questionData:pre.questionData.concat(items || [])
        }))
      }
      if (total <= this.state.questionData.length) {
        this.setState({
          showQuestionoading:false,
          isQuestionToBottom:true
        })
      }
    }else{
      // this.showToast('暂无我的提问')
    }
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
    if(res && res.items){
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
    }else{
      // this.showToast('暂无我的回答')
    }
  }

  //提问收藏
  handleFavoriteQuestion = async (model)=>{
    let {postLock,questionData} = this.state;
    let preIndex = questionData.findIndex(item=>item.qid === model.qid)
    if(!postLock){
     if(model.isMark){
       this.setState({
         postLock:true
       })
       let res = await Model.cancelMarkQuestion(model.qid);
       this.setState({
         postLock:false
       })
       questionData[preIndex].isMark = false;
       questionData[preIndex].markes -= 1;
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
       questionData[preIndex].isMark = true;
       questionData[preIndex].markes += 1;
       if(res){
         this.showToast('已收藏');
       }
     }
    }
    this.setState({
      questionData:questionData
    })
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