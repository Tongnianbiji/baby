import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class CharacterAPresenter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      topTabs: Model.topTabs,
      subTabs: Model.subTabs,
      babyList: Model.babyList,

      topTabsCurrent: 0,
      subTabsCurrent: 0,
      showCalc: true,//计算
      showCalcPartOne: false,//计算 part 1
      showCalcPartTwo: false,//计算 part 2
      showCharacterSpecial: false,//show sub tab1 character part
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * top tab 点击
   * @param {Number} value 索引
   */
  onClickForTopTab(value) {
    const { topTabsCurrent } = this.state;
    this.setState({
      topTabsCurrent: value,
      subTabsCurrent: 0, //sub tab default 0
      showCharacterSpecial: topTabsCurrent == 2,
    })
  }

  /**
   * sub tab 点击
   * @param {Number} value 索引
   */
  onClickForSubTabs(value) {
    this.setState({
      subTabsCurrent: value
    })

  }

  /**
   * 计算 点击
   */
  onClickForCalc() {
    this.setState({
      showCalcPartOne: true,
      showCalcPartTwo: true
    })
  }
}
