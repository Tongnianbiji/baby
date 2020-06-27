import Taro from '@tarojs/taro'
import {View, Switch, Image} from '@tarojs/components'
import './index.scss'

const ICON_CLOSE = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/add-a.png'

const mock = [
  { data: [{title: '备孕'}, {title: '孕早期(1-3个月)'}, {title: '孕早期(4-6个月)'}, {title: '孕早期(7-10个月)'}] },
  { data: [{title: '1岁'}, {title: '2岁'}, {title: '3负'}, {title: '幼儿园小班'}, {title: '幼儿园中班'}, {title: '幼儿园大班'}] },
  { data: [{title: '一年级'}, {title: '二年级'}, {title: '三年级', actived: true}, {title: '四年级'}, {title: '五年级'}, {title: '六年级'}] },
  { data: [{title: '初中一年级'}, {title: '初中二年级'}, {title: '初中三年级'}, {title: '商中一年级'}, {title: '高中二年级'}] }
]

export default class CustomCircle extends Taro.Component {
  constructor() {
    this.state = {
      openArea: false,
      openFeature: false
    }
  }

  toggleArea = d => {
    this.setState({
      openArea: d.detail.value
    })
  }

  toggleFeature = ({ detail: { value = false } }) => {
    this.setState({
      openFeature: value
    })
  }

  render() {
    const {openArea, openFeature} = this.state
    return (
      <View className='custom-circle-view'>
        <View className='poster-area-wrapper'>
          <View className='header'>
            <View className='title'>贴子发布者区域</View>
            <View><Switch color='#FF473A' onChange={this.toggleArea}/></View>
          </View>
          {
            openArea &&
              <View className='items-wrapper'>
                <View className='item-card'>
                  <View className='container'>
                    <View className='radio-wrapper'>
                      <View className='radio'><View className='radio-center' /></View>
                    </View>
                    <View className='content-wrapper'>
                      <View className='title'>同省(江苏省)</View>
                    </View>
                  </View>
                </View>
                <View className='item-card actived'>
                  <View className='container'>
                    <View className='radio-wrapper'>
                      <View className='radio'><View className='radio-center' /></View>
                    </View>
                    <View className='content-wrapper'>
                      <View className='title'>同省(江苏省)</View>
                    </View>
                  </View>
                </View>
              </View>
          }
        </View>
        <View className='baby-feature-wrapper'>
          <View className='header'>
            <View className='title'>宝宝年龄段选择</View>
            <View><Switch color='#FF473A' onChange={this.toggleFeature}/></View>
          </View>
          {
            openFeature &&
              <View className='items-wrapper'>
                <View className='item-card'>
                  <View className='container'>
                    <View className='radio-wrapper'>
                      <View className='radio'><View className='radio-center' /></View>
                    </View>
                    <View className='content-wrapper'>
                      <View className='title'>相同一级阶段</View>
                      <View className='sub-title'>(启蒙1-3岁; 小学)</View>
                    </View>
                  </View>
                </View>
                <View className='item-card actived'>
                  <View className='container'>
                    <View className='radio-wrapper'>
                      <View className='radio'><View className='radio-center' /></View>
                    </View>
                    <View className='content-wrapper'>
                      <View className='title'>相同一级阶段</View>
                      <View className='sub-title'>(启蒙1-3岁; 小学)</View>
                    </View>
                  </View>
                </View>
              </View>
          }
        </View>
      </View>
    )
  }
}