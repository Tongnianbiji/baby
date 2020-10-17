import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import Taro, {getCurrentInstance} from '@tarojs/taro'

export default class ProfileBabyActionPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: Model.tabs,
      tabsCurrent: 0,
      isHavebabyInfo:false
    }
  }

  componentDidMount() { 
    const {id} = getCurrentInstance().router.params;
    if(id){
      this.setState({
        isHavebabyInfo:true
      })
    }else{
      this.setState({
        isHavebabyInfo:false
      })
    }
  }

  onClickNavTo(id) {
    this.navto({ url: `/packageA/pages/profile-baby-detail/index?id=${id}` })
  }

  onClickForCreate() {
    Model.childCreate();
    // Model.searchSchool();
  }

  /**
   * tab 点击
   * @param {Number} value 索引
   */
  onClickForTabs(value) {
    this.setState({
      tabsCurrent: value,
    })
  }
}
