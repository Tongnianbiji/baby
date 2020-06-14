import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './type-tabs.scss'

const TypeTabs = [
  { title: '精华' },
  { title: '帖子' },
  { title: '问答' },
  { title: '热门' },
  { title: '用户' },
  { title: '定制圈子' }
]
export default class TypeTabsView extends Taro.Component {
  constructor() {
    super()

    this.state = {
      current: 0
    }
  }

  typeTabChange = index => {
    this.setState({
      current: index
    })
  }

  render() {
    const {current} = this.state
    return (
      <View className='type-tabs-view'>
        <AtTabs className='tabs' tabList={TypeTabs} current={current} onClick={this.typeTabChange}>
          <AtTabsPane index={0} current={current}>1</AtTabsPane>
          <AtTabsPane index={1} current={current}>2</AtTabsPane>
          <AtTabsPane index={2} current={current}>3</AtTabsPane>
          <AtTabsPane index={3} current={current}>4</AtTabsPane>
          <AtTabsPane index={4} current={current}>5</AtTabsPane>
          <AtTabsPane index={5} current={current}>6</AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}