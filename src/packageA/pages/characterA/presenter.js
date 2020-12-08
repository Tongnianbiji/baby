import Taro from '@tarojs/taro'
import React from 'react'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'

export default class CharacterAPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      topTabs: Model.topTabs,
      subTabs: Model.subTabs,
      babyRadioList: Model.babyList,

      topTabsCurrent: 0,
      subTabsCurrent: 0,
      showCalc: true,//计算
      showCalcPartOne: false,//计算 part 1
      showCalcPartTwo: false,//计算 part 2
      showCharacterSpecial: false,//show sub tab1 character part

      //育儿宝宝信息
      role:staticData.role,
      canSave:false,
      babyList:[
        {
          id:1,
          babySex:1,
          bornDate:'请选择日期',
          babyName:'',
          babySchool:''
        }
      ],
      currentBabyId:1,
      //孕育/备孕信息
      pregnancyBornDate:'请选择日期',
      lastMenstruation:'请选择日期',
      preHospital:'',
      babyChecked:'',
      menstruationPeriod:28,
      menstruationLastingDays:7,

    }
  }

  componentWillMount() { }

  componentDidMount() { 
    const {role} = staticData;
    //const {isOther} = this.$router.params;
    switch(role){
      case '妈妈':
        this.setState({
          topTabsCurrent:0
        });
      break;
      case '爸爸':
        this.setState({
          topTabsCurrent:1
        });
      break;
      default:
        this.setState({
          topTabsCurrent:2
        });
      break;
    }
  }

  componentWillUnmount() { }

  componentDidShow() { 
    const {role,school,hospital} = staticData;
    const {currentBabyId,babyList} = this.state;
    let preIndex = babyList.findIndex(item=>item.id === currentBabyId);
    babyList[preIndex].babySchool = school;
    this.setState({
      role:role,
      babyList:babyList,
      preHospital:hospital
    })
    this.isCanSave()
  }

  componentDidHide() { }

  /**
   * top tab 点击
   * @param {Number} value 索引
   */
  onClickForTopTab(value) {
    const { topTabsCurrent,role } = this.state;
    const {updateRole} = staticData;
    if(value ===0 ){
      updateRole('妈妈')
    }
    else if(value ===1){
      updateRole('爸爸')
    }
    else if(value ===2 && (role === '妈妈' || role === '爸爸')){
      this.setState({
        role:''
      })
    }
    this.setState({
      topTabsCurrent: value,
      subTabsCurrent: 0, //sub tab default 0
      showCharacterSpecial: topTabsCurrent == 2,
    })
    this.isCanSave();
  }

  /**
   * sub tab 点击
   * @param {Number} value 索引
   */
  onClickForSubTabs(value) {
    this.setState({
      subTabsCurrent: value
    })
    this.isCanSave();
  }

  /**
   * 计算 点击
   */
  onClickForCalc() {
    this.setState({
      showCalcPartOne: true,
      showCalcPartTwo: true,
      showCalc:false
    })
  }

  //选择性别
  selectSex = (baby,sex)=>{
    let {babyList} = this.state;
    let preIndex = babyList.findIndex(item=>item.id === baby.id);
    babyList[preIndex].babySex = sex;
    this.setState({
      babyList:babyList
    })
    this.isCanSave()
  }

  //选择日期
  onDateChange = (baby,date)=>{
    let {babyList} = this.state;
    let preIndex = babyList.findIndex(item=>item.id === baby.id);
    babyList[preIndex].bornDate = date.detail.value;
    this.setState({
      babyList:babyList
    })
    this.isCanSave();
  }

  //输入宝宝姓名
  onInputBabyName = (baby,e)=>{
    let {babyList} = this.state;
    let preIndex = babyList.findIndex(item=>item.id === baby.id);
    babyList[preIndex].babyName = e.detail.value;
    this.setState({
      babyList:babyList
    })
    this.isCanSave();
  }

  //输入宝宝学校
  onInputBabySchool = (baby,e)=>{
    let {babyList} = this.state;
    let preIndex = babyList.findIndex(item=>item.id === baby.id);
    babyList[preIndex].babySchool = e.detail.value;
    this.setState({
      babyList:babyList
    })
    // this.isCanSave()
  }

  //输入孕育的医院
  onInputPreHospital= (e)=>{
    this.setState({
      preHospital:e.detail.value
    })
    this.isCanSave();
  }

  //输入月经持续天数
  onInputMenstruationLastingDays =(e)=>{
    this.setState({
      menstruationLastingDays:e.detail.value
    })
  }
  //添加宝宝
  addBaby = ()=>{
    let {babyList} = this.state;
    this.setState(pre=>{
      pre.babyList.push({
        id:babyList.length + 1,
        babySex:1,
        bornDate:'请选择日期',
        babyName:'',
        babySchool:''
    });
    this.setState({
      babyList:pre.babyList
    })
    this.isCanSave();
  })
  }

  //删除宝宝
  handleDeleteBaby = (id)=>{
    console.log(id)
    let {babyList} = this.state;
    let preIndex = babyList.findIndex(item=>item.id === id);
    babyList.splice(preIndex,1);
    this.setState({
      babyList:babyList
    })
  }

  //判断是否可以进入下一步
  isCanSave = ()=>{
    const {subTabsCurrent,babyList,pregnancyBornDate,preHospital,topTabsCurrent,role,lastMenstruation} =this.state;
    switch(subTabsCurrent){
      case 0:
        if(!babyList.length){
          this.showToast('请添加宝宝')
        }else{
          this.setState({
            canSave:true
          })
          babyList.forEach(item=>{
            if(item.bornDate === '请选择日期' || !item.babyName){
              this.setState({
                canSave:false
              })
            }
          })
        }
        if(topTabsCurrent === 2){
          if(!role){
            this.setState({
              canSave:false
            })
          }
        }
        return this.state.canSave
        break;
      case 1:
        if(pregnancyBornDate !== '请选择日期'){
          this.setState({
            canSave:true
          })
        }else{
          this.setState({
            canSave:false
          })
        }
        if(topTabsCurrent === 2){
          if(!role){
            this.setState({
              canSave:false
            })
          }
        }
        return this.state.canSave;
        break;
        case 2:
        if(lastMenstruation !== '请选择日期'){
          this.setState({
            canSave:true
          })
        }else{
          this.setState({
            canSave:false
          })
        }
        return this.state.canSave;
        break;
    }
  }

  //孕育/备孕
  onPreBornDateChange = (e)=>{
    this.setState({
      pregnancyBornDate:e.detail.value
    })
    this.isCanSave();
  }

  //最后一次月经时间
  onLastMenstruationDateChange = (e)=>{
    this.setState({
      lastMenstruation:e.detail.value
    })
    this.isCanSave()
  }

  //计算预产期
  calcPreBornDate = ()=>{
    const {lastMenstruation} = this.state;
    if(lastMenstruation === '请选择日期'){
      this.showToast('请选择最后一次月经时间');
      return
    }else{
      this.setState({
        pregnancyBornDate:this.formateTime(new Date((new Date(lastMenstruation)).getTime() + 60*60*24*1000*280))
      })
    }
    this.isCanSave();
  }

  //时间格式化
  formateTime = (time)=>{
    let year = time.getFullYear();
    let mon = time.getMonth()+1;
    let day = time.getDate();
    return `${year}-${mon}-${day}`
  }
  //下一步
  nextStep= async (e)=>{
    let officeName = '宝宝',yearState=null,yearDesc=null;
    let isHasWxInfo = false;
    console.log('微信信息',e)
    const {subTabsCurrent,babyList,pregnancyBornDate,preHospital} =this.state;
    const {isRegiste,updateWxUserInfo,role} = staticData;
    if(e&&e.detail&&e.detail.userInfo){
      updateWxUserInfo(e.detail.userInfo);
      isHasWxInfo = true
    }
    if(this.isCanSave()){
      switch(subTabsCurrent){
        case 0:
          yearState='BRINGUP';
          let status = true;
          babyList.forEach(async (item)=>{
            yearDesc={
              sex:item.babySex === 1 ? 'MALE' : 'FEMALE',
              birthday:item.bornDate,
              school:item.babySchool
            }
            officeName = item.babyName;
            let res1 = await Model.submit(officeName,yearState,yearDesc,role);
            if(!res1){
              status = false
            }
          })
          if(status){
            this.navto({
              url: `/packageA/pages/profile-setting-info/index?newUser=true&wxInfo=${isHasWxInfo}`
            })
          }
          break;
        case 1:
          yearState='PREGNANCY';
          yearDesc={
            birthday:pregnancyBornDate,
            checkHospital:'',
            planHospita:preHospital
          }
          let res2 = await Model.submit('孕育中',yearState,yearDesc,role);
          if(res2){
            this.navto({
              url: `/packageA/pages/profile-setting-info/index?newUser=true&wxInfo=${isHasWxInfo}`
            })
          }
          break;
        case 2:
          yearState='PREPARED';
          yearDesc={
            birthday:pregnancyBornDate
          }
          let res3 = await Model.submit('备孕中',yearState,yearDesc,role);
          if(res3){
            this.navto({
              url: `/packageA/pages/profile-setting-info/index?newUser=true&wxInfo=${isHasWxInfo}`
            })
          }
          break;
      }
    }
  }
  //选择孕育的孩子
  selectPregnancyBaby= (value)=>{
    this.setState({
      babyChecked:value
    })
  }

  //选择身份
  selectRole=()=>{
    this.navto({
      url:'/packageA/pages/characterB/index'
    })
  }

  //选择学校
  selectSchool = (id)=>{
    this.setState({
      currentBabyId:id
    })
    this.navto({
      url:'/packageA/pages/schools/index'
    })
  }

  //选择医院
  selectHospital = ()=>{
    this.navto({
      url:'/packageA/pages/hospitals/index'
    })
  }

  reduceMenstruationPeriod = ()=>{
    const {menstruationPeriod} = this.state;
    if(menstruationPeriod>1){
      this.setState((pre)=>({
        menstruationPeriod:pre.menstruationPeriod -1
      }))
    }
  }

  addMenstruationPeriod = ()=>{
    this.setState((pre)=>({
      menstruationPeriod:pre.menstruationPeriod + 1
    }))
  }

  reducemenstruationLastingDays = ()=>{
    const {menstruationLastingDays} = this.state;
    if(menstruationLastingDays>1){
      this.setState((pre)=>({
        menstruationLastingDays:pre.menstruationLastingDays -1
      }))
    }
  }

  addMenstruationLastingDays = ()=>{
    this.setState((pre)=>({
      menstruationLastingDays:pre.menstruationLastingDays + 1
    }))
  }
}
