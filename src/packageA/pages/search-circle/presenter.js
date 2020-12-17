import BaseComponent from '../../../common/baseComponent'

import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      pageState: 'over',
      showCleanBtn: false,
      kw: '',
      circlesList:[],
      pageNum:1,
      isToBottom:false,
      showLoading:false,
      postLock:false,
      sortType:{ _score:'desc'}
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

  saveSecachHistory = async(type,content,cid)=>{
    return await Model.saveSecachHistory(type,content,cid)
  }

  clickDosearch = (value,e)=>{
    this.setState({
      kw:value
    },()=>{
      this.getSearchData()
    })
  }

  //获取搜索数据
  getSearchData = async ()=>{
    const {kw,pageNum,circlesList,sortType} = this.state;
    this.setState({
      postLock:true
    })
    let res = await Model.getData({
      keyword:kw,
      pageNum,
      sort:sortType
    });
    this.setState({
      postLock: false,
      pageState: 'over'
    })

    if(res && res.items){
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

  onKwConfirm = async (e) =>{
    await this.saveSecachHistory(2,e.target.value,0)
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

  //加入/已加入
  handleSubsrc= async (model)=>{
    let {postLock,circlesList} = this.state;
    let preIndex = circlesList.findIndex(item=>item.cid === model.cid)
    if(!postLock){
     if(model.isSubscribe){
       this.setState({
         postLock:true
       })
       let res = await Model.leaveCircle(model.cid);
       this.setState({
         postLock:false
       })
       circlesList[preIndex].isSubscribe = false
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
       circlesList[preIndex].isSubscribe = true
       if(res){
         this.showToast('已加入');
       }
     }
    }
    this.setState({
      circlesList:circlesList
    })
  }

  onTabChange = (id)=>{
    let sortType = {};
    const {kw} = this.state;
    this.initList();
    switch(id){
      case 0:
        sortType={ _score:'desc'}
        break;
      case 1:
        if(kw){
          sortType={ _score:'desc',location:'asc'}
        }else{
          sortType={location:'asc'}
        }
        break;
      case 2:
        if(kw){
          sortType={ _score:'desc',heat_rate:'desc'}
        }else{
          sortType={ heat_rate:'desc'}
        }
        break;
      }
    this.setState({
      current: id,
      sortType: sortType,
      pageState: 'loading',
    },()=>{
      this.getSearchData()
    })
  }
}