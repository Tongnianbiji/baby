import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './style.scss'

export default class CircleItem extends Taro.Component {
  static defaultProps = {

  }

  constructor(props) {
    super(props)
  }

  findMore = () => {
    Taro.navigateTo({ url: '/packageA/pages/more-circle/index' })
  }

  gotoCircleDetail = () => {
    const { cid, name } = this.props
    Taro.navigateTo({ url: `/packageA/pages/circle-detail/index?cid=${cid}&cname=${name}` })
  }

  render() {
    const { name, subscribe, posts, questions, leaf, descript, imgUrl } = this.props;
    return (
      <View className='comp-circle-item' onClick={this.gotoCircleDetail}>
        <View className='base-info'>
          <View className='avatar-wrapper'>
            <View className='avatar'>
              {
                imgUrl && <Image className='avatar-img' src={imgUrl} />
              }
            </View>
          </View>
          <View className='infos'>
            <View className='title'>{name}</View>
            <View className='subtitle'>简介:{descript}</View>
          </View>
        </View>
        <View className='numbers'>
          <View className='number'>关注: {subscribe}</View>
          <View className='number'>帖子: {posts}</View>
          <View className='number'>问答: {questions}</View>
        </View>
        {
          leaf && <View className='more' onClick={this.findMore}>发现更多&gt;</View>
        }

      </View>
    )
  }
}