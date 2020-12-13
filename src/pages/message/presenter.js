import BaseComponent from '../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      tabList: Model.tabsList,
      currentTab: 0,
      answer: 0,
      funs: 0,
      mark: 0,
      reply: 0,
      star: 0,
      total:0,
      chatList:[],
      postLock:false,
      showLoading:true,
      isToBottom:false,
      pageNum:1,
    }
   
  }

  componentDidMount(){}

  componentDidShow() {
    this.isLogin = staticData.isLogin;
    this.initChatList();
    this.getMessageCount();
    this.getChatList();
  }

  onReachBottom(){
    const {postLock, isToBottom,currentTab} = this.state;
    if(currentTab == 1){
      if(!postLock && !isToBottom){
        this.setState((pre)=>({
          pageNum:pre.pageNum+1
        }),()=>{
          this.getChatList()
        })
      }
    }
  }

  getMessage() {
    Model.getMessage()
  }

  getMessageCount = async ()=>{
    let res = await Model.getMessageCount();
    if(res){
      const {answer,funs,mark,reply,star} = res;
      this.setState({
        answer,
        funs,
        mark,
        reply,
        star,
        total:answer+funs+mark+reply+star
      })
    }
  }

  initChatList = ()=>{
    this.setState({
      chatList:[],
      postLock:false,
      showLoading:true,
      isToBottom:false,
      pageNum:1,
    })
  }

  //获取聊天记录
  getChatList=async()=>{
    const {pageNum,chatList} = this.state;
    this.setState({
      postLock:true
    })
    let res = await Model.getChatList(pageNum);
    this.setState({
      postLock:false
    })
    if(res && res.items){
      const {total,items} = res;
      let newChatList = items.reverse()
      if (!chatList.length) {
        this.setState({
          chatList : newChatList || []
        })
        
      } else {
        this.setState((pre)=>({
          chatList:pre.chatList.concat(newChatList || [])
        }))
      }
      if (total <= this.state.chatList.length) {
        this.setState({
          showLoading:false,
          isToBottom:true
        })
      }
    }
  }

  //删除某一个聊天
  deleteChat = async (chat)=>{
    const {fromUid,toUid} = chat.messageDo
    let res = await Model.deleteChat(fromUid,toUid);
    if(res){
      this.getChatList();
    }
  }

  tabChange = index => {
    if (!this.isLogin) {
      this.navto({
        url: '/pages/login/index'
      })
      return;
    }
    this.setState({ currentTab: index })
  }

  toFans = () => {
    if (!this.isLogin) {
      this.navto({
        url: '/pages/login/index'
      })
      return;
    }
    this.navto({ url: '/packageA/pages/fans/index' })
  }

  toPostReply = () => {
    if (!this.isLogin) {
      this.navto({
        url: '/pages/login/index'
      })
      return;
    }
    this.navto({ url: '/packageB/pages/reply-my-post/index' })
  }

  toQaList = () => {
    if (!this.isLogin) {
      this.navto({
        url: '/pages/login/index'
      })
      return;
    }
    this.navto({ url: '/packageB/pages/qa-me/index' })
  }

  toCollect = () => {
    if (!this.isLogin) {
      this.navto({
        url: '/pages/login/index'
      })
      return;
    }
    const {mark,star} = this.state;
    this.navto({ url: `/packageB/pages/passive-collects/index?mark=${mark}&star=${star}` })
  }

  toSysMessage = () => {
    this.navto({ url: '/packageA/pages/message-system/index' })
  }

  toIM = (item) => {
    if (!this.isLogin) {
      this.navto({
        url: '/pages/login/index'
      })
      return;
    }
    this.navto({ url: `/packageA/pages/message-im/index?name=${item.name}&id=${item.toUid}` })
  }
}