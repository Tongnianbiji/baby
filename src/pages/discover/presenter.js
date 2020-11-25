import BaseComponent from '../../common/baseComponent'
import Model from './model'
import staticData from '@src/store/common/static-data'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      tags: [],
      circles: [],
      activedMenu: {sid:'r1'},
      activedTag: null,
      tagsOpen: false,
      //推荐
      r1Menu:{
        sid:'r1'
      },
      r1Tag:[{}],
      recommendCircles:[],
      profileInfo:{}
    }
  }

  componentDidMount() {
    this.getMenus();
    this.getRecommendCircle();
    this.getProfile();
  }

  componentDidShow(){
    const {fromHomeMore,updateFromHomeMoreStatus} = staticData;
    let {activedMenu} = this.state;
    if(fromHomeMore){
      activedMenu = {sid:'r1'};
      this.setState({
        activedMenu:activedMenu
      },()=>{
        updateFromHomeMoreStatus(false)
      })
    }
  }

  onShareAppMessage (res){
    const {profileInfo} = this.state;
    console.log('昵称',profileInfo)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `${profileInfo.nickName}邀请加入童年`,
      path: `/pages/index/index`
    }
  }

  getProfile() {
    this.showLoading();
    let userId = this.getUserInfo().userId;
    Model.profile(userId).then((ret) => {
      if (!ret.code) {
        this.hideLoading();
        this.setState({ profileInfo: ret.data });
      }
      else {
        this.hideLoading();
      }
    })
    this.hideLoading();
  }

   /**
   * 推荐
   */

  getRecommendCircle = async ()=>{
    let res = await Model.getRecommendCircle();
    if(res){
      this.setState({
        recommendCircles:res
      })
    }
  }


  /**
   * 一级
   */
  getMenus() {
    const {r1Menu} = this.state;
    Model.getMenus().then(ret => {
      this.setState({
        menus: ret.data,
        //activedMenu: ret.data && ret.data.length && ret.data[0]
        activedMenu:r1Menu
      }, () => { this.getTags() })
    })
  }

  /**
   * 二级
   * @param {*} sid 
   */
  getTags() {
    const { sid } = this.state.activedMenu;
    if(sid === 'r1'){
      this.setState(pre=>({
        activedTag:pre.r1Tag
      }),()=>{
        this.getRecommendCircle()
      })
    }else{
      Model.getTags({ sid }).then(ret => {
        this.setState({
          tags: ret.data,
          activedTag: ret.data && ret.data.length && ret.data[0],
        }, () => {
          this.getCircles()
        })
      })
    }
  }

  /**
   * 列表
   * @param {*} param0 
   */
  getCircles() {
    const { activedMenu, activedTag } = this.state;
    const param = { firstSubjectId: activedMenu.sid, secondSubjectId: activedTag.sid};
    Model.getCircle(param).then(ret => {
      console.log('ret',ret)
      this.setState({ circles: ret.items })
    })
  }

  //推荐二级列表
  getR1Circles(){
    const param = { psid:1 , sid:2 , cid: 0 };
    Model.getCircle(param).then(ret => {
      this.setState({ circles: ret.data.circles })
    })
  }

  menuClick(menu) {
    this.setState({
      activedMenu: menu
    }, () => { this.getTags(menu) })
  }

  tagsClick(tag) {
    this.setState({
      activedTag: tag
    }, () => { this.getCircles() })
  }

  troggleTags() {
    this.setState(prevState => ({
      tagsOpen: !prevState.tagsOpen
    }))
  }

  toSearch =()=> {
    this.navto({ url: '/packageA/pages/search-circle/index' })
  }
}