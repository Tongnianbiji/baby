import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class ProfileBabyPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      familyMember: Model.familyMember,
      otherMember: Model.otherMember
    }
  }

  componentDidMount() {
    // Model.childMine().then((res) => {
    //   if (!res.code) {
    //     this.setState({
    //       babyList: res.data
    //     })
    //   }
    // })
    // 
  }

  onClickNavTo(id) {
    this.navto({ url: `/packageA/pages/profile-home/index?id=${id}` })
  }

}
