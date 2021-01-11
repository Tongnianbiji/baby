import React from 'react'
import BaseComponent from '../../../common/baseComponent'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import Model from './model'
import staticData from '@src/store/common/static-data'

let exposureIdList = new Set();
export default class Presenter extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
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
    staticData.updateReLoadCirclePage(true)
    const { cid, cname = '' } = getCurrentInstance().router.params;
    const info = Taro.getSystemInfoSync();
    const { windowHeight, statusBarHeight, titleBarHeight } = info;
    const tempHeight = (windowHeight - 200 )+ 'px';
    this.$store.updateCircleId(cid);
    //this.$store.updateCenterHeight(tempHeight)
    this.setState({
      cid: cid,
      tempHeight:tempHeight
    })
    this.setNavBarTitle(cname);
  }
  componentDidShow() {
    this.onAutoLogin().then(res => {
      if (this.isShareModalShow) {
        this.isShareModalShow = false;
        return;
      };

      console.log('---componentDidShow---', getCurrentInstance().router.params)
      const { cid } = getCurrentInstance().router.params;
      const { reLoadCirclePage, updateReLoadCirclePage } = staticData;
      if (reLoadCirclePage) {
        this.showLoading();
        this.initData(cid);
      }
      updateReLoadCirclePage(true)
    })
  }

  componentWillUnmount(){
    this.$store.initData();
  }

  onPullDownRefresh() {
    this.freshList()
  }

  //判断是否到底
  isToBottom() {
    return this.$store.isToBottom()
  }

  //切换tab请求不同tab接口
  typeTabPost() {
    this.$store.typeTabPost();
  }

  onReachBottom() {
    const { postLock, listType } = this.$store;
    this.$store.updateTabPageNum(listType);
    if (!this.isToBottom() && !postLock) {
      this.typeTabPost()
    }
  }

  async initData(cid) {
    const { leaf } = await this.$store.getDetail(cid, true);
    await this.$store.getAttentionState(cid, true);
    await this.$store.getTopPost(cid, true);
    await this.$store.getCirclePosts(cid, true);
    await this.$store.getParentCircles(cid, true);
    if (leaf) {
      await this.$store.getSiblingCircles(cid, true)
    } else {
      await this.$store.getChildCircles(cid, true)
    }
    await this.getCustomConfig(cid, true);
    this.hideLoading()
  }

  async getCirclePostsList() {
    const { pageNum,cid,isFresh } = this.state;
    await this.$store.getCirclePosts(cid, pageNum);
    if (isFresh) {
      this.$store.updateIsFiexd(false)
    }
    
  }

  //刷新列表
  freshList = async () => {
    const { postLock, listType } = this.$store;
    this.$store.resetTabListStatus(listType);
    this.$store.updateIsFiexd(false);
    if (!this.$store.isToBottom()&&!postLock) {
      await this.$store.typeTabPost();
      Taro.stopPullDownRefresh()
    }
    Taro.vibrateShort();
  }

  //全局刷新
  overallFreshList = () => {
    const { postLock, listType } = this.$store;
    this.$store.resetTabListStatus(listType);
    this.$store.updateIsFiexd(false);
    Taro.vibrateShort();
    setTimeout(async() => {
      if (!this.$store.isToBottom()&&!postLock) {
        await this.$store.typeTabPost();
        Taro.stopPullDownRefresh()
      }
    }, 500);
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
    const { postLock } = this.$store;
    if(!postLock){
      this.$store.updateCirclePostsByFavorite(item.pid)
    }
  }

  //获取定制圈子的配置信息
  getCustomConfig = async (cid)=>{
    let res = await Model.getCustomConfig(cid);
    if(res){
      this.$store.saveCustomConfig(res);
      if(res.customAgeFlag || res.customRegionFlag){
        this.$store.updateCustomStatus(true)
      }else{
        this.$store.updateCustomStatus(false)
      }
    }
  }

  typeChange = (index, data) => {
    this.setState({ listType: index })
  }

  troggleOpPanel = () => {
    const {showOpPanel} = this.$store;
    this.$store.updateOpPanel(!showOpPanel)
  }

  toCreatePost = () => {
    const { cid, cname = '' } = getCurrentInstance().router.params
    const {isLogin} = staticData;
    if(isLogin){
      this.navto({ url: `/packageB/pages/create-post/index?cid=${cid}&cname=${cname}` })
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }

  toCreateIssue = () => {
    const { cid, cname = '' } = getCurrentInstance().router.params;
    const {isLogin} = staticData;
    if(isLogin){
      this.navto({ url: `/packageB/pages/create-issue/index?cid=${cid}&cname=${cname}` })
    }else{
      Taro.navigateTo({
        url:'/pages/login/index'
      })
    }
  }
}