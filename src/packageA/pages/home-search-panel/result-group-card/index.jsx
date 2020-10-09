import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { SearchResultType } from '../../../../common/enums'
import { ICONS } from '../../../../common/constant'
import './styles.scss'

const typeMap = {
  [SearchResultType.ANSWER]: '问答',
  [SearchResultType.CIRCLE]: '圈子',
  [SearchResultType.POST]: '帖子',
  [SearchResultType.ESSENCE]: '精华'
}

export default class SearchResultGroupCard extends Component {
  static defaultProps = {
    type: SearchResultType.CIRCLE,
    kw: '浏阳'
  }

  constructor(props) {
    super(props)
  }

  datas = {
  }

  onMore = () => {
    this.props.onMore(this.props.type)
  }

  renderCircle() {
    return (
      <View className='circle-part-wrapper'>
        <View className='main-infos'>
          <View className='avatar-wrapper'>
            <View className='avatar'></View>
          </View>
          <View className='infos'>
            <View className='title'>
              <View className='txt'>浏阳三村幼儿园</View>
              <View className='btn-join'>加入</View>
            </View>
            <View className='sub-title'>
            简介：济阳三村幼儿园地址位于上海市浦东区耀华路550，是一所公办幼儿园是一所公办幼儿园是一所公办幼儿园
            </View>
          </View>
        </View>
        <View className='numbers'>
          <View className='num'>关注: 2001</View>
          <View className='num'>帖子: 12535</View>
          <View className='num'>问答: 123</View>
        </View>
      </View>
    )
  }

  renderAnswer() {
    return (
      <View className='anwser-part-wrapper'>
        <View className='user-info'>
          <View className='avatar'></View>
          <View className='infos'>
            <View className='name-area'>
              <Text className='name'>李庭语妈妈</Text>
              <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
              <Text className='years-old'>3岁9个月</Text>
            </View>
            <Text className='times'>2020-03-29 21:29:00</Text>
          </View>
        </View>
        <View className='content-wrapper answer-wrapper'>
          <View className='answer'>
            <View className='icon'>问</View>
            <View className='txt'>济阳三村最近可以交娃的社保了吗？</View>
          </View>
          <View className='answer'>
            <View className='icon'>答</View>
            <View className='txt'>可以了，11月以后就可以交了</View>
          </View>
        </View>
        <View className='tags'>
          <View className='community-area'>
            <Text className='community-name'>上海 新城</Text>
          </View>
          <View className='tips'>
            <View className='views'>
              <Image className='img' src={ICONS.PREVIEW} />
              <Text>12</Text>
            </View>
            <View className='comment'>
              <Image className='img' src={ICONS.COMMENT} />
              <Text>12</Text>
            </View>
            <View className='favorite'>
              <Image className='img' src={ICONS.FAVORITE} />
              <Text>12</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderPost() {
    return (
      <View className='post-part-wrapper'>
        <View className='user-info'>
          <View className='avatar'></View>
          <View className='infos'>
            <View className='name-area'>
              <Text className='name'>李庭语妈妈</Text>
              <Image className='sex' src={ICONS.FEMALE_ICON}></Image>
              <Text className='years-old'>3岁9个月</Text>
            </View>
            <Text className='times'>2020-03-29 21:29:00</Text>
          </View>
        </View>
        <Text className='content-wrapper'>济阳三村幼儿园怎么样，算比较好的幼儿园吗？</Text>
        <View className='tags'>
          <View className='community-area'>
            <Text className='community-name'>上海 新城</Text>
          </View>
          <View className='tips'>
            <View className='views'>
              <Image className='img' src={ICONS.PREVIEW} />
              <Text>12</Text>
            </View>
            <View className='comment'>
              <Image className='img' src={ICONS.COMMENT} />
              <Text>12</Text>
            </View>
            <View className='favorite'>
              <Image className='img' src={ICONS.FAVORITE} />
              <Text>12</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View className='ui-search-result-group-card'>
        <View className='title-bar'>
          <View className='title'>
            <View className='kw'>{this.props.kw}</View> - {typeMap[this.props.type]}搜索
          </View>
          <View className='btn-more' onClick={this.onMore}>
            更多
            <Image src={ICONS.ARROW_RIGHT_C} className='more-icon' />
          </View>
        </View>
        {
          this.props.type === SearchResultType.ANSWER ?
            this.renderAnswer() :
            this.props.type === SearchResultType.CIRCLE ?
              this.renderCircle() :
              this.renderPost()
        }
      </View>
    )
  }
}