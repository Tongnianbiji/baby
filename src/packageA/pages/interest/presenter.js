import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticDataStore from '@src/store/common/static-data'

export default class InterestPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      typeList: Model.typeList,
      subTypeList: Model.subTypeList,
      typeIndex:0,
      subTypeIndex:1,
      sid:1
    }
  }

  componentWillMount() { }

  componentDidMount = async ()=> { 
    await this.getFirstecondLeveData();
    await this.getSecondLevelData();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClickForSkip() {
    console.log('skip');
  }
  //获取一级话题
  getFirstecondLeveData = async ()=>{
    let res = await Model.getFirstecondLeveData();
    console.log('一级',res)
    if(res && res.length){
      this.setState({
        typeList:res
      })
    }else{
      this.showToast('系统异常')
    }
  }
  //获取二级话题
  getSecondLevelData = async ()=>{
    const {sid} = this.state;
    let res = await Model.getSecondLevelData(sid);
    if(res && res.length){
      this.setState({
        subTypeList:res
      })
    }else{
      this.showToast('系统异常')
    }
  }
  //获取兴趣数据
  getInterestList= async ()=>{
    let res = await Model.getData();
  }
  //主菜单
  selectTypeTab = (index)=>{
    this.setState({
      typeIndex:index
    })
  }
  //子菜单
  selectSubTypeTab = (index)=>{
    this.setState({
      subTypeIndex:index
    })
  }
  //提交
  submit = ()=>{
    const {updateGuideStatus} = staticDataStore;
    updateGuideStatus(false);
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }
}
