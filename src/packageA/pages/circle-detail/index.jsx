import React from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Presenter from './presenter'
import MainInfoPanel from './main-info-panel'
import TypeTabs from './type-tabs'
import staticData from '@src/store/common/static-data'
import './styles.scss'

const ICON_ADD = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/circle-add.png'
const ICON_FRESH = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/refresh.png'
const ICON_CLOSE = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-b.png'
const ICON_POST = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/posts.png'
const ICON_QA = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/question.png'

@inject('circleDetailStore')
@observer
class CircleDetailView extends Presenter {
  
  config = {
    navigationBarTitleText: '圈子',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
  }

  onPullDownRefresh() {
    this.freshList()
  }


  onShareAppMessage (res){
    let path= '';
    const userId = this.getUserInfo().userId;
    const {updateReLoadCirclePage} = staticData;
    if (res.from === 'button') {
      const {pid,qid} =JSON.parse(res.target.id);
      if(pid){
        path = `/packageB/pages/post-detail/index?pid=${pid}&inviter=${userId}`
      }
      if(qid){
        path = `/packageB/pages/issue-detail/index?qid=${qid}&inviter=${userId}`
      }
      updateReLoadCirclePage(false)
    }
    return {
      title: `欢迎加入童年`,
      path:path
    }
  }

  loadingRender() {
    return (
      <View></View>
    )
  }

  noDataRender() {
    return (
      <View className='no-data-view'>暂无该圈子信息</View>
    )
  }


  render() {
    const { centerHeight, cid, isFresh } = this.state
    const { loading, noData, fixed,showOpPanel} = this.$store
    const scrollStyle = {
      height: centerHeight
    }
    const scrollTop = 0
    const Threshold = 20
    // className={[fixed ? 'fix-tab' : 'circle-detail-viewport']}
    return loading ? this.loadingRender() : noData ? this.noDataRender() : (
      <View className={['circle-detail-viewport']}>
        <MainInfoPanel cid={getCurrentInstance().router.params.cid} />
        <View>
          <TypeTabs/>
        </View>
        <View className='fixed-btns'>
          <Image className='btn' src={ICON_FRESH} onClick={this.overallFreshList} />
          <Image className='btn' src={ICON_ADD} onClick={this.troggleOpPanel} />
        </View>
        {
          showOpPanel &&
          <View className='operator-panel'>
            <View className='add-btns'>
              <View className='btn-item' onClick={this.toCreatePost}>
                <Image src={ICON_POST} alt='' className='icon' />
                <View className='txt'>我想发贴</View>
              </View>
              <View className='btn-item' onClick={this.toCreateIssue}>
                <Image src={ICON_QA} alt='' className='icon' />
                <View className='txt'>我想提问</View>
              </View>
            </View>
            <View className='close-btn'>
              <Image className='close-btn-icon' src={ICON_CLOSE} alt='' onClick={this.troggleOpPanel} />
            </View>
          </View>
        }
      </View>
    )
  }
}

export default CircleDetailView
