import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import './styles.scss'

const ShareIconUrl = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/share-c.png'
const DetailIconUrl = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/expand.png'

export default class MainInfoPanel extends Taro.Component {
  render() {
    return (
      <View className='main-info-panel'>
        { /* 头像, 名称, 按钮 */ }
        <View className='head'>
          <View className='avatar-wrapper'>
          </View>
          <View className='title'>市光三村幼儿园市光三村幼儿园</View>
          <View className='btn-share'>
            <Image className='img-share' src={ShareIconUrl} />
          </View>
          <View className='btn-attention'>关注</View>
        </View>
        { /* 简介 */ }
        <View className='desc'>
          <View className='txt'>简介：济阳三村幼儿园地址位于上海市杨浦区市光路333号</View>
          <View className='btn'>
            详情
            <Image src={DetailIconUrl} className='icon-right' />
          </View>
        </View>
        {/* 各种数量 */}
        <View className='num-s'>
          <View>关注:2001</View>
          <View>帖子:12535</View>
          <View>问答:123</View>
        </View>
        {/* 圈子列表 */}
        <View className='circle-list'>
          <View className='circle-item' style={{paddingLeft: 0}}>
            <View className='avatar'></View>
            <View className='name'>全部圈子</View>
          </View>
          <View className='btn-all-circle all-circle'>
            12个父圈子
            <Image src={DetailIconUrl} className='icon-right' />
          </View>
          <View className='circle-item'>
            <View className='avatar'></View>
            <View className='name'>济阳二村</View>
          </View>
          <View className='circle-item'>
            <View className='avatar'></View>
            <View className='name'>济阳三村</View>
          </View>
          <View className='circle-item'>
            <View className='avatar'></View>
            <View className='name'>济阳四村</View>
          </View>
          <View className='btn-all-circle'>
            102个子圈子
            <Image src={DetailIconUrl} className='icon-right' />
          </View>
        </View>
        {/* 公告列表 */}
        <Swiper
          className='swiper-style'
          indicatorDots
          circular
          indicatorColor='#D8D8D8'
          indicatorActiveColor='#FF483B'
        >
          <SwiperItem>
            <View className='notice-item'>
              <View className='notice-logo'>置顶</View>
              <View className='notice-txt'>
              【公告】济阳三村幼儿园开学啦济阳三村幼儿园开学啦,济阳三村幼儿园开学啦
              </View>
              <View className='btn-detail'>详情</View>
            </View>
            <View className='notice-item'>
              <View className='notice-logo'>置顶</View>
              <View className='notice-txt'>
              【公告】济阳三村幼儿园开学啦济阳三村幼儿园开学啦,济阳三村幼儿园开学啦
              </View>
              <View className='btn-detail'>详情</View>
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='notice-item'>
              <View className='notice-logo'>置顶</View>
              <View className='notice-txt'>
              【公告】济阳三村幼儿园开学啦济阳三村幼儿园开学啦,济阳三村幼儿园开学啦
              </View>
              <View className='btn-detail'>详情</View>
            </View>
            <View className='notice-item'>
              <View className='notice-logo'>置顶</View>
              <View className='notice-txt'>
              【公告】济阳三村幼儿园开学啦济阳三村幼儿园开学啦,济阳三村幼儿园开学啦
              </View>
              <View className='btn-detail'>详情</View>
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}