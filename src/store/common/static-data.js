import { observable, action} from 'mobx'
import Taro from '@tarojs/taro'
import Request from '@common/baseRequest'

const req = new Request()


class Data {
  //获取帖子标签列表
  @observable currentCity = '浦东区';
  @observable isGuide = false;
  @observable isRegiste = false;

  @action updateCurrentCity = (currentCity)=>{
    this.currentCity = currentCity
  }

  @action updateIsRegisteStatus = (status)=>{
    this.isRegiste = status
  }

  @action updateGuideStatus = (status)=>{
    this.isGuide = status
  }

  @action getTagList = async (cid) => {
    const ret = await req.postWithToken('post/getTag', { cid })
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  }
}

const store = new Data();

export default store;