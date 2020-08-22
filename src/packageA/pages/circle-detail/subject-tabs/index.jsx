import Taro from '@tarojs/taro'
import {View, ScrollView, Image} from '@tarojs/components'
import UITabs from '../../../../common/components/ui-tabs'
import './index.scss'

const tabList = [
  { title: '最热', useable: true },
  { title: '最新发布', useable: true },
  { title: '最新回复', useable: true }
]

const mock = [
  { title: '全部' },
  { title: '生活' },
  { title: '灌水' },
  { title: '学校' },
  { title: '生活' },
  { title: '灌水' },
  { title: '生活' },
  { title: '灌水' }
]

export default class CircleTabs extends Taro.Component {
  constructor() {
    super()
    this.state = {
      current: 0
    }
  }

  onTabChange = num => {
    this.setState({ current: num })
  }

  render() {
    const {current} = this.state
    return (
      <View className='circle-tabs-view'>
        <View className='header'>
          <View className='title'>话题列表</View>
          <View className='tabs-wrapper'>
            <UITabs
              itemColor='#999'
              tabList={tabList}
              size='small'
              current={current}
              onChange={this.onTabChange}
            />
          </View>
        </View>
        <View className='tag-wrapper'>
          <ScrollView scrollX>
            <View className='tag-list'>
            {
              mock.map((item, index) => (
                <View key={index} className={`tag-item${!index ? ' all': ''}`}>{item.title}</View>
              ))
            }
            </View>
          </ScrollView>
          <View className='right-arrow'>
            <Image className='arrow-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-b.png' />
          </View>
        </View>
      </View>
    )
  }
}