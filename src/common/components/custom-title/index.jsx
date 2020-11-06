import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import {ICONS} from '@common/constant'
import './styles.scss'


export default class BehaviorCard extends Component {
  static defaultProps = {
    title:'微信',
    isCanEntranceCircle:true,
    onEntrancePage:()=>{}
  }

  constructor(props){
    super(props)
    this.state = {
      statusBarHeight:0
    }
  }

  goBack = ()=>{
    Taro.navigateBack()
  }

  entrancePage = ()=>{
    this.props.onEntrancePage()
  }

  componentDidMount(){
    this.setState({
      statusBarHeight: Taro.getSystemInfoSync()['statusBarHeight']
    })
  }

  render() {
   const {title,isCanEntranceCircle} = this.props;
   const {statusBarHeight} = this.state
    return (
      <View className="wrapper-custom" style={{height:`${statusBarHeight*2}px`}}>
        <Image className="wrapper-custom-back" src={ICONS.BACK} onClick={this.goBack.bind(this)}></Image>
        {
          isCanEntranceCircle ? 
          <View className="wrapper-custom-title" onClick={this.entrancePage.bind(this)}>
            <Text>{title}</Text>
            <Image src={ICONS.ARROW_RIGHT_P}></Image>
          </View>
          : 
          <View className="wrapper-custom-title">
            <Text>{title}</Text>
          </View>
        }
      </View>
    )
  }
}