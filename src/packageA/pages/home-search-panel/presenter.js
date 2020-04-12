import Taro from '@tarojs/taro'
import BaseComponent from '../../../common/baseComponent'
import Model from './model'
import { SearchResultType } from '../../../common/enums'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      tabList: Model.tabList,
      searchData: null,
      currentTopTab: 0
    }
  }

  doSearch() {
    Model.search()
  }

  onMore = t => {
    const index = {
      [SearchResultType.CIRCLE]: 3,
      [SearchResultType.ANSWER]: 2,
      [SearchResultType.POST]: 1
    }[t]
    this.topTabChange(index)
  }

  topTabChange = (current) => {
    this.setState({
      currentTopTab: +current
    })
  }

  onSearch = val => {
    this.setState({
      searchData: val
    })
  }
}