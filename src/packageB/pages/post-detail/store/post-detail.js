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
      city:'上海',
      country : '宝山',
      headImg :'',
      nickName :'昵称1',
      sex :'MALE',
      customLevel : [{desc:'3岁9个月'}]
    }
  }

  @action getReplyList = async (sortType=1,pid) => {
    const d = await Model.getReplyList(pid,sortType)
    if (d) {
      this.commentList = d.items
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

  //递归寻找
  findCurrentReplyPost(commentList,params) {
    const { pid, parentRid, replyId } = params;
    commentList.forEach(item => {
      if (
        item.postReplyBo.pid === pid &&
        item.postReplyBo.parentRid === parentRid && 
        item.postReplyBo.replyId === replyId
      ) {
        this.currentReplyPost = item;
      } else {
        this.findCurrentReplyPost(item.leafReplyList,params)
      }
    })
  }
}


const store = new postDetailStore();

export default store;