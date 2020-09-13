import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ICONS } from '@common/constant'
import CommentItem from '../comment-item'

import './index.scss'

export default class CommentsView extends Taro.Component {
  static defaultProps = {
    dataList: []
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { dataList } = this.props
    return (
      <View className='comment-view'>
        <View className='title'>
          评论(18)
          <View className='sort-btn'>
            热度排行
            <Image src={ICONS.ARROW_DOWN} className='down-arrow' />
          </View>
        </View>
        <View className='comment-list'>
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </View>
      </View>
    )
  }
}