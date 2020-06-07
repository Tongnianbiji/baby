import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './styles.scss'

export default class UITabs extends Taro.Component {
  static defaultProps = {
    tabList: [],
    current: 0,
    change: () => ({})
  }

  constructor() {
    this.state = {
      cur: this.props.current
    }
  }

  componentWillReceiveProps({ current }) {
    this.setState({
      cur: current
    })
  }

  render() {
    const { tabList, change } = this.props
    const { cur } = this.state
    return (
      <View className='ui-tabs'>
        {
          tabList.map((tab, index) => (
            <View
              key={index}
              className={`ui-tabs-item${index === cur ? ' item-actived' : ''}`}
              onClick={change.bind(null, index)}
            >
              {tab.title}
              {index === cur && <View className='active-underscore'></View>}
            </View>
          ))
        }
      </View>
    )
  }
}