import Taro from '@tarojs/taro'
import BaseComponent from '../../common/baseComponent'
import Model from './model'

export default class ProfilePresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClickForNavToPersonal(){
    this.navto({ url: '/packageA/pages/personal-home/index' })
  }
}
