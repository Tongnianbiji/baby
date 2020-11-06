import BaseComponent from '../../../common/baseComponent';
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import staticData from '@src/store/common/static-data'
import Model from './model'

const {goEasy} = staticData;
export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollStyle:{},
      messageList:[],
      myPublishMessage:{},
      userInfo:{},
      activeFocus:false,
      inputValue:'',
      inputBoxBottom:0,
      holdKeyboard:false
    }
  }

  componentDidMount() {
    const systemInfo = Taro.getSystemInfoSync();
    const {name,id} = this.$router.params;
    let {messageList} = this.state;
    let windowHeight = systemInfo.windowHeight;
    let scrollStyle = {height:`${windowHeight - 48}px`}
    this.setState({
      scrollStyle:scrollStyle
    })
    this.getProfileData();
    Model.getData(id)
    this.setNavigationBarTitle();
    goEasy.subscribe({
      channel: "tn1",
      onMessage: (message)=> {
        const {uid,content,headImg,nickName}=JSON.parse(message.content)
        if(content){
          messageList.push(
            {
              uid:uid,
              content:content,
              headImg:headImg,
              nickName:nickName
            }
          )
          this.setState({
            messageList:messageList
          })
        }
      }
    })
  }

  /**
   * 根据name设置nav bar title
   */
  setNavigationBarTitle() {
    const { name, id } = getCurrentInstance().router.params;
    wx.setNavigationBarTitle({
      title: name
    })
  }

  //获取个人信息
  getProfileData = async()=>{
    const {userId} = this.getUserInfo();
    let res = await Model.getProfileData(userId);
    if(res){
      this.setState({
        userInfo:res
      })
    }
  }

  viewProfileInfo = (uid,e)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url:`/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

  onScrollToLower= ()=>{
    console.log('往下滑')
  }

  inputMessage = (e)=>{
    this.setState({
      publishContent:e.target.value,
      inputValue:e.target.value
    })
  }

  publishMessage = ()=>{
    const {publishContent,userInfo:{userId,nickName,headImg}} = this.state;
    const { name, id } = getCurrentInstance().router.params;
    if(publishContent){
      goEasy.publish({
          channel: "tn1",
          message: JSON.stringify({
            uid:userId,
            content:publishContent,
            nickName:nickName,
            headImg:headImg
          }),
      })
      this.setState({
        inputValue:'',
        //holdKeyboard:false
      })
      Model.saveData(id,publishContent)
    }else{
      this.showToast('输入不能为空')
    }
  }

  onFocus = ()=>{
    this.setState({
      activeFocus:true,
      inputBoxBottom:300,
      //holdKeyboard:true
    })
  }

  onBlur = ()=>{
    this.setState({
      activeFocus:false,
      inputBoxBottom:0
    })
  }
}