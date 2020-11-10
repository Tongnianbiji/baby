import BaseComponent from '../../common/baseComponent'
import Model from './model'

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
      chatList:Model.chatList
    }
  }

  componentDidMount(){}

  componentDidShow(){
    this.getMessageCount()
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

  //删除某一个聊天
  deleteChat = (chat)=>{
    let {chatList} = this.state;
    let preIndex = chatList.findIndex(item=>item.id === chat.id)
    chatList.splice(preIndex,1);
    this.setState({
      chatList
    })
  }

  tabChange = index => {
    this.setState({ currentTab: index })
  }

  toFans = () => {
    this.navto({ url: '/packageA/pages/fans/index' })
  }

  toPostReply = () => {
    this.navto({ url: '/packageB/pages/reply-my-post/index' })
  }

  toQaList = () => {
    this.navto({ url: '/packageB/pages/qa-me/index' })
  }

  toCollect = () => {
    const {mark,star} = this.state;
    this.navto({ url: `/packageB/pages/passive-collects/index?mark=${mark}&star=${star}` })
  }

  toSysMessage = () => {
    this.navto({ url: '/packageA/pages/message-system/index' })
  }

  toIM = (item) => {
    this.navto({ url: `/packageA/pages/message-im/index?name=${item.name}&id=${item.id}` })
  }
}