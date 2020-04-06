import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class InterestPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      typeList: Model.typeList,
      subTypeList: Model.subTypeList,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClickForSkip() {
    console.log('skip');

  }
}
