import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Input, RadioGroup, Label, Radio } from '@tarojs/components'
import Presenter from './presenter'
import Model from './model'
import './index.scss'

export default class Character extends Presenter {
  config = {
    navigationBarTitleText: '选择身份',
  }

  render() {
    const { topTabsCurrent } = this.state;
    return (
      <View className='character-viewport'>
        <View className='banner-wrapper' />

        <View className='top-tabs-wrapper'>
          <AtTabs className='top-tabs' current={topTabsCurrent} tabList={Model.topTabList} onClick={this.topTabhandleClick.bind(this)}>
            <AtTabsPane current={topTabsCurrent} index={0} >
              {this.renderSubTabs()}
            </AtTabsPane>
            <AtTabsPane current={topTabsCurrent} index={1}>
              <View>Top标签页二的内容</View>
            </AtTabsPane>
            <AtTabsPane current={topTabsCurrent} index={2}>
              <View>Top标签页三的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>

        <View className='next-btn-wrapper'>
          <View className='next-btn'>下一步</View>
          <View className='next-tips'>完善宝宝信息，结识同道家长，获取更精准的优质内容</View>
        </View>
      </View >
    )
  }

  renderSubTabs() {
    const { topTabsCurrent, subTabsCurrent } = this.state;
    return (
      <View className='sub-tabs-wrapper'>
        <AtTabs className='sub-tabs' current={subTabsCurrent} tabList={Model.subTabList} onClick={this.subTabsHandleClick.bind(this)}>
          <AtTabsPane current={subTabsCurrent} index={0} >
            <View>{this.renderParenting()}</View>
          </AtTabsPane>
          <AtTabsPane current={subTabsCurrent} index={1}>
            <View>{this.renderPregnancy()}</View>
          </AtTabsPane>
          <AtTabsPane current={subTabsCurrent} index={2}>
            <View>{this.renderPlanPregnancy()}</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }

  /**
   * 育儿
   */
  renderParenting() {
    return (
      <View>
        <View className='baby-item'>
          <View className='item-group'>
            <View className='item-title'>宝宝性别</View>
            <View className='item-content flex-around'>
              <View className='content-item active'>小王子</View>
              <View className='content-item'>小公举</View>
            </View>
          </View>
          <View className='item-group'>
            <View className='item-title'>宝宝出生日期</View>
            <View className='item-content'>
              <View className='content-item width-100'>请选择时间</View>
            </View>
          </View>
          <View className='item-group'>
            <View className='item-title'>宝宝小名</View>
            <View className='item-content'>
              <Input className='content-item width-100 text-align-center' placeholder='请填写宝宝小名' />
            </View>
          </View>
        </View>
        <View className='baby-item'>
          <View className='item-group'>
            <View className='item-title'>宝宝性别</View>
            <View className='item-content flex-around'>
              <View className='content-item active'>小王子</View>
              <View className='content-item'>小公举</View>
            </View>
          </View>
          <View className='item-group'>
            <View className='item-title'>宝宝出生日期</View>
            <View className='item-content'>
              <View className='content-item width-100'>请选择时间</View>
            </View>
          </View>
          <View className='item-group'>
            <View className='item-title'>宝宝小名</View>
            <View className='item-content'>
              <Input className='content-item width-100 text-align-center' placeholder='请填写宝宝小名' />
            </View>
          </View>
        </View>
        <View className='baby-btn'>+家有多宝</View>
      </View>
    )
  }

  /**
   * 孕育
   */
  renderPregnancy() {
    return (
      <View>
        <View className='baby-item'>
          <View className='item-group'>
            <View className='item-title'>宝宝预计出生日期</View>
            <View className='item-content'>
              <View className='content-item width-100'>请选择时间</View>
            </View>
          </View>
          <View className='item-group'>
            <View className='item-content flex-center'>
              <View className='content-item active mt-35'>预产期计算</View>
            </View>
            <View className='item-content radio-list'>
              <RadioGroup>
                {
                  Model.babyList.map((item, i) => {
                    return (
                      <Label className='radio-list__label' for={i} key={i}>
                        <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.title}</Radio>
                      </Label>
                    )
                  })
                }
              </RadioGroup>
            </View>
          </View>
        </View>
      </View>
    )
  }

  /**
   * 备孕
   */
  renderPlanPregnancy() {
    return (
      <View>备孕</View>
    )
  }
}
