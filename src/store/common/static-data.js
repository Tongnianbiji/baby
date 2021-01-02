import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'
import Request from '@common/baseRequest'

const req = new Request()


class Data {
  //获取帖子标签列表
  @observable currentCity = '浦东区';
  @observable isGuide = false;
  @observable isRegiste = false;
  @observable role = '妈妈';
  @observable school = '';
  @observable hospital = '';
  @observable babyList = '';
  @observable babyNickname = '';
  @observable sex = 'MALE';
  @observable wxUserInfo = {};
  @observable fromHomeMore = false;
  @observable nickName = '';
  @observable signature = '';
  @observable reLoadCirclePage = true;
  @observable goEasy = null;
  @observable inviter = '';
  @observable invtKey = '';
  @observable bid = '';
  @observable inviterRoles = '';
  @observable newInviter = '';
  @observable inviterName = ''
  @observable userInfo = {};
  @observable loactionInfo = {};
  @observable token = '';
  @observable isLogin = false;

  @action getGoEasy = (goEasy) => {
    this.goEasy = goEasy
  }
  @action setToken = (token) => {
    this.token = token
  }
  @action updateReLoadCirclePage = (status) => {
    this.reLoadCirclePage = status
  }
  @action setLocationInfo = (loactionInfo) => {
    this.loactionInfo = loactionInfo
  }

  @action updateCurrentCity = (currentCity) => {
    this.currentCity = currentCity
  }

  @action updateIsRegisteStatus = (status) => {
    this.isRegiste = status
  }

  @action updateGuideStatus = (status) => {
    this.isGuide = status
  }

  @action updateRole = (role) => {
    this.role = role
  }
  @action getTempRole = () => {
    const value = this.tempRole;
    this.tempRole = '';
    return value;
  }
  @action setTempRole = (tempRole) => {
    this.tempRole = tempRole
  }

  @action updateSex = (sex) => {
    this.sex = sex
  }

  @action updateNickName = (nickName) => {
    this.nickName = nickName
  }

  @action updateSignature = (signature) => {
    this.signature = signature
  }

  @action updateWxUserInfo = (info) => {
    this.wxUserInfo = info
  }
  @action updateUserInfo = (info) => {
    this.userInfo = info;
    this.userId = info.userId; // TODO - 项目中的userId全改用userInfo
  }

  @action updateSchool = (school) => {
    this.school = school
  }

  @action updateHospital = (hospital) => {
    this.hospital = hospital
  }

  @action updateBabyList = (babyList) => {
    this.babyList = babyList
  }

  @action updateBabyNickname = (babyNickname) => {
    this.babyNickname = babyNickname
  }

  @action updateIsLoginStatus = (status) => {
    this.isLogin = status
  }

  @action updateFromHomeMoreStatus = (status) => {
    this.fromHomeMore = status
  }

  @action updateInviter = (inviter) => {
    console.log('inviter', inviter)
    this.inviter = inviter
  }

  @action updateInviterName = (inviter) => {
    this.inviterName = inviter
  }

  @action updateInvtKey = (invtKey) => {
    this.invtKey = invtKey
  }

  @action updateBid = (bid) => {
    this.bid = bid
  }

  @action updateInviterRoles = (inviterRoles) => {
    this.inviterRoles = inviterRoles
  }

  @action updateNewInvtKey = (newInviter) => {
    this.newInviter = newInviter
  }

  @action getTagList = async (cid) => {
    const ret = await req.postWithToken('post/getTag', { cid })
    const d = req.standardResponse(ret)
    return d.code === 0 && d.data || null
  }
}

const store = new Data();

export default store;