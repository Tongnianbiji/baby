import BaseComponent from '../../../common/baseComponent';
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import staticData from '@src/store/common/static-data'
import Model from './model'
import GoEasyIM from 'goeasy-im';
const { goEasy: im } = staticData;
let temScrollTop = 0;
export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollStyle: {},
      messageList: [],
      myPublishMessage: {},
      userInfo: {},
      toUserInfo: {},
      activeFocus: false,
      inputValue: '',
      inputBoxBottom: 0,
      holdKeyboard: true,
      files: {},
      fromUid: '',
      toUid: '',
      mid: '',
      isFocus: false,
      scrollTop: 0
    }
  }

  async componentDidMount() {
    const systemInfo = Taro.getSystemInfoSync();
    const { name, id } = this.$router.params;
    let windowHeight = systemInfo.windowHeight;
    let scrollStyle = { height: `${windowHeight - 48}px` }
    this.setState({
      scrollStyle: scrollStyle,
      toUid: id
    })
    await this.getProfileData();
    await this.getToProfileData();
    await this.getMessageList();
    this.setState({
      scrollTop: 0
    })
    let { messageList } = this.state;
    this.setNavigationBarTitle();

    const { userId } = this.getUserInfo();
    //连接GoEasy
    im.connect({
      id: userId,
      data: '{"avatar":"/www/xxx.png","nickname":"Neo"}'
    }).then(function () {
      console.log("Connection successful.");
    }).catch(function (error) {
      console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
    });

    //监听和接收单聊消息
    im.on(GoEasyIM.EVENT.PRIVATE_MESSAGE_RECEIVED, (message) => {
      console.log('---message----', message)
      if (message.payload.text) {
        const { text, files} = JSON.parse(message.payload.text)
        messageList.unshift(
          {
            uid: message.senderId,
            content: text,
            headImg: this.state.toUserInfo.headImg,
            nickName: this.state.toUserInfo.nickName,
            files: files || {},
            isBlock: false
          }
        )
        this.setState({
          messageList: messageList
        }, () => {
          setTimeout(() => {
            this.scrollToChatBottom();
          }, 200);
        })
      }
    })
    this.markMessageAsRead();
  }
  componentDidHide() {
    this.markMessageAsRead();
  }

  markMessageAsRead() {
    // 清空未读数量
    im.markPrivateMessageAsRead(this.$router.params.id).then(function (result) {
    }).catch(function (error) {
      console.log("Failed to mark as read, code:" + error.code + " content:" + error.content);
    });
  }

  //自动滑动到最底下
  scrollToChatBottom() { // 滑动到最底部
    const { scrollTop } = this.state;
    console.log('****', scrollTop)
    this.setState({
      scrollTop: scrollTop == 0 ? -1 : 0
    })
  }

  /**
   * 根据name设置nav bar title
   */
  setNavigationBarTitle() {
    const { toUserInfo } = this.state;
    wx.setNavigationBarTitle({
      title: toUserInfo.nickName
    })
  }
  clickChatBox() {
    this.setState({
      isFocus: false,
    })
  }
  //获取历史消息
  getMessageList = async () => {
    const { fromUid, toUid, userInfo, toUserInfo, mid, messageList } = this.state;
    let res = await Model.getData(fromUid, toUid, mid);
    if (res) {
      let newMessageList = res.items;
      newMessageList.forEach(item => {
        if (item.type !== 0) {
          item.files = {
            type: item.type,
            url: item.content
          }
        } else {
          item.files = {
            type: item.type
          }
        }
        item.isBlock = Boolean(item.isBlock);
        item.uid = item.fromUid;
        if (item.fromUid === fromUid) {
          item.headImg = userInfo.headImg;
          item.nickName = userInfo.nickName;
        } else {
          item.headImg = toUserInfo.headImg;
          item.nickName = toUserInfo.nickName;
        }
      })
      if (!messageList.length) {
        this.setState({
          messageList: newMessageList
        })
      } else {
        this.setState({
          messageList: [...messageList, ...newMessageList]
        })
      }
      newMessageList.length &&
        this.setState({
          mid: newMessageList[newMessageList.length - 1].mid
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
        fromUid: res.userId,
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

  onScrollToUpper = async () => {
    Taro.showLoading();
    this.getMessageList();
    Taro.hideLoading();
  }

  onScroll = (e) => {
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

  publishMessage = async (type = 0) => {
    const { publishContent, files, toUid, fromUid, userInfo: { userId, nickName, headImg }, inputValue } = this.state;
    let { messageList } = this.state;
    const { id } = getCurrentInstance().router.params;
    let isBlock = await this.isBlockFriend();
    if (inputValue && (publishContent || files.url) || files.url) {
      if (!isBlock) {
        console.log('---publishContent---', publishContent, toUid)
        //创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
        let textMessage = im.createTextMessage({
          text: JSON.stringify({ //消息内容
            text: publishContent,
            files: {
              type: files.type,
              url: files.url,
            }
          }),
          to: {
            type: GoEasyIM.SCENE.PRIVATE,   //私聊还是群聊，群聊为GoEasyIM.SCENE.GROUP
            id: toUid,
          }
        });
        //发送消息YA
        im.sendMessage(textMessage).then((message) => {
          messageList.unshift(
            {
              uid: userId,
              content: files.type>0?'':publishContent,
              headImg: headImg,
              nickName: nickName,
              isBlock: false,
              files: files.type>0?files: {},
            }
          )
          this.setState({
            messageList: messageList
          }, () => {
            setTimeout(() => {
              this.scrollToChatBottom();
            }, 200)
          });
          console.log("Private message sent successfully.", message);
        }).catch(function (error) {
          console.log("Failed to send private message，code:" + error.code + ",error" + error.content);
        });

      } else {
        messageList.unshift(
          {
            uid: userId,
            content: type > 0 ? '' : publishContent,
            headImg: headImg,
            nickName: nickName,
            isBlock: true,
            files: type > 0 ? files : {},
          }
        )
        this.setState({
          messageList: messageList
        }, () => {
          setTimeout(() => {
            this.scrollToChatBottom();
          }, 200);
        })
      }
      Model.saveData(fromUid, toUid, type, type > 0 ? files.url : publishContent, Number(isBlock));

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
      isFocus: true,
      //holdKeyboard:true
    }, () => {
      // this.scrollToChatBottom()
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

  publishText = () => {
    this.setState({
      files: {},
    }, () => {
      this.publishMessage(0)
    })
  }

  getFiles = (files) => {
    console.log('files', files)
    this.setState({
      files: files,
      publishContent: ''
    }, () => {
      this.publishMessage(files.type)
    })
  }

  preViewImage = (url, e) => {
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

  blockInfo = () => {
    Taro.showToast({
      title: '已被对方加入黑名',
      icon: 'none'
    })
  }

}