import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      messageList:[
        {id:1},
        {id:2}
      ]
    }
  }

  componentDidMount() {
    Model.getData()
  }

  //删除某一个信息
  deleteMessage = async (message)=>{
    let {messageList} = this.state;
   let preIndex = messageList.findIndex(item=>item.id === message.id);
   messageList.splice(preIndex,1);
   this.setState({
    messageList
   })

  }

}