import { observable, action} from 'mobx'
import Taro from '@tarojs/taro'
import Request from '@common/baseRequest'
import Model from '../model'

const req = new Request();

class postDetailStore{
  @observable commentList = [];
  @observable pid = '';
  @observable currentReplyPost = {};
  @observable placeholder = '我有话要说';
  @observable isFocus = false;
  @observable activeFocus = false;
  @observable isToPostOwner = true;
  @observable detailData = {
    userSnapshot: {
      city:'',
      country : '',
      headImg :'',
      nickName :'',
      sex :'',
      customLevel : [{desc:''}]
    }
  };
  @observable files = [];

  @observable total = 0;

  @action getReplyList = async (sortType=1,pid) => {
    const d = await Model.getReplyList(pid,sortType)
    if (d) {
      this.commentList = this.insertStatus( d.items);
    }
  }

  @action updateReplyList = (commentList) => {
    this.commentList = commentList
  }

  @action initPageList = ()=>{
    this.commentList = [];
    this.detailData = {
      userSnapshot: {
        city:'',
        country : '',
        headImg :'',
        nickName :'',
        sex :'',
        customLevel : [{desc:''}]
      }
    }
  }

  @action getDetail = async (pid) => {
    const d = await Model.getDetail(pid)
    if (d) {
      this.pid = d.pid;
      this.detailData = d;
    }
    return d;
  }

  @action getFilesData = (file) => {
    this.files.push(file);
  }

  @action getCurrentReplyPostData = (model) => {
    this.currentReplyPost = model;
  }

  @action updateCurrentplaceholder = (model) => {
    this.placeholder = model;
  }

  @action updateFocusStatus = (status) => {
    this.isFocus = status;
  }

  @action updateActiveFocusStatus = (status) => {
    this.activeFocus = status;
  }

   @action updateIsToPostOwnerStatus = (status) => {
    this.isToPostOwner = status;
  }

  @action updatePostFavoriteMarks = (params) => {
    const { markes, isMark } = params;
    this.detailData.markes += markes;
    this.detailData.isMark = isMark;
  }

  @action updateCurrentReplyLikes = async (params) => {
    const { likes, isLikes } = params;
    this.currentReplyPost.likes += likes;
    this.currentReplyPost.isLikes = isLikes;
  }

  @action updateCurrentReplyDisLikes = (params) => {
    const { dislikes, isDislikes} = params;
    this.currentReplyPost.dislikes += dislikes;
    this.currentReplyPost.isDislikes = isDislikes;
  }

  @action handleLike = async () => {
    const { updateCurrentReplyLikes, currentReplyPost, isToPostOwner } = this;
    const { pid, replyId, parentRid } = currentReplyPost;
    let params = {
      likes: 1,
      isLikes:true
    }
    if (!currentReplyPost.isDislikes && !isToPostOwner) {
      if (currentReplyPost.isLikes) {
        params.likes = -1;
        params.isLikes = false;
        const d = await Model.postLikeCancel(pid, replyId, parentRid);
      } else {
        const d = await Model.postLike(pid, replyId, parentRid);
      }
      Taro.vibrateShort();
      Taro.showToast({
        title:`点赞${params.likes}`,
        icon:'none'
      })
      updateCurrentReplyLikes(params)
    }
  }

  @action handleDisLike = async () => {
    const { updateCurrentReplyDisLikes, currentReplyPost, isToPostOwner } = this;
    const { pid, replyId, parentRid } = currentReplyPost;
    let params = {
      dislikes: 1,
      isDislikes:true
    }
    if (!currentReplyPost.isLikes && !isToPostOwner) {
      if (currentReplyPost.isDislikes) {
        params.dislikes = -1;
        params.isDislikes = false;
        const d = await Model.postDislikeCancel(pid, replyId, parentRid);
      } else {
        const d = await Model.postDislike(pid, replyId, parentRid);
      }
      Taro.vibrateShort();
      Taro.showToast({
        title:`点踩${params.dislikes}`,
        icon:'none'
      })
      updateCurrentReplyDisLikes(params)
    }
  }

   //递归插入状态位
   @action insertStatus = (commentList)=>{
    commentList.forEach(item => {
      item.isShowSubInfo=true;
      item.isShowContent=true;
      item.subLength=this.calcSubListLen(item);
      this.insertStatus(item.leafReplyList)
    })
    return commentList;
  }

  //递归计算子元素list的长度
  @action calcSubListLen = (obj)=>{
    console.log('obj',obj)
    if(!obj.leafReplyList.length){
      return 1;
    }
    else{
      let total = 1;
      obj.leafReplyList.forEach(item=>{
        total += this.calcSubListLen(item)
      })
      return total
    }
  }

  //递归更新回复列表状态
  @action getUpdateReplyListStatus =(commentList,params) => {
    const { pid, replyId } = params;
    commentList.forEach(item => {
      if (
        item.postReplyBo.pid === pid &&
        item.postReplyBo.replyId === replyId
      ) {
        item.isShowSubInfo=!item.isShowSubInfo;
        item.isShowContent=!item.isShowContent;
      } else {
        this.getUpdateReplyListStatus(item.leafReplyList,params)
      }
    })
    return commentList
  }
}


const store = new postDetailStore();

export default store;