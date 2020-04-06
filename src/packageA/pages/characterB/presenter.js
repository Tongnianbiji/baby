import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class CharacterBPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      chatacterList: Model.chatacterList,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

}
