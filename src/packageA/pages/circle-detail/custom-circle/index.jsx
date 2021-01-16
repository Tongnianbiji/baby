import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {View, Switch, Image,RadioGroup,Radio,Label} from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Model from '../model'
import './index.scss'

const ICON_CLOSE = 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/add-a.png'

const mock = [
  { data: [{title: '备孕'}, {title: '孕早期(1-3个月)'}, {title: '孕早期(4-6个月)'}, {title: '孕早期(7-10个月)'}] },
  { data: [{title: '1岁'}, {title: '2岁'}, {title: '3负'}, {title: '幼儿园小班'}, {title: '幼儿园中班'}, {title: '幼儿园大班'}] },
  { data: [{title: '一年级'}, {title: '二年级'}, {title: '三年级', actived: true}, {title: '四年级'}, {title: '五年级'}, {title: '六年级'}] },
  { data: [{title: '初中一年级'}, {title: '初中二年级'}, {title: '初中三年级'}, {title: '商中一年级'}, {title: '高中二年级'}] }
]

let openArea=false;
let openFeature=false;

@inject('circleDetailStore')
@observer
export default class CustomCircle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      regionValue: 0,
      groupValue: 0,
    }
    this.circleDetailStore = this.props.circleDetailStore;
  }

  updateCostomConfig = async (params)=>{
    return await Model.configCustom(params)
  }

  toggleArea = async (d) => {
    this.setState({
      openArea: d.detail.value
    });
    this.circleDetailStore.updateCustomRegionFlag(d.detail.value);
    let res = await this.updateCostomConfig({
      defaultRegionFlag:d.detail.value
    })
    if(!res){
      setTimeout(()=>{
        this.circleDetailStore.updateCustomRegionFlag(!d.detail.value);
      },500)
    }
  }

  toggleFeature = async ({ detail: { value = false } }) => {
    this.setState({
      openFeature: value
    });
    this.circleDetailStore.updateCustomAgeGroupFlag(value);
    let res = await this.updateCostomConfig({
      defaultGroupFlag:value
    })
    if(!res){
      setTimeout(()=>{
        this.circleDetailStore.updateCustomAgeGroupFlag(!value);
      },500)
    }
  }

  selectRegion = (value)=>{
    this.updateCostomConfig({
      defaultRegion:value
    })
    this.setState({
      regionValue: value,
    })
  }

  selectGroup = (value)=>{
    this.updateCostomConfig({
      defaultGroup:value
    })
    this.setState({
      groupValue: value,
    })
  }

  getFlag = (flag)=>{
    return(flag)
  }

  render() {
    const {customConfig:{
      defaultRegionFlag,
      defaultGroupFlag,
      defaultGroup,
      defaultRegion,
      firstGroup,
      secondGroup,
      province,
      city,
      country
    }} = this.circleDetailStore;
    let region = [
      {
        text:province,
        value:1,
      },
      {
        text:city,
        value:2,
      },
      {
        text:country,
        value:3,
      }
    ];
    let ageGroup = [
      {
        text:firstGroup,
        value:1,
      },
      {
        text:secondGroup,
        value:2,
      },
    ];
    return (
      <View className='custom-circle-view'>
        <View className='poster-area-wrapper'>
          <View className='header'>
            <View className='title'>内容发布者区域</View>
            <View><Switch color='#04BE02' className="switch-size" checked={defaultRegionFlag} onChange={this.toggleArea}/></View>
          </View>
          {
            defaultRegionFlag &&
            <RadioGroup className='radio-list'>
              {region.map((item, i) => {
                return (
                  <Label className='radio-list__label' style="margin-right: 10px;" for={i} key={i}>
                    <Radio className='radio-list__radio' onClick={this.selectRegion.bind(this, item.value)} style="font-size:13px" color="#FF473A" value={item.value} checked={item.value === (this.state.regionValue||defaultRegion)}>{item.text}</Radio>
                  </Label>
                )
              })}
            </RadioGroup>
          }
        </View>
        <View className='baby-feature-wrapper'>
          <View className='header'>
            <View className='title'>宝宝年龄段选择</View>
            <View><Switch color='#04BE02' className="switch-size" checked={defaultGroupFlag} onChange={this.toggleFeature}/></View>
          </View>
          {/* {
            defaultGroupFlag &&
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
          } */}

          {
            defaultGroupFlag &&
            <RadioGroup className='radio-list'>
              {ageGroup.map((item, i) => {
                return (
                  <Label className='radio-list__label' style="margin-right: 10px;" for={i} key={i}>
                    <Radio className='radio-list__radio' onClick={this.selectGroup.bind(this, item.value)} color="#FF473A" value={item.value} checked={item.value === (this.state.groupValue || defaultGroup)}><View style="width:150px;">{item.text}</View></Radio>
                  </Label>
                )
              })}
            </RadioGroup>
          }
        </View>
      </View>
    )
  }
}