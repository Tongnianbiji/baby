import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import staticDataStore from '@src/store/common/static-data'
export default class ProfileBabyActionPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: Model.tabs,
      tabsCurrent: 0,
      babyNickname:'',
      babySchool:'请选择',
      babyBorn:'请选择',
      sex:'MALE',
      canSave:false,
      yearState:'BRINGUP',
      checkHospital:'',
      planHospital:'',
      preBornDate:'请选择',
      hType:1,
      grade:'请选择',
      isUpdateInfo:false,
      gradeSelector:Model.gradeSelector
    }
  }

  componentDidMount() { 
    // const {update,tab,bid} = getCurrentInstance().router.params;
    // console.log("888",bid)
    // if(bid){
    //   // //this.setNavBarTitle('更新宝宝');
    //   // if(tab)
    //   this.setState({
    //     tabsCurrent:tab,
    //     isUpdateInfo:update
    //   })
    // }
  }

  componentDidShow(){
    const {babyNickname,school,hospital} = staticDataStore;
    const {hType} = this.state;
    this.setState({
      babyNickname:babyNickname,
      babySchool:school
    })
    if(hType == 1){
      this.setState({
        checkHospital:hospital,
      })
    }else{
      this.setState({
        planHospital:hospital,
      })
    }
    this.isCanSave();
  }

  onClickNavTo(id) {
    this.navto({ url: `/packageA/pages/profile-baby-detail/index?id=${id}` })
  }

  // onClickForCreate() {
  //   Model.childCreate();
  //   // Model.searchSchool();
  // }

  //创建宝宝小名
  createBabyNickname = ()=>{
    this.navto({
      url:'/packageA/pages/profile-setting-baby-nickname/index'
    })
  }

  //性别选择
  selectBabySex =(sex)=>{
    this.setState({
      sex:sex
    })
    this.isCanSave();
  }

  //选择学校
  selectBabySchool = ()=>{
    this.navto({
      url:'/packageA/pages/schools/index'
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

  //选择出生日期
  onBornDateChange =(e)=>{
    this.setState({
      babyBorn:e.target.value
    })
    this.isCanSave();
  }

   //选择年级
   onGradeChange = (e)=>{
    let {gradeSelector} = this.state;
    this.setState({
      grade:gradeSelector[e.target.value]
    })
  }

  //预产期
  onPreBornDateChange =(e)=>{
    this.setState({
      preBornDate:e.target.value
    })
    this.isCanSave();
  }
  isCanSave =()=>{
    const {babyNickname,babyBorn,sex,tabsCurrent,preBornDate} = this.state;
    switch(tabsCurrent){
      case 0:
        if(babyNickname && sex && babyBorn){
          this.setState({
            canSave:true
          })
        }
        break;
      case 1:
        if(preBornDate !== '请选择'){
          this.setState({
            canSave:true
          })
        }
        break;
      case 2:
        this.setState({
          canSave:true
        })
        break;
    }
    
    return this.state.canSave
  }
  //确认提交
  onClickForCreate = async ()=>{
    let {babyNickname,babySchool,babyBorn,sex,yearState,tabsCurrent, checkHospital,planHospital,preBornDate,grade} = this.state;
    console.log('创建宝宝',tabsCurrent)
    if(this.isCanSave()){
      switch(tabsCurrent){
        case 0:
          let res1 = await Model.submit(babyNickname,yearState,{sex,birthday:babyBorn,school:babySchool,grade});
          if(res1){
            this.navback()
          }
          break;
        case 1:
          let res2 = await Model.submit(babyNickname='孕育中',yearState,{birthday:preBornDate,checkHospital,planHospital});
          if(res2){
            this.navback()
          }
          break;
        case 2:
          let res3 = await Model.submit(babyNickname='备孕中',yearState,{birthday:babyBorn});
          if(res3){
            this.navback()
          }
          break;
      }
    } 
  }

    
  /**
   * tab 点击
   * @param {Number} value 索引
   */
  onClickForTabs(value) {
    switch(value){
      case 0:
      this.setState({
        yearState:'BRINGUP'
      });
      break;
      case 1:
        this.setState({
          yearState:'PREGNANCY'
        });
        break;
      case 2:
        this.setState({
          yearState:'PREPARED'
        });
        break;
    }
    this.setState({
      tabsCurrent: value,
    })
  }
}
