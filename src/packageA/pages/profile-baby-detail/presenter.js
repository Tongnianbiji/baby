import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'

export default class ProfileBabyDetailPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      yearState:'BRINGUP',
      baby:{
        bid:1,
        officeName:'大宝',
        yearDesc:{
          birthday: "2020-10-17",
          sex: "MALE",
          school:'请选择',
          grade:'请选择'
        }
      },
      gradeSelector:Model.gradeSelector
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    const {bid,yearState} = this.$router.params;
    const {babyList} = staticData;
    if(bid){
      let preIndex = babyList.findIndex(item=>item.bid == bid);
      this.setState({
        baby:babyList[preIndex],
        yearState:yearState
      })
    }
  }

  componentWillUnmount() { }

  componentDidShow(){
    const {babyNickname,school} = staticData;
    let {baby} = this.state;
    baby.officeName = babyNickname;
    baby.yearDesc.school = school;
    this.setState({
      baby:baby
    })
  }

  componentDidHide() { }

  //修改宝宝小名
  modifyBabyNickname = ()=>{
    this.navto({
      url:'/packageA/pages/profile-setting-baby-nickname/index?babyNickname=' + this.state.baby.officeName
    })
  }
  //性别选择
  selectBabySex =(sex)=>{
    let {baby} = this.state;
    baby.yearDesc.sex = sex;
    this.setState({
      baby:baby
    })
  }

  //选择学校
  selectBabySchool = ()=>{
    this.navto({
      url:'/packageA/pages/schools/index'
    })
  }

   //选择出生日期
   onBornDateChange =(e)=>{
    let {baby} = this.state;
    baby.yearDesc.birthday = e.target.value;
    this.setState({
      baby:baby
    })
  }

  //选择年级
  onGradeChange = (e)=>{
    let {baby,gradeSelector} = this.state;
    baby.yearDesc.grade = gradeSelector[e.target.value];
    this.setState({
      baby:baby
    })
  }

  //提交修改
  confirmModify= async ()=>{
    const {baby:{bid,officeName,yearDesc},yearState} = this.state;
    let res = await Model.updateData(bid,officeName,yearState,yearDesc);
    if(res){
      Taro.showToast({
        title:'修改成功',
        icon:'success',
        duration:2e3
      })
      this.navback()
    }
  }

  
  
}
