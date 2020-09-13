import Taro from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import Presenter from './presenter'
import MainPanel from './components/main-panel'
import Comments from './components/comments'

import './index.scss'

export default class PostDetailView extends Presenter {
  config = {
    navigationBarTitleText: '加载中...'
  }

  render() {
    const { detailData, commentList } = this.state
    return (
      <View className='post-detail-view'>
        <MainPanel info={detailData} />
        <Comments dataList={commentList} />
        <View className='input-wrapper'>
          <Input className='input' placeholder='我有话要说' />
        </View>
      </View>
    )
  }
}