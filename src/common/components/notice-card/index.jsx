import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './styles.scss'

export default class NoticeCard extends Taro.Component {
  static defaultProps = {
    data: {},
    type: 'post' //post|qa
  }

  constructor(props) {
    super(props)
  }

  renderPost() {
    return (
      <View>
        <View className='content-txt'>同问</View>
        <View className='refrence'>济阳三村幼儿园什么时候开学</View>
      </View>
    )
  }

  renderQA() {
    return (
      <View className='qa-wrapper'>
        <View className='anwser'>
          <View className='icon'>答</View>
          <View className='txt'>张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三</View>
        </View>
        <View className='questions'>
          <View className='icon'>问</View>
          <View className='txt'>济阳三村幼儿园什么时候开学</View>
        </View>
      </View>
    )
  }

  renderFav() {
    return (
      <View className='fav-txt'>济阳三村幼儿园什么时候开学</View>
    )
  }

  render() {
    return (
      <View className='ui-notice-card'>
        <View className='avatar-wrapper'>
          <View className='avatar'></View>
        </View>
        <View className='contents'>
          <View className='title-line'>
            <View className='title'>
              <View className='txt'>张三</View>
              <View className='sub'>回复了你的贴子</View>
            </View>
            <View className='time'>01/25</View>
          </View>
          {
            this.props.type === 'post' ?
              this.renderPost() :
              this.props.type === 'qa' ?
                this.renderQA() :
                this.renderFav()
          }
        </View>
      </View>
    )
  }
}