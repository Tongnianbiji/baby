import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import Presenter from './presenter'
import MainInfoPanel from './main-info-panel'
import TypeTabs from './type-tabs'
import PostCard from '../../../common/components/post-card'
import UserCard from '../../../common/components/user-card'
import QACard from './qa-card'
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
    navigationBarTitleText: '圈子'
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
    const { listType, dataList, showOpPanel } = this.state
    const { loading, noData } = this.$store

    return loading ? this.loadingRender() : noData ? this.noDataRender() : (
      <View className='circle-detail-viewport'>
        <MainInfoPanel cid={this.$router.params.cid} />
        <TypeTabs onTypeChange={this.typeChange} key='123' />
        <View className='card-wrapper'>
          {
            dataList.map(num => {
              return [0, 1, 3].includes(listType) ?
                <PostCard showOrder={listType===3} key={num} countryAble={false} closeRelease needShared /> :
                listType === 2 ? <QACard /> : 
                listType === 4 ? <UserCard /> : null
            })
          }
        </View>
        <View className='fixed-btns'>
          <Image className='btn' src={ICON_ADD} onClick={this.troggleOpPanel} />
          <Image className='btn' src={ICON_FRESH} />
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
