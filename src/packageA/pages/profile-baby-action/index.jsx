import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Image, RadioGroup, Radio, Picker, Input, Text } from '@tarojs/components'
import { GENDER_LIST } from '../../../common/enums';
import Presenter from './presenter'
import './index.scss'

export default class ProfileBabyAction extends Presenter {

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
    const {babyNickname, babySchool,babyBorn,sex,grade,gradeSelector} = this.state;
    return (
      <View>
        <View className='item' onClick={this.createBabyNickname.bind(this)}>
          <View className='item-label'>
            <View className='item-txt'>宝宝小名</View>
          </View>
          <View className='item-value'>
            <View className='item-txt'>{babyNickname}</View>
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
                  return <Radio onClick={this.selectBabySex.bind(this,item.value)} key={index} color='#ff473a' checked={item.value === sex} value={item.id}>{item.name}</Radio>
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
            <Picker mode='date' value={babyBorn} onChange={this.onBornDateChange.bind(this)} className='item-txt'>
              <View>
                {babyBorn}
              </View>
            </Picker>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>宝宝所在年级</View>
          </View>
          <View className='item-value'>
            <Picker value={grade} range={gradeSelector} onChange={this.onGradeChange.bind(this)} className='item-txt'>
                <View>
                  {grade}
                </View>
            </Picker>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.selectBabySchool.bind(this)}>
          <View className='item-label'>
            <View className='item-txt'>宝宝所在学校</View>
          </View>
          <View className='item-value'>
            {
              babySchool ? <View className='item-txt'>{babySchool}</View>
              : <View className='item-txt'>请选择</View>
            }
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        {/* <View className='btn-wrapper'>
          <View className='btn flex-center' onClick={this.onClickForCreate.bind(this)}>确认</View>
        </View> */}
        {
        <View className='btn-wrapper'>
          <View className='btn flex-center' onClick={this.onClickForCreate.bind(this)}>确认</View>
        </View>
        }
      </View>
    )
  }

  renderPregnancy() {
    const {checkHospital,planHospital,preBornDate} = this.state;
    return (
      <View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>预产期</View>
          </View>
          <View className='item-value'>
            <Picker mode='date' value={preBornDate} onChange={this.onPreBornDateChange.bind(this)} className='item-txt'>
              <View>
                {preBornDate}
              </View>
            </Picker>
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.selectBabyHospital.bind(this,1)}>
          <View className='item-label'>
            <View className='item-txt'>产检医院</View>
          </View>
          <View className='item-value'>
            {
              checkHospital ? <View className='item-txt'>{checkHospital}</View>
              : <View className='item-txt'>请选择</View>
            }
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        <View className='item' onClick={this.selectBabyHospital.bind(this,2)}>
          <View className='item-label'>
            <View className='item-txt'>计划生产医院</View>
          </View>
          <View className='item-value'>
            {
              planHospital ? <View className='item-txt'>{planHospital}</View>
              : <View className='item-txt'>请选择</View>
            }
            <Image className='item-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png' />
          </View>
        </View>
        {
          <View className='btn-wrapper'>
            <View className='btn flex-center' onClick={this.onClickForCreate.bind(this)}>确认</View>
          </View>
        }
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
            <Input className='item-txt' style="text-align:right" placeholder="请输入"></Input>
            <Text className='item-txt'>天</Text>
          </View>
        </View>
        <View className='item'>
          <View className='item-label'>
            <View className='item-txt'>月经周期</View>
          </View>
          <View className='item-value'>
            <Input className='item-txt' style="text-align:right" placeholder="请输入"></Input>
            <Text className='item-txt'>天</Text>
          </View>
        </View>
        {
          <View>
            <View className='btn-wrapper'>
              <View className='btn flex-center'>确认</View>
            </View>
          </View>
        }
        
      </View>
    )
  }
}
