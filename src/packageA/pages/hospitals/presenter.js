import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchValue:'',
      showInput:false,
      hospitalsList:[]
    }
  }

  componentDidMount() {
    this.getHospitalsList()
  }

  //获取关注列表
  getHospitalsList = async ()=>{
    let res = await Model.getData();
    console.log('***',res)
    if(res && res.items && res.items.length){
      this.setState({
        hospitalsList:res.items
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

  //提交其他医院
  submitOtherHospital = ()=>{
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