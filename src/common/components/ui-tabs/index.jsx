import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './styles.scss'

export default class UITabs extends Taro.Component {
  static defaultProps = {
    tabList: [],
    current: 0,
    onChange: () => ({}),
    size: 'normal',
    itemColor: ''
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

  itemClick = (tab, index) => {
    if (tab.useable) {
      this.props.onChange(index)
    }
  }

  render() {
    const { tabList, size, itemColor } = this.props
    const { cur } = this.state
    const customItemStyle = {}
    itemColor && (customItemStyle.color = itemColor)
    return (
      <View className='ui-tabs'>
        {
          tabList.map((tab, index) => (
            <View
              key={tab.title}
              style={customItemStyle}
              className={`ui-tabs-item${index === cur ? ' item-actived' : ''}${tab.useable ? '' : ' item-unuserable'}${size==='small' ? ' small-item': ''}`}
              onClick={this.itemClick.bind(this, tab, index)}>
              {tab.title}
              {index === cur && <View className='active-underscore'></View>}
            </View>
          ))
        }
      </View>
    )
  }
}