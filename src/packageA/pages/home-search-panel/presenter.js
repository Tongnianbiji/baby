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
    searchValue && this.saveSecachHistory(searchType,searchValue,searchCid)
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
}