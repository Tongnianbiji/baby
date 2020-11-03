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
      gradeSelector:Model.gradeSelector,
      // checkHospital:'',
      // planHospital:'',
      preBornDate:''
    }
  }

  componentWillMount() { }

  componentDidMount() { 
    const {bid,yearState} = this.$router.params;
    const {babyList,updateHospital} = staticData;
    if(bid){
      let preIndex = babyList.findIndex(item=>item.bid == bid);
      this.setState({
        baby:babyList[preIndex],
        yearState:yearState
      })
      if(yearState === 'PREGNANCY'){
        this.setNavBarTitle('孕育中')
        updateHospital(babyList[preIndex].yearDesc.checkHospital)
      }
      else if(yearState === 'PREPARED'){
        this.setNavBarTitle('备孕中')
      }
    }
  }

  componentWillUnmount() { }

  componentDidShow(){
    const {babyNickname,school,hospital} = staticData;
    let {baby,yearState} = this.state;
    if(yearState === 'BRINGUP'){
      baby.officeName = babyNickname;
      baby.yearDesc.school = school;
    }
    else if(yearState === 'PREGNANCY'){
      baby.yearDesc.checkHospital = hospital;
    }
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

  //预产期
  onPreBornDateChange =(e)=>{
    let {baby} = this.state;
    baby.yearDesc.birthday = e.target.value;
    this.setState({
      baby:baby
    })
  }

  //选择医院
  selectBabyHospital = (hType)=>{
    this.setState({
      hType:hType
    })
    this.navto({
      url:'/packageA/pages/hospitals/index'
    })
  }

  //在孕育状态下进行切换状态
  switchStatusByPregnancy =()=>{
    const {baby} = this.state;
    Taro.showActionSheet({
      itemList: ['哺育'],
      success: (res)=> {
        if(res.tapIndex === 0){
          this.setState({
            yearState:'BRINGUP',
            preBornDate:''
          })
          this.setNavBarTitle('宝宝信息')
        }
      }
    })
  }

   //在备孕状态下进行切换状态
   switchStatusByPlanPregnancy =()=>{
    Taro.showActionSheet({
      itemList: ['哺育','孕育'],
      success: (res)=> {
        if(res.tapIndex === 0){
          this.setState({
            yearState:'BRINGUP',
            preBornDate:''
          })
          this.setNavBarTitle('宝宝信息')
        }
        else if(res.tapIndex === 1){
          this.setState({
            yearState:'PREGNANCY',
            preBornDate:''
          })
          this.setNavBarTitle('孕育中')
        }
      }
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
