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

  // 不支持递归渲染
  // 只要是包含的jsx的func 都会undefined. 神奇
  // 支持多少层, 就写多少以下代码吧..
  getRenderContents(list) {
    return (
      <View>
        {
          list.map(item => {
            return <CommentItem key={item.key} needLine hasChildren={item.list && item.list.length}>
              {
                item.list && item.list.map((item2, index2) => {
                  return (
                    <CommentItem key={item2.key} hasChildren={item2.list && item2.list.length} last={index2 === item.list.length - 1}>
                      {
                        item2.list && item2.list.map((item3, index3) => (
                          <CommentItem key={item3.key} hasChildren={item3.list && item3.list.length} last={index3 === item2.list.length - 1}>
                            {
                              item3.list && item3.list.map((item4, index4) => (
                                <CommentItem key={item4.key} hasChildren={item4.list && item4.list.length} last={index4 === item3.list.length - 1} />
                              ))
                            }
                          </CommentItem>
                        ))
                      }
                    </CommentItem>
                  )
                })
              }
            </CommentItem>
          })
        }
      </View>
    )
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
          {
            this.getRenderContents(dataList)
          }
        </View>
      </View>
    )
  }
}