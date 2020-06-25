import Taro from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'
/**
 * 未完成, 目前只支持 两个item...
 */
export default class UISliderTabView extends Taro.Component {
  static defaultProps = {
    tabList: [],
    onChange: () => ({}),
    current: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  tabChange = num => {
    this.setState({ current: num })
    this.props.onChange(num)
  }

  render() {
    const {tabList} = this.props
    const {current} = this.state
    return (
      <View className='ui-slider-tab'>
        <View className={`slider-view${current === 1 ? ' left-status' : ''}`}></View>
        <View className='tab-items'>
          {
            tabList.map((tab, index) => {
              return <Text
                key={tab.title}
                className='tab-item'
                onClick={this.tabChange.bind(this, index)}>{tab.title}</Text>
            })
          }
        </View>
      </View>
    )
  }
}