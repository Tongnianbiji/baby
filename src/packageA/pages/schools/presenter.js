import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchValue:'',
      showInput:false,
      schoolsList:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]
    }
  }

  componentDidMount() {
    this.getSchoolsList()
  }

  //获取关注列表
  getSchoolsList = async ()=>{
    let res = await Model.getData();
    if(res && res.items && res.items.length){
      this.setState({
        schoolsList:res.items
      })
    }else{
      this.showToast('请先登录')
    }
  }

  async doSearch(e) {
    let res = await Model.getData(e);
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
      searchValue:e
    })
  }

  cancelInput = ()=>{
    this.setState({
      showInput:false
    })
  }

  confirmInput = async()=>{
    const {searchValue} = this.setState;
    let res = await Model.getData(searchValue);
    this.setState({
      showInput:false
    })
  }
}