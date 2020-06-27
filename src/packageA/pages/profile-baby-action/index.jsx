import Taro, { Component } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Image } from '@tarojs/components'
import { GENDER_LIST } from '../../../common/enums';
import Presenter from './presenter'
import './index.scss'

export default class ProfileBabyAction extends Presenter {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '新增宝宝',
    navigationBarBackgroundColor: '#FFFFFF',
  }

  render() {
    const { tabs, tabsCurrent } = this.state;

    return (
      <View className='profile-baby-action-viewport'>
        <View className='tabs-container'>
          <AtTabs className='tabs' current={tabsCurrent} tabList={tabs} swipeable={false} onClick={this.onClickForTabs.bind(this)}>
            <AtTabsPane index={0} current={tabsCurrent}>
              {this.renderParenting()}
            </AtTabsPane>
            <AtTabsPane index={1} current={tabsCurrent}>
              {this.renderPregnancy()}
            </AtTabsPane>
            <AtTabsPane index={2} current={tabsCurrent}>
              {this.renderPlanPregnancy()}
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }

  renderParenting() {
    return (
      <View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝小名</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>小福</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝性别</View>
          </View>
          <View className='item-value'>
            <RadioGroup className='width-100 radio-group'>
              {
                GENDER_LIST.map((item, index) => {
                  return <Radio key={index} color='#ff473a' checked={item.id} value={item.id}>{item.name}</Radio>
                })
              }
            </RadioGroup>
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝出生年月</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>2019-06-18</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝所在年级</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>请选择</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝所在学校</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>请输入</View>
            <Image className='item-search' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/search.png' />
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center'>确认</View>
        </View>
      </View>
    )
  }

  renderPregnancy() {
    return (
      <View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>预产期</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>2019-06-18</View>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>产检医院</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>请输入</View>
            <Image className='item-search' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/search.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>计划生产医院</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>请输入</View>
            <Image className='item-search' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/search.png' />
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center'>切换状态</View>
        </View>
      </View>
    )
  }

  renderPlanPregnancy() {
    return (
      <View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>月经持续天数</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>7天</View>

          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>月经周期</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>28天</View>
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className='btn flex-center'>切换状态</View>
        </View>
      </View>
    )
  }
}
