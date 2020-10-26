import Taro, {getCurrentInstance} from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import { SearchResultType } from '../../../common/enums'

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
      userResult:[]
    }
  }

  componentDidMount(){
    const { searchScope='all', tab=0 } = getCurrentInstance().router.params;
    this.getTabList(searchScope);
    this.topTabChange(tab);
    this.setState({
      searchScope:searchScope
    })
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

  async doSearch() {
    const {type,searchValue} = this.state;
    let res = await Model.search(type,searchValue);
    if(res){
      this.setState({
        circleResult:this.objectToArr(res.circleResult.items),
        postResult:this.objectToArr(res.postResult.items),
        questionResult:this.objectToArr(res.questionResult.items),
        userResult:this.objectToArr(res.userResult.items)
      })
    }
  }

  //对象转数组
  objectToArr = (obj)=>{
    let arr = [];
    for(let o in obj){
      arr.push(obj[o])
    }
    return arr;
  }

  onMore = t => {
    const {searchScope} = this.state;
    let index = null;
    switch(searchScope){
      case 'all':
        index = {
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
    this.setState({
      currentTopTab: +current
    })
  }

  handleChange = (e)=>{
    console.log(e.target.value)
    this.setState({
      searchValue:e.target.value
    })
  }

  cancelSearch = ()=>{
    Taro.navigateBack()
  }
}