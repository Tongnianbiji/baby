import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Input, RadioGroup, Radio } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'

export default class CharacterA extends Presenter {
  config = {
    navigationBarTitleText: '选择身份',
  }

  render() {
    return (
      <View className='characterA-viewport'>
        <View className='banner-wrapper' />

        <View className='top-tabs-wrapper'>
          {this.renderTopTabs()}
        </View>

        <View className='next-btn-wrapper'>
          <View className='next-btn'>下一步</View>
          <View className='next-tips'>完善宝宝信息，结识同道家长，获取更精准的优质内容</View>
        </View>
      </View >
    )
  }

  /**
   * top tabs
   */
  renderTopTabs() {
    const { topTabs, topTabsCurrent } = this.state;
    return (
      <AtTabs className='top-tabs' current={topTabsCurrent} tabList={topTabs} swipeable={false} onClick={this.onClickForTopTab.bind(this)}>
        <AtTabsPane current={topTabsCurrent} index={0} >
          {this.renderSubTabs()}
        </AtTabsPane>
        <AtTabsPane current={topTabsCurrent} index={1}>
          {this.renderSubTabs()}
        </AtTabsPane>
        <AtTabsPane current={topTabsCurrent} index={2}>
          {this.renderSubTabs()}
        </AtTabsPane>
      </AtTabs>
    )
  }

  /**
   * sub tabs
   */
  renderSubTabs() {
    const { subTabs, subTabsCurrent } = this.state;
    return (
      <View className='sub-tabs-wrapper'>
        <AtTabs className='sub-tabs' current={subTabsCurrent} tabList={subTabs} swipeable={false} onClick={this.onClickForSubTabs.bind(this)}>
          <AtTabsPane current={subTabsCurrent} index={0} >
            <View>{this.renderParenting()}</View>
          </AtTabsPane>
          <AtTabsPane current={subTabsCurrent} index={1}>
            <View>{this.renderPregnancy()}</View>
          </AtTabsPane>
          <AtTabsPane current={subTabsCurrent} index={2}>
            <View>{this.renderPregnancy()}</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }

  /**
   * 育儿
   */
  renderParenting() {
    const { showCharacterSpecial } = this.state;
    return (
      <View>
        {
          showCharacterSpecial &&
          <View className='baby-item-special'>
            <View className='item-group-special'>
              <View className='item-title'>选择角色</View>
              <View className='item-content'>
                <View className='content-item width-100'>请选择角色</View>
              </View>
            </View>
          </View>
        }
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
        <View className='baby-item-btn'>+家有多宝</View>
      </View>
    )
  }

  /**
   * 孕育、备孕
   */
  renderPregnancy() {
    const { babyList, showCalc, showCalcPartOne, showCalcPartTwo } = this.state;
    return (
      <View>
        <View className='baby-item'>
          <View className='item-group'>
            <View className='item-title'>宝宝预计出生日期</View>
            <View className='item-content'>
              <View className='content-item width-100'>请选择时间</View>
            </View>
          </View>

          {/* calc part one begin */}
          {
            showCalcPartOne &&
            <View className='item-group'>
              <View className='item-title'>末次月经时间</View>
              <View className='item-content'>
                <View className='content-item width-100'>2020-03-29</View>
              </View>
            </View>
          }
          {/* calc part one end */}

          <View className='item-group'>
            {/* calc part two begin */}
            {
              showCalcPartTwo &&
              <View>
                <View className='item-title'>末次月经时间</View>
                <View className='item-content'>
                  <View className='content-item width-100'>28天</View>
                </View>
                <View className='item-content'>
                  <View className='content-item width-100 content-calc'>计算</View>
                </View>
              </View>
            }
            {/* calc part two end */}

            {/* calc begin */}
            {
              showCalc &&
              <View className='item-content flex-center'>
                <View className='content-item active mt-35' onClick={this.onClickForCalc.bind(this)}>预产期计算</View>
              </View>
            }
            {/* calc end */}

            <View className='item-content'>
              <RadioGroup className='width-100 radio-group'>
                {
                  babyList.map((item, index) => {
                    return <Radio key={index} color='#ff473a' value={item.value} checked={item.checked}>{item.title}</Radio>
                  })
                }
              </RadioGroup>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
