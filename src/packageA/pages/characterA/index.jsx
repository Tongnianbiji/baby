import Taro from '@tarojs/taro'
import React from 'react'
import { AtTabs, AtTabsPane, AtList, AtListItem, AtSwipeAction } from 'taro-ui'
import { View, Input, RadioGroup, Radio, Picker, Image, Text, Button } from '@tarojs/components'
import Presenter from './presenter'
import './index.scss'
import { ICONS } from '@common/constant'


export default class CharacterA extends Presenter {

  render() {
    const { canSave, subTabsCurrent } = this.state;
    return (
      <View className='characterA-viewport'>
        <View className='banner-wrapper' />

        <View className='top-tabs-wrapper'>
          {this.renderTopTabs()}
        </View>

        <View className='next-btn-wrapper'>
          <Button openType="getUserInfo" className={['next-btn', canSave ? 'active' : null]} onGetUserInfo={this.nextStep.bind(this)}>下一步</Button>
          {
            subTabsCurrent != 2 && <View className='next-tips'>完善宝宝信息，结识同道家长，获取更精准的优质内容</View>
          }
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
    let { subTabs, subTabsCurrent, topTabsCurrent } = this.state;
    topTabsCurrent === 2 && (subTabs = subTabs.slice(0, 2));
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
    const { showCharacterSpecial, babyList, topTabsCurrent, role } = this.state;
    return (
      <View>
        {
          topTabsCurrent === 2 &&
          <View className='baby-item-special'>
            <View className='item-group-special'>
              {/* <View className='item-title'>选择角色</View> */}
              <View className='item-content select-item' onClick={this.selectRole.bind(this)}>
                <View>
                  <View className='width-100' style={{ fontSize: '14px' }}>请选择角色</View>
                </View>
                <View>
                  <Text style={{ fontSize: '14px' }}>{role}</Text>
                  <Image className="right-a" src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png'></Image>
                </View>
              </View>
            </View>
          </View>
        }
        {
          babyList.map(item => (
            <View style={{ position: 'relative' }}>
              <View>
                {
                  babyList.length > 1 ?
                    <Image src={ICONS.DELETE} className='btn-remove' onClick={this.handleDeleteBaby.bind(this, item.id)} />
                    : null
                }

                <View className='baby-item'>
                  <View className='item-group'>
                    <View className='item-title'>宝宝性别</View>
                    <View className='item-content flex-around'>
                      <View className={['content-item', item.babySex === 1 ? 'active' : null]} onClick={this.selectSex.bind(this, item, 1)}>小王子</View>
                      <View className={['content-item', item.babySex === 2 ? 'active' : null]} onClick={this.selectSex.bind(this, item, 2)}>小公举</View>
                    </View>
                  </View>
                  <View className='item-group'>
                    <View className='item-title'>宝宝出生日期</View>
                    <View className='item-content'>
                      <Picker mode='date' value={item.bornDate} onChange={this.onDateChange.bind(this, item)} className='content-item width-100'>
                        <View>
                          {item.bornDate}
                        </View>
                      </Picker>
                    </View>
                  </View>
                  <View className='item-group'>
                    <View className='item-title'>宝宝小名</View>
                    <View className='item-content'>
                      <Input className='content-item width-100 text-align-center' style="text-align:center;" onInput={this.onInputBabyName.bind(this, item)} value={item.babyName} placeholder='请填写宝宝小名' />
                    </View>
                  </View>

                  <View className='item-group'>
                    <View className='item-title'>宝宝学校</View>
                    <View className='item-content select-item' onClick={this.selectSchool.bind(this,item.id)}>
                      <View>
                        { !item.babySchool ?
                          <View className='width-100' style={{ fontSize: '14px' }}>请选择宝宝所在学校</View>
                          :
                          <View className='width-100' style={{ fontSize: '14px' }}>{item.babySchool}</View>
                        }
                      </View>
                      <View>
                        <Image className="right-a" src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png'></Image>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))
        }

        <View className='baby-item-btn' onClick={this.addBaby.bind(this)}>+家有多宝</View>
      </View>
    )
  }

  /**
   * 孕育、备孕
   */
  renderPregnancy() {
    const { pregnancyBornDate, lastMenstruation, showCalc, showCalcPartOne, subTabsCurrent, babyChecked, showCalcPartTwo, preHospital, babyRadioList, topTabsCurrent, role,menstruationPeriod,menstruationLastingDays } = this.state;
    return (
      <View>
        {
          topTabsCurrent === 2 &&
          <View className='baby-item-special'>
            <View className='item-group-special'>
              <View className='item-title'>选择角色</View>
              <View className='item-content select-item' onClick={this.selectRole.bind(this)}>
                <View>
                  <View className='width-100' style={{ fontSize: '14px' }}>请选择角色</View>
                </View>
                <View>
                  <Text style={{ fontSize: '14px' }}>{role}</Text>
                  <Image className="right-a" src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png'></Image>
                </View>
              </View>
            </View>
          </View>
        }
        <View className='baby-item'>
          { subTabsCurrent === 1 && 
            <View className='item-group'>
              <View className='item-title'>宝宝预计出生日期</View>
              <View className='item-content'>
                <Picker mode='date' onChange={this.onPreBornDateChange.bind(this)} className='content-item width-100'>
                  <View>
                    {pregnancyBornDate}
                  </View>
                </Picker>
              </View>
            </View>
          }
          

          {/* calc part one begin */}
          {
            showCalcPartOne && subTabsCurrent ===1 &&
            <View className='item-group'>
              <View className='item-title'>末次月经时间</View>
              <View className='item-content'>
                <Picker mode='date' onChange={this.onLastMenstruationDateChange.bind(this)} className='content-item width-100'>
                  <View>
                    {lastMenstruation}
                  </View>
                </Picker>
              </View>
              <View className='item-content'>
                <View className='content-item width-100 content-calc' onClick={this.calcPreBornDate.bind(this)}>计算</View>
              </View>
            </View>
          }
          {/* calc part one end */}

          <View className='item-group'>
            {
              subTabsCurrent ===2 &&
              <View>
              <View>
                <View className='item-group'>
                  <View className='item-title'>末次月经时间</View>
                  <View className='item-content'>
                    <Picker mode='date' onChange={this.onLastMenstruationDateChange.bind(this)} className='content-item width-100'>
                      <View>
                        {lastMenstruation}
                      </View>
                    </Picker>
                  </View>
                </View>
                <View className='item-group'>
                  <View className='item-title'>月经周期</View>
                  <View className='item-content'>
                    <View className='content-item width-100' style="justify-content:space-between;padding:0 10px;">
                      <Text onClick={this.reduceMenstruationPeriod.bind(this)}>-</Text>
                      <Text>{menstruationPeriod}天</Text>
                      <Text onClick={this.addMenstruationPeriod.bind(this)}>+</Text>
                    </View>
                  </View>
                </View>
                <View className='item-group'>
                  <View className='item-title'>月经持续天数</View>
                  <View className='item-content'>
                    <View className='content-item width-100' style="justify-content:space-between;padding:0 10px;">
                      <Text onClick={this.reducemenstruationLastingDays.bind(this)}>-</Text>
                      <Text>{menstruationLastingDays}天</Text>
                      <Text onClick={this.addMenstruationLastingDays.bind(this)}>+</Text>
                    </View>
                  </View>
                  {/* <View>
                    <View className='item-content'> 
                      <Input className='content-item width-100 text-align-center' onInput={this.onInputMenstruationLastingDays.bind(this)} value={menstruationLastingDays} placeholder='请填月经持续天数' />
                    </View>
                  </View> */}
                </View>
              </View>
              </View>
            }
            {/* calc part two end */}

            {/* calc begin */}
            {
              showCalc && subTabsCurrent ===1 &&
              <View className='item-content flex-center'>
                <View className='content-item active mt-35' onClick={this.onClickForCalc.bind(this)}>预产期计算</View>
              </View>
            }
            { subTabsCurrent ===1 &&
              <View className='item-group' style="border-bottom:none">
                <View className='item-title'>计划生产医院</View>
                <View>
                  <View className='item-content select-item' onClick={this.selectHospital.bind(this)}>
                    <View>
                      { !preHospital ?
                        <View className='width-100' style={{ fontSize: '14px' }}>请选择计划生产医院</View>
                        :
                        <View className='width-100' style={{ fontSize: '14px' }}>{preHospital}</View>
                      }
                    </View>
                    <View>
                      <Image className="right-a" src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png'></Image>
                    </View>
                  </View>
                </View>
              </View>
            }
            {/* calc end */}

            {/* 去掉 begin */}
            <View className='item-content'>
              <RadioGroup className='width-100 radio-group'>
                {
                  subTabsCurrent === 1 ?
                    babyRadioList.map((item, index) => {
                      return <Radio onClick={this.selectPregnancyBaby.bind(this, item.value)} key={index} color='#ff473a' value={item.value} checked={babyChecked === item.value}>{item.title}</Radio>
                    })
                    : null
                }
              </RadioGroup>
            </View>
            {/* 去掉 end */}
          </View>
        </View>
      </View>
    )
  }
}
