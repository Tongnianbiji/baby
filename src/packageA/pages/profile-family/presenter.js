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
    this.getFamilyList()
  }

  onClickNavTo(userId) {
    this.navto({ url: `/packageA/pages/profile-home/index?userId=${userId}` })
  }

  getFamilyList = async ()=>{
    const { bid } = this.$router.params
    let res = await Model.getData(bid);
    if(res && res.data && res.data.family){
      this.setState({
        familyMember:res.data.family,
        otherMember:res.data.emptyRoles
      })
    }
  }
}
