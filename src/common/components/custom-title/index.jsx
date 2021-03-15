import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import {ICONS} from '@common/constant'
import HomeIcon from '@ass/img/home.png'
import './styles.scss'


export default class BehaviorCard extends Component {
  static defaultProps = {
    title:'微信',
    isCanEntranceCircle:true,
    isShowBack:true,
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

  goHome =()=>{
    Taro.switchTab({
      url:'/pages/index/index'
    })
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
   const {title,isCanEntranceCircle,isShowBack} = this.props;
   const {statusBarHeight} = this.state
    return (
      <React.Fragment>
        <View style={{ height: `${statusBarHeight * 2}px`,paddingTop: '40rpx' }}></View>
        <View className="wrapper-custom" style={{ height: `${statusBarHeight * 2}px` }}>
          {
            isShowBack ?
              <Image className="wrapper-custom-back" src={ICONS.BACK} onClick={this.goBack.bind(this)}></Image>
              :
              <Image className="wrapper-custom-back" src={HomeIcon} onClick={this.goHome.bind(this)}></Image>
          }
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
      </React.Fragment>
    )
  }
}