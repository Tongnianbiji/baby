import React from 'react'
import BaseComponent from '../../../common/baseComponent'
// import Model from './model'
import Taro, {getCurrentInstance} from '@tarojs/taro'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      listType: 0,
      //dataList: [1, 2, 3, 4,5,6,7],
      //circlePostsDataList:[],
      showOpPanel: false,
      cid: '',
      centerHeight: '',
      fixed: false,
      tempHeight: 0,
      pageNum: 1,
      isFresh: false
    }

    this.$store = this.props.circleDetailStore
  }

  componentDidMount() {
    const { cid, cname = '' } = getCurrentInstance().router.params;
    const info = Taro.getSystemInfoSync();
    const { windowHeight, statusBarHeight, titleBarHeight } = info
    const tempHeight = (windowHeight - 170) + 'px'
   
    this.setState({
      cid: cid,
      tempHeight:tempHeight
      //centerHeight: tempHeight
    })
    this.setNavBarTitle(cname)
    this.showLoading()
    this.initData(cid)
  }
  onPageScroll(e) {
    console.log('已移动距离', e.scrollTop);
    let { tempHeight } = this.state;
    let scrollTop = e.scrollTop;
    if (scrollTop >= 230) {
      this.setState({
        fixed: true,
        centerHeight: tempHeight
      })
    } 
  }

  async initData(cid) {
    console.log('cid', cid)
    const { leaf } = await this.$store.getDetail(cid);
    await this.$store.getAttentionState(cid);
    await this.$store.getTopPost(cid);
    await this.$store.getCirclePosts(cid);
    
    if (leaf) {
      await this.$store.getSiblingCircles(cid)
    } else {
      await this.$store.getChildCircles(cid)
    }
    this.hideLoading()
  }

  async getCirclePostsList() {
    const { pageNum,cid,isFresh } = this.state;
    await this.$store.getCirclePosts(cid, pageNum);
    if (isFresh) {
      this.setState({
        fixed: false
      })
    }
    
  }

  //刷新列表
  freshList = () => {
    this.setState(pre => ({
      isFresh: true
    }), () => {
        this.$store.setCirclePostsEmpty();
        this.getCirclePostsList();
        this.$store.setIsToBottom(false);
    })
  }

  //点击子tab获取帖子数据
  getSubTabList = () => {
    this.setState(pre => ({
      pageNum: 1,
      isFresh: false
    }), () => {
      this.$store.setCirclePostsEmpty();
      this.getCirclePostsList();
    })
  }

  onScrollToLower = () => {
    if (!this.$store.isToBottom) {
      this.setState(pre => ({
        pageNum: pre.pageNum++,
        isFresh: false
      }), () => {
        this.getCirclePostsList();
      })
    }
    
  }

  //收藏
  onHandleFavorite = (item) => {
    this.$store.updateCirclePostsByFavorite(item.pid)
  }

  typeChange = (index, data) => {
    this.setState({ listType: index })
  }

  troggleOpPanel = () => {
    this.setState(prevState => ({
      showOpPanel: !prevState.showOpPanel
    }))
  }

  toCreatePost = () => {
    const { cid, cname = '' } = getCurrentInstance().router.params
    this.navto({ url: `/packageB/pages/create-post/index?cid=${cid}&cname=${cname}` })
  }

  toCreateIssue = () => {
    const { cid, cname = '' } = getCurrentInstance().router.params
    this.navto({ url: `/packageB/pages/create-issue/index?cid=${cid}&cname=${cname}` })
  }
}