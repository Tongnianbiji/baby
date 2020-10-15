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
      subTypeIndex:1
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClickForSkip() {
    console.log('skip');

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
