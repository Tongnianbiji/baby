import BaseComponent from '../../../common/baseComponent'

import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      showCleanBtn: false,
      kw: '',
      circlesList:[],
      pageNum:1,
      isToBottom:false,
      showLoading:false,
      postLock:false
    }
  }

  componentDidMount(){
    //this.getSearchData()
  }

  onReachBottom(){
    const {postLock, isToBottom} = this.state;
    if(!postLock && !isToBottom){
      this.setState((pre)=>({
        pageNum:pre.pageNum+1
      }),()=>{
        this.getSearchData()
      })
    }
  }

  //获取搜索数据
  getSearchData = async ()=>{
    const {kw,pageNum,circlesList} = this.state;
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
      if (!circlesList.length) {
        this.setState({
          circlesList : items || []
        })
        
      } else {
        this.setState((pre)=>({
          circlesList:pre.circlesList.concat(items || [])
        }))
      }
      if (total <= this.state.circlesList.length) {
        this.setState({
          showLoading:false,
          isToBottom:true
        })
      }
    }else{
      this.setState({
        showLoading:false,
        // isToBottom:true
      })
    }
  }

   //重置列表
   initList = ()=>{
    this.setState({
      circlesList:[],
      pageNum:1,
      showLoading:true,
      isToBottom:false
    })
  }
    

  onKwInput = e => {
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
      if (prev.showCleanBtn !== !!e.target.value) {
        ret.showCleanBtn = !prev.showCleanBtn
      }
      return ret
    })
  }

  cleanKw = () => {
    this.setState({
      kw: '',
      showCleanBtn: false
    })
  }

  createCircle = ()=>{
    this.showToast('即将开放，敬请期待')
  }
}