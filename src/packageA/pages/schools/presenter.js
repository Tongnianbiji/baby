import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data.js'
import Taro from '@tarojs/taro'
export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchValue:'',
      showInput:false,
      schoolsList:[],
      page:1,
      isToBottom:false,
      showLoading:true,
      postLock:false,
      inputValue:'',
      noResult:false
    }
  }

  componentDidMount() {
    //this.getSchoolsList()
  }
  onReachBottom(){
    const {postLock, isToBottom} = this.state;
    if(!postLock && !isToBottom){
      this.setState((pre)=>({
        page:pre.page+1
      }),()=>{
        this.getSchoolsList()
      })
    }
  }

  getSchoolsList = async ()=>{
    const {searchValue,page,schoolsList} = this.state;
    this.setState({
      postLock:true
    })
    let res = await Model.getData(searchValue,page);
    this.setState({
      postLock:false
    })
    if(res && res.items && res.items.length){
      const {total,items} = res;
      if (!schoolsList.length) {
        this.setState({
          schoolsList : items || []
        })
        
      } else {
        this.setState((pre)=>({
          schoolsList:pre.schoolsList.concat(items || [])
        }))
      }
      if (total <= this.state.schoolsList.length) {
        this.setState({
          showLoading:false,
          isToBottom:true
        })
      }
    }else{
      this.setState({
        noResult:true
      })
      this.showToast('没有查到相关学校')
    }
  }

  //重置列表
  initList = ()=>{
    this.setState({
      schoolsList:[],
      page:1,
      showLoading:true,
      isToBottom:false
    })
  }

  //选择学校
  selectItem = (name)=>{
    const {updateSchool} = staticData;
    updateSchool(name);
    this.navback()
  }

  async doSearch(e) {
    this.initList();
    !e.target.value && this.setState({
      noResult:false
    })
    this.setState({
      searchValue:e.target.value
    })
    if(e.target.value){
      let res = await this.getSchoolsList(e.target.value);
    }
  }

  handleChange = (e)=>{
    this.setState({
      searchValue:e
    })
  }

  cancelSearch = ()=>{
    Taro.navigateBack()
  }

  //提交其他学习
  submitOtherSchool = ()=>{
    this.setState({
      showInput:true
    })
  }

  handleInput = (e)=>{
    this.setState({
      inputValue:e.target.value
    })
  }

  cancelInput = ()=>{
    this.setState({
      showInput:false
    })
  }

  confirmInput = async()=>{
    const {inputValue} = this.state;
    if(inputValue){
      let res = await Model.addData(inputValue);
      if(res){
        Taro.showToast({
          title:'添加成功',
          icon:'success',
          duration:2e3,
        })
      }else{
        this.showToast('添加失败')
      }
      this.setState({
        showInput:false
      })
    }else{
      this.showToast('输入不能为空')
    }
  }
}