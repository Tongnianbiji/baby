import Taro from '@tarojs/taro'
import React from 'react'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class CharacterAPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      topTabs: Model.topTabs,
      subTabs: Model.subTabs,
      // babyList: Model.babyList,

      topTabsCurrent: 0,
      subTabsCurrent: 0,
      showCalc: true,//计算
      showCalcPartOne: false,//计算 part 1
      showCalcPartTwo: false,//计算 part 2
      showCharacterSpecial: false,//show sub tab1 character part

      //育儿宝宝信息
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
      //孕育/备孕信息
      pregnancyBornDate:'请选择日期',
      lastMenstruation:'请选择日期',
      preHospital:''

    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * top tab 点击
   * @param {Number} value 索引
   */
  onClickForTopTab(value) {
    const { topTabsCurrent } = this.state;
    this.setState({
      topTabsCurrent: value,
      subTabsCurrent: 0, //sub tab default 0
      showCharacterSpecial: topTabsCurrent == 2,
    })
  }

  /**
   * sub tab 点击
   * @param {Number} value 索引
   */
  onClickForSubTabs(value) {
    this.setState({
      subTabsCurrent: value
    })
    this.isCanSave()

  }

  /**
   * 计算 点击
   */
  onClickForCalc() {
    this.setState({
      showCalcPartOne: true,
      showCalcPartTwo: true
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
    },()=>{
      console.log(this.state.babyList)
    })
    this.isCanSave()
  }

  //输入宝宝姓名
  onInputBabyName = (baby,e)=>{
    let {babyList} = this.state;
    let preIndex = babyList.findIndex(item=>item.id === baby.id);
    babyList[preIndex].babyName = e.detail.value;
    this.setState({
      babyList:babyList
    })
    this.isCanSave()
  }

  //输入宝宝学校
  onInputBabySchool = (baby,e)=>{
    let {babyList} = this.state;
    let preIndex = babyList.findIndex(item=>item.id === baby.id);
    babyList[preIndex].babySchool = e.detail.value;
    this.setState({
      babyList:babyList
    })
    this.isCanSave()
  }

  //输入孕育的医院
  onInputPreHospital= (e)=>{
    this.setState({
      preHospital:e.detail.value
    })
    this.isCanSave()
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
    this.isCanSave()
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
    const {subTabsCurrent,babyList,pregnancyBornDate,preHospital} =this.state;
    switch(subTabsCurrent){
      case 0:
        if(!babyList.length){
          this.showToast('请添加宝宝')
        }else{
          this.setState({
            canSave:true
          })
          babyList.forEach(item=>{
            if(!item.bornDate || !item.babyName || !item.babySchool){
              this.setState({
                canSave:false
              })
            }
          })
        }
        return this.state.canSave
        break;
      case 1:
        if(pregnancyBornDate !== '请选择日期' && preHospital){
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
        case 2:
        if(pregnancyBornDate !== '请选择日期' && preHospital){
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
  }

  //最后一次月经时间
  onLastMenstruationDateChange = (e)=>{
    this.setState({
      lastMenstruation:e.detail.value
    })
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
  }

  //时间格式化
  formateTime = (time)=>{
    let year = time.getFullYear();
    let mon = time.getMonth()+1;
    let day = time.getDate();
    return `${year}-${mon}-${day}`
  }
  //下一步
  nextStep= async ()=>{
    let officeName = '宝宝',yearState=null,yearDesc=null;
    const {subTabsCurrent,babyList,pregnancyBornDate,preHospital} =this.state;
    if(this.isCanSave()){
      switch(subTabsCurrent){
        case 0:
          yearState='BRINGUP';
          // yearDesc={
          //   sex:'MALE',
          //   birthday:'2020-10-15',
          //   school:'浦东一小'
          // }
          let status = true;
          babyList.forEach(async (item)=>{
            yearDesc={
              sex:item.babySex === 1 ? 'MALE' : 'FEMALE',
              birthday:item.bornDate,
              school:item.babySchool
            }
            officeName = item.babyName;
            let res1 = await Model.submit(officeName,yearState,yearDesc);
            if(!res1){
              status = false
            }
          })
          if(status){
            this.navto({
              url: '/packageA/pages/profile-setting-info/index'
            })
          }else{
            this.showToast('系统异常')
          }
          break;
        case 1:
          yearState='PREGNANCY';
          yearDesc={
            birthday:pregnancyBornDate,
            checkHospital:'上海红房子产科医院',
            planHospita:preHospital
          }
          let res2 = await Model.submit(officeName,yearState,yearDesc);
          if(res2){
            this.navto({
              url: '/packageA/pages/profile-setting-info/index'
            })
          }else{
            this.showToast('系统异常')
          }
          break;
        case 2:
          yearState='PREPARED';
          yearDesc={
            birthday:pregnancyBornDate
          }
          let res3 = await Model.submit(officeName,yearState,yearDesc);
          if(res3){
            this.navto({
              url: '/packageA/pages/profile-setting-info/index'
            })
          }else{
            this.showToast('系统异常')
          }
          break;
      }
    }
  }
}
