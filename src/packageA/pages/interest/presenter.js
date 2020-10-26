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
      subTypeIndex:0,
      sid:1,
      activeSids: new Set([2])
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
  
  //主菜单
  selectTypeTab = (index,sid)=>{
    this.setState({
      typeIndex:index,
      sid:sid
    },()=>{
      this.getSecondLevelData()
    })
  }
  //子菜单
  selectSubTypeTab = (sid)=>{
    let {activeSids} = this.state;
    if(activeSids.has(sid)){
      activeSids.delete(sid);
    }else{
      activeSids.add(sid);
    }
    this.setState({
      activeSids:activeSids
    })
  }
  //提交
  submit = async ()=>{
    const {updateGuideStatus,updateIsLoginStatus} = staticDataStore;
    const {activeSids} = this.state;
    
    let newActiveSids = Array.from(activeSids);
    if(newActiveSids.length){
      await Model.addData(newActiveSids);
      updateGuideStatus(false); 
      updateIsLoginStatus(true);
      Taro.switchTab({
        url: '/pages/index/index'
      })
    }else{
      this.showToast('至少选择一项')
    }
  }
}
