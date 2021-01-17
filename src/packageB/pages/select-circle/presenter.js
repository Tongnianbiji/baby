import BaseComponent from '../../../common/baseComponent'
import staticData from '@src/store/common/static-data'

import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      pageState: 'loading',
      myCircle: [], // 我关注的的圈子
      searchCircle: [], // 我关注的的圈子
      isSearchCircleShow: false,
      isSearchResultEmpty: false,
      sortType: { _score: 'desc' },
      kw: '',
    }
    this.myCirclePageIndex = 1;
    this.myCirclePageSize = 10;
    this.searchPageIndex = 1;
    this.searchPageSize = 10;
  }

  componentDidMount() {
    //this.getSearchData()
    this.getMyCircle(true);
  }

  onReachBottom() {
    if (this.state.isSearchCircleShow) {
      this.getSearchCircle(false);
    } else {
      this.getMyCircle(false);
    }
  }

  // 获取关注圈子列表
  getMyCircle = async (isReload = false) => {
    const res = await Model.getMyCircle(staticData.userInfo.userId, isReload ? this.myCirclePageIndex = 1 : this.myCirclePageIndex);
    this.myCirclePageIndex++;
    if (res) {
      this.setState({
        myCircle: isReload ? res.items : [...this.state.myCircle, ...res.items],
        pageState: 'over',
      });
    } else {
      this.setState({
        pageState: 'error',
      })
    }
  }

  onKwInput = e => {
    const kw = e.target.value;
    this.setState({
      kw,
      isSearchCircleShow: !!kw,
      searchCircle: [],
      myCircle: [],
    });
    if (!!kw) {
      this.getSearchCircle(true);
    } else {
      this.getMyCircle(true);
    }
  }

  // 获取搜索圈子
  getSearchCircle = async (isReload = false) => {
    const { kw, sortType, } = this.state;
    const res = await Model.getData({
      keyword: kw,
      pageNum: isReload ? this.searchPageIndex = 1 : this.searchPageIndex,
      sort: sortType
    });
    this.searchPageIndex++;
    if (res) {
      this.setState({
        searchCircle: isReload ? res.items : [...this.state.searchCircle, ...res.items],
        isSearchResultEmpty: isReload && res.items.length == 0,
        pageState: 'over',
      });
    } else {
      this.setState({
        pageState: 'error',
      })
    }
  }
  
  clearSearch() {
    this.setState({
      kw: '',
      isSearchCircleShow: false,
      isSearchResultEmpty: false,
    });  
    this.getMyCircle(true);
  }
}