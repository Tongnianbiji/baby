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
      total:0
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
        // answer,
        // funs,
        // mark,
        // reply,
        // star
        total:answer+funs+mark+reply+star
      })
    }
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
    this.navto({ url: '/packageB/pages/passive-collects/index' })
  }

  toSysMessage = () => {
    this.navto({ url: '/packageA/pages/message-system/index' })
  }

  toIM = (item) => {
    this.navto({ url: `/packageA/pages/message-im/index?name=${item.name}&id=${item.id}` })
  }
}