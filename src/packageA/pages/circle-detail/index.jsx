import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
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

export default class CircleDetailView extends Presenter {
  config = {
    navigationBarTitleText: '圈子'
  }

  loadingRender() {
    return (
      <View></View>
    )
  }

  render() {
    const { loading, listType, dataList, showOpPanel } = this.state
    return loading ? this.loadingRender() : (
      <View className='circle-detail-viewport'>
        <MainInfoPanel />
        <TypeTabs onTypeChange={this.typeChange} key='123'/>
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
              <View className='btn-item'>
                <Image src={ICON_POST} alt='' className='icon' />
                <View className='txt'>我想发贴</View>
              </View>
              <View className='btn-item'>
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