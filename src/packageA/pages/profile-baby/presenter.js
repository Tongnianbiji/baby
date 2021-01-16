import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'

export default class ProfileBabyPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      babyList: [],
      isToFamily:false
    }
  }

  componentDidMount() {
    const {isToFamily} = this.$router.params;
    if(isToFamily){
      this.setState({
        isToFamily:true
      })
    }
  }

  componentDidShow() {
    const {updateBabyList} = staticData;
    Model.childMine().then((res) => {
      if (!res.code) {
        this.setState({
          babyList: res.data
        })
        updateBabyList(res.data)
      }
    })
  }

  onClickNavTo(item) {
    const { updateBabyNickname, updateSchool, updateSchoolItem} = staticData;
    const {isToFamily} = this.state;
    if(!isToFamily){
      updateBabyNickname(item.officeName);
      updateSchool(item.yearDesc.school);
      updateSchoolItem({
        name: item.yearDesc.school,
        schoolId: item.yearDesc.schoolId,
      })
      this.navto({ url: `/packageA/pages/profile-baby-detail/index?bid=${item.bid}&yearState=${item.yearState}` })
    }else{
      this.navto({ url: `/packageA/pages/profile-family/index?bid=${item.bid}&officeName=${item.officeName}` })
    }
    
  }

  onClickNavToAction() {
    const { updateBabyNickname, updateSchool, updateHospital, updateSchoolItem } = staticData;
    updateSchoolItem('')
    updateBabyNickname('');
    updateSchool('');
    updateHospital('');
    this.navto({ url: `/packageA/pages/profile-baby-action/index` })
  }
}
