import Taro, {getCurrentInstance} from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import { SearchResultType } from '../../../common/enums'
import circleIsReload from '@src/common/utils/circleIsReload'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabList: Model.tabList,
      searchData: null,
      currentTopTab: 0,
      searchValue:'',
      searchScope:'all',
      circleResult:[],
      postResult:[],
      questionResult:[],
      userResult:[],
      circlePostResult:[],
      circleQuestionResult:[],
      circleEssenceResult:[],
      postLock:false,
      cid:'',
      sortObj:{}
    }
  }

  componentDidMount(){
    const { searchScope='all', tab=0, cid } = getCurrentInstance().router.params;
    this.getTabList(searchScope);
    this.topTabChange(tab);
    this.setState({
      searchScope:searchScope,
      cid:cid
    })
  }


  componentWillUnmount(){
    circleIsReload();
  }

  //获取不同的tabList
  getTabList = (searchScope)=>{
    switch(searchScope){
      case 'all':
        this.setState({
          tabList:Model.tabList1
        });
        break;
      case 'circle':
        this.setState({
          tabList:Model.tabList2
        });
    }
  }

  saveSecachHistory = async(type,content,cid)=>{
    return await Model.saveSecachHistory(type,content,cid)
  }

  clickDosearch = (value,e)=>{
    this.setState({
      searchValue:value
    },()=>{
      this.doSearch()
    })
  }

  async doSearch() {
    const {type,searchValue,searchScope,currentTopTab,cid,sortObj} = this.state;
    let searchType = null,searchCid = null;
    if(searchScope === 'all'){
      let res = await Model.search(type,searchValue,sortObj);
      searchType = 1;
      searchCid = 0;
      if(res){
        this.setState({
          circleResult:res.circleResult && res.circleResult.items || [],
          postResult:res.postResult && res.postResult.items|| [],
          questionResult:res.questionResult && res.questionResult.items|| [],
          userResult:res.userResult && res.userResult.items|| []
        })
      }
    }else{
      searchType = 3;
      searchCid = cid;
      switch(currentTopTab){
        case 0:
          let res1 = await Model.getEssenceList(cid,searchValue,sortObj);
          if(res1.items){
            this.setState({
              circleEssenceResult:res1.items
            });
          }
          break;
        case 1:
          let res2 = await Model.getPostList(cid,searchValue,sortObj);
          if(res2.items){
            this.setState({
              circlePostResult:res2.items
            });
          }
          break;
        case 2:
          let res3 = await Model.getQuestionList(cid,searchValue,sortObj);
          if(res3.items){
            this.setState({
              circleQuestionResult:res3.items
            })
          }
          break;
      }
    }
  }

  onMore = t => {
    const {searchScope} = this.state;
    let index = null;
    switch(searchScope){
      case 'all':
        index = {
          [SearchResultType.USER]: 4,
          [SearchResultType.CIRCLE]: 3,
          [SearchResultType.ANSWER]: 2,
          [SearchResultType.POST]: 1
        }[t]
        break;
      case 'circle':
        index = {
          [SearchResultType.ANSWER]: 3,
          [SearchResultType.POST]: 2,
          [SearchResultType.ESSENCE]: 1,
        }[t]
        break;
    }
    this.topTabChange(index)
  }

  topTabChange = (current) => {
    const {searchScope} = this.state;
    this.setState({
      currentTopTab: +current,
      sortObj:{_score:'desc'}
    })
    if(searchScope === 'circle'){
      this.doSearch()
    }
  }

  handleChange = (e)=>{
    this.setState({
      searchValue:e.target.value
    },()=>{
      this.doSearch()
    })
  }

  doSearchConfirm = async (e)=>{
    const {searchValue,searchScope,cid} = this.state;
    let searchType = null,searchCid = null;
    if(searchScope === 'all'){
      searchType = 1;
      searchCid = 0;
    }else{
      searchType = 3;
      searchCid = cid;
    }
    searchValue && this.saveSecachHistory(searchType,e.target.value,searchCid)
  }

  sortTabChange=(id)=>{
    let sortObj = null;
    switch(id){
      case 0:
        sortObj={_score:'desc'}
        break;
      case 1:
        sortObj={heat_rate:'desc'}
        break;
      case 2:
        sortObj={create_time:'desc'}
        break;
    }
    this.setState({
      sortObj
    },()=>{
      this.doSearch()
    })
  }

  cancelSearch = ()=>{
    Taro.navigateBack()
  }

   //加入/已加入
   handleSubsrc= async (model)=>{
    let {postLock,circleResult} = this.state;
    let preIndex = circleResult.findIndex(item=>item.cid === model.cid)
    if(!postLock){
     if(model.isSubscribe){
       this.setState({
         postLock:true
       })
       let res = await Model.leaveCircle(model.cid);
       this.setState({
         postLock:false
       })
       circleResult[preIndex].isSubscribe = false
       if(res){
         this.showToast('已取消');
       }
     }else{
       this.setState({
         postLock:true
       })
       let res = await Model.joinCircle(model.cid);
       this.setState({
         postLock:false
       })
       circleResult[preIndex].isSubscribe = true
       if(res){
         this.showToast('已加入');
       }
     }
    }
    this.setState({
      circleResult:circleResult
    })
  }

  //收藏
  handleFavoritePost = async (model) => {
    let { postLock, postResult } = this.state;
    let preIndex = null;
    const { pid, qid } = model;
    if (pid) {
      preIndex = postResult.findIndex(item => item.pid === model.pid)
    }
    else if (qid) {
      preIndex = postResult.findIndex(item => item.qid === model.qid)
    }
    if (!postLock) {
      if (model.isMark) {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.cancelMarkPost(pid);
        }
        else if (qid) {
          res = await Model.cancelMarkQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        postResult[preIndex].isMark = false;
        postResult[preIndex].markes -= 1;
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.markPost(pid);
        }
        else if (qid) {
          res = await Model.markQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        postResult[preIndex].isMark = true;
        postResult[preIndex].markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      postResult: postResult
    })
  }

  handleFavoriteQuestion  = async (model) => {
    let { postLock, questionResult } = this.state;
    let preIndex = null;
    const { pid, qid } = model;
    if (pid) {
      preIndex = questionResult.findIndex(item => item.pid === model.pid)
    }
    else if (qid) {
      preIndex = questionResult.findIndex(item => item.qid === model.qid)
    }
    if (!postLock) {
      if (model.isMark) {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.cancelMarkPost(pid);
        }
        else if (qid) {
          res = await Model.cancelMarkQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        questionResult[preIndex].isMark = false;
        questionResult[preIndex].markes -= 1;
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.markPost(pid);
        }
        else if (qid) {
          res = await Model.markQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        questionResult[preIndex].isMark = true;
        questionResult[preIndex].markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      questionResult: questionResult
    })
  }

  handleFavoriteCirclePost  = async (model) => {
    let { postLock, circlePostResult } = this.state;
    let preIndex = null;
    const { pid, qid } = model;
    if (pid) {
      preIndex = circlePostResult.findIndex(item => item.pid === model.pid)
    }
    else if (qid) {
      preIndex = circlePostResult.findIndex(item => item.qid === model.qid)
    }
    if (!postLock) {
      if (model.isMark) {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.cancelMarkPost(pid);
        }
        else if (qid) {
          res = await Model.cancelMarkQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        circlePostResult[preIndex].isMark = false;
        circlePostResult[preIndex].markes -= 1;
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.markPost(pid);
        }
        else if (qid) {
          res = await Model.markQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        circlePostResult[preIndex].isMark = true;
        circlePostResult[preIndex].markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      circlePostResult: circlePostResult
    })
  }

  handleFavoriteCircleQuestion  = async (model) => {
    let { postLock, circleQuestionResult } = this.state;
    let preIndex = null;
    const { pid, qid } = model;
    if (pid) {
      preIndex = circleQuestionResult.findIndex(item => item.pid === model.pid)
    }
    else if (qid) {
      preIndex = circleQuestionResult.findIndex(item => item.qid === model.qid)
    }
    if (!postLock) {
      if (model.isMark) {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.cancelMarkPost(pid);
        }
        else if (qid) {
          res = await Model.cancelMarkQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        circleQuestionResult[preIndex].isMark = false;
        circleQuestionResult[preIndex].markes -= 1;
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.markPost(pid);
        }
        else if (qid) {
          res = await Model.markQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        circleQuestionResult[preIndex].isMark = true;
        circleQuestionResult[preIndex].markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      circleQuestionResult: circleQuestionResult
    })
  }

  handleFavoriteCircleEssence = async (model) => {
    let { postLock, circleEssenceResult } = this.state;
    let preIndex = null;
    const { pid, qid } = model;
    if (pid) {
      preIndex = circleEssenceResult.findIndex(item => item.pid === model.pid)
    }
    else if (qid) {
      preIndex = circleEssenceResult.findIndex(item => item.qid === model.qid)
    }
    if (!postLock) {
      if (model.isMark) {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.cancelMarkPost(pid);
        }
        else if (qid) {
          res = await Model.cancelMarkQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        circleEssenceResult[preIndex].isMark = false;
        circleEssenceResult[preIndex].markes -= 1;
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = null;
        if (pid) {
          res = await Model.markPost(pid);
        }
        else if (qid) {
          res = await Model.markQuestion(qid);
        }
        this.setState({
          postLock: false
        })
        circleEssenceResult[preIndex].isMark = true;
        circleEssenceResult[preIndex].markes += 1;
        if (res) {
          this.showToast('已收藏');
        }
      }
    }
    this.setState({
      circleEssenceResult: circleEssenceResult
    })
  }

  subScrUser = async (model) => {
    let { postLock, userResult } = this.state;
    let preIndex = userResult.findIndex(item => item.userId === model.userId)
    if (!postLock) {
      if (model.isSubscribe) {
        this.setState({
          postLock: true
        })
        let res = await Model.cancelAttentionUser(model.userId);
        this.setState({
          postLock: false
        })
        userResult[preIndex].isSubscribe = false
        if (res) {
          this.showToast('已取消');
        }
      } else {
        this.setState({
          postLock: true
        })
        let res = await Model.attentionUser(model.userId);
        this.setState({
          postLock: false
        })
        userResult[preIndex].isSubscribe = true
        if (res) {
          this.showToast('已关注');
        }
      }
    }
    this.setState({
      userResult: userResult
    })
  }
}