import BaseComponent from '../../../common/baseComponent'
import Model from './model';

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      sliderStyle: {},
      activeTab: 1,
      childrenCircles:[],
      isToBottom:false,
      showLoading:false,
      postLock:false,
      pageNum:1,
      kw:'',
      current:0
    }
  } 

  componentWillMount() {
    const {cname} = this.$router.params;
    this.setNavBarTitle(cname);
    this.getData();
  }

  // onReachBottom(){
  //   const {postLock, isToBottom} = this.state;
  //   if(!postLock && !isToBottom){
  //     this.setState((pre)=>({
  //       pageNum:pre.pageNum+1
  //     }),()=>{
  //       this.getData()
  //     })
  //   }
  // }

  tabChange(index) {
    this.setState({
      activeTab: index,
      sliderStyle: {
        transform: `translateX(${100 * (index - 1)}%)`
      }
    })
  }

  //重置列表
  initList = ()=>{
    this.setState({
      childrenCircles:[],
      pageNum:1,
      showLoading:true,
      isToBottom:false
    })
  }

  onKwInput = async(e) => {
    this.initList();
    this.setState(prev => {
      const ret = {
        kw: e.target.value
      }
      this.setState(pre=>({
        kw:ret.kw
      }),()=>{
        if(ret.kw){
          this.getSearchData()
        }else{
          this.setState({
            showLoading:false
          })
        }
      })
      // if (prev.showCleanBtn !== !!e.target.value) {
      //   ret.showCleanBtn = !prev.showCleanBtn
      // }
      return ret
    })
  }

  getSearchData = async ()=>{
    const {kw,pageNum,childrenCircles} = this.state;
    this.setState({
      postLock:true
    })
    let res = await Model.getData({
      keyword:kw,
      pageNum
    });
    this.setState({
      postLock:false
    })

    if(res && res.items && res.items.length){
      const {total,items} = res;
      if (!childrenCircles.length) {
        this.setState({
          childrenCircles : items || []
        })
        
      } else {
        this.setState((pre)=>({
          childrenCircles:pre.childrenCircles.concat(items || [])
        }))
      }
      if (total <= this.state.childrenCircles.length) {
        this.setState({
          showLoading:false,
          isToBottom:true
        })
      }
    }else{
      this.setState({
        showLoading:false,
      })
    }
  }

  getData = async()=>{
    const {cid} = this.$router.params;
    let res = await Model.getData(cid);
    console.log('res',res)
    if(res && res.items){
      this.setState({
        childrenCircles:res.items
      })
    }
  }

  //加入/已加入
  handleSubsrc= async (model)=>{
    let {postLock,childrenCircles} = this.state;
    let preIndex = childrenCircles.findIndex(item=>item.cid === model.cid)
    if(!postLock){
     if(model.isSubscribe){
       this.setState({
         postLock:true
       })
       let res = await Model.leaveCircle(model.cid);
       this.setState({
         postLock:false
       })
       childrenCircles[preIndex].isSubscribe = false
       if(res){
         this.showToast('已取消');
       }
     }else{
       this.setState({
         postLock:true
       })
       let res = await Model.joinCircle(model.cid);
       this.setState({
         postLock:false
       })
       childrenCircles[preIndex].isSubscribe = true
       if(res){
         this.showToast('已加入');
       }
     }
    }
    this.setState({
      childrenCircles:childrenCircles
    })
  }

  toSearch =()=> {
    this.navto({ url: '/packageA/pages/search-circle/index' })
  }

  onTabChange = (id)=>{
    this.setState({
      current: id
    })
  }
}