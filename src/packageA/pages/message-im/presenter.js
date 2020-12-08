import BaseComponent from '../../../common/baseComponent';
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import staticData from '@src/store/common/static-data'
import Model from './model'

const { goEasy } = staticData;
let temScrollTop = 0;
export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollStyle: {},
      messageList: [],
      myPublishMessage: {},
      userInfo: {},
      toUserInfo:{},
      activeFocus: false,
      inputValue: '',
      inputBoxBottom: 0,
      holdKeyboard: true,
      files:{},
      fromUid:'',
      toUid:'',
      mid:'',
      scrollTop:0
    }
  }

  async componentDidMount() {
    const systemInfo = Taro.getSystemInfoSync();
    const { name, id } = this.$router.params;
    let windowHeight = systemInfo.windowHeight;
    let scrollStyle = { height: `${windowHeight - 48}px` }
    this.setState({
      scrollStyle: scrollStyle,
      toUid:id
    })
    await this.getProfileData();
    await this.getToProfileData();
    await this.getMessageList();
    this.setState({
      scrollTop:19000
    })
    let { messageList } = this.state;
    this.setNavigationBarTitle();

    console.log('channel',goEasy)
    // goEasy.latestConversations(res=>{
    //   console.log('最近一次通话',res)
    // })
    goEasy.subscribe({
      channel: "tn1",
      onMessage: (message) => {
        const { uid, content, headImg, nickName,files } = JSON.parse(message.content)
        if (content || files.url) {
          console.log('发送')
          messageList.push(
            {
              uid: uid,
              content: content,
              headImg: headImg,
              nickName: nickName,
              files:files,
              isBlock:false
            }
          )
          this.setState({
            messageList: messageList
          })
          this.scrollToChatBottom();
        }
      }
    })
  }
  //自动滑动到最底下
  scrollToChatBottom() { // 滑动到最底部
    const {scrollTop} = this.state;
    console.log('****',scrollTop)
    this.setState({
      scrollTop : scrollTop + 20000
    })
	}

  /**
   * 根据name设置nav bar title
   */
  setNavigationBarTitle() {
    const {toUserInfo} = this.state;
    wx.setNavigationBarTitle({
      title: toUserInfo.nickName
    })
  }

  //获取历史消息
  getMessageList = async ()=>{
    const {fromUid,toUid,userInfo,toUserInfo,mid,messageList} = this.state;
    let res = await Model.getData(fromUid,toUid,mid);
    if(res){
      let newMessageList = res.items.reverse();
      newMessageList.forEach(item=>{
        if(item.type !== 0){
          item.files = {
            type:item.type,
            url:item.content
          }
        }else{
          item.files = {
            type:item.type
          }
        }
        item.isBlock = Boolean(item.isBlock);
        item.uid = item.fromUid;
        if(item.fromUid === fromUid){
          item.headImg = userInfo.headImg;
          item.nickName = userInfo.nickName;
        }else{
          item.headImg = toUserInfo.headImg;
          item.nickName = toUserInfo.nickName;
        }
      })
      if(!messageList.length){
        this.setState({
          messageList:newMessageList
        })
      }else{
        this.setState({
          messageList:newMessageList.concat(messageList)
        })
      }
      newMessageList.length && 
      this.setState({
        mid:newMessageList[0].mid
      })
    }
  }

  //获取个人信息
  getProfileData = async () => {
    const { userId } = this.getUserInfo();
    let res = await Model.getProfileData(userId);
    if (res) {
      this.setState({
        userInfo: res,
        fromUid:res.userId,
      })
    }
  }

  //获取聊天朋友信息
  getToProfileData = async () => {
    const { id } = this.$router.params;
    let res = await Model.getProfileData(id);
    if (res) {
      this.setState({
        toUserInfo: res,
      })
    }
  }

  viewProfileInfo = (uid, e) => {
    e.stopPropagation();
    Taro.navigateTo({
      url: `/packageA/pages/profile-home/index?userId=${uid}`
    })
  }

  onScrollToLower = () => {
    console.log('往下滑')
  }

  onScrollToUpper =async() => {
    Taro.showLoading();
    this.getMessageList();
    Taro.hideLoading();
  }

  onScroll = (e)=>{
    //console.log(e.target)
    // this.setState({
    //   scrollTop:e.target.scrollTop
    // })
    //temScrollTop = e.target.scrollTop
  }

  inputMessage = (e) => {
    this.setState({
      publishContent: e.target.value,
      inputValue: e.target.value
    })
  }

  publishMessage = async (type=0) => {
    const { publishContent,files,toUid,fromUid, userInfo: { userId, nickName, headImg },inputValue } = this.state;
    let {messageList} = this.state;
    const {id } = getCurrentInstance().router.params;
    let isBlock = await this.isBlockFriend();
    if (inputValue && (publishContent || files.url)) {
      if (!isBlock) {
        goEasy.publish({
          channel: "tn1",
          message: JSON.stringify({
            uid: userId,
            content: publishContent,
            nickName: nickName,
            headImg: headImg,
            files:files,
            isBlock:false
          }),
        })
      }else{
        messageList.push(
          {
            uid: userId,
            content: publishContent,
            headImg: headImg,
            nickName: nickName,
            isBlock:true,
            files:files,
          }
        )
        this.setState({
          messageList: messageList
        })
        this.scrollToChatBottom();
      }
      Model.saveData(fromUid,toUid,type,publishContent,Number(isBlock));

      this.setState({
        inputValue: '',
        //holdKeyboard:false,
      })
      //this.scrollToChatBottom();
    } else {
      this.showToast('输入不能为空')
    }
  }

  onFocus = () => {
    this.setState({
      activeFocus: true,
      inputBoxBottom: 15,
      //holdKeyboard:true
    },()=>{
      this.scrollToChatBottom()
    })
  }

  onBlur = () => {
    this.setState({
      activeFocus: false,
      inputBoxBottom: 0
    })
  }

  isBlockFriend = async () => {
    const { id } = this.$router.params;
    let res = await Model.isBlockFriend(id);
    return res;
  }

  publishText = ()=>{
    this.setState({
      files:{},
    },()=>{
      this.publishMessage(0)
    })
  }

  getFiles = (files)=>{
    console.log('files',files)
    this.setState({
      files:files,
      publishContent:''
    },()=>{
      this.publishMessage(files.type)
    })
  }

  preViewImage = (url,e)=>{
    //const {files} = this.props.model;
    e.stopPropagation();
    // let newFiles = files.filter(item=>item.type == 1);
    //let urls = newFiles.map(item=>item.url);
    let urls = [url];
    Taro.previewImage({
      current: url,
      urls: urls
    })
  }

  blockInfo = ()=>{
    Taro.showToast({
      title:'已被对方加入黑名',
      icon:'none'
    })
  }
    
}