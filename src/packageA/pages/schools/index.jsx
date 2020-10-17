import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtInput,AtModal, AtModalHeader, AtModalContent, AtModalAction} from 'taro-ui'
import Presenter from './presenter'
import './index.scss'
import NoData from '@components/no-data'
import { ICONS } from '@common/constant'

export default class SchoolsView extends Presenter {
  render() {
    const {schoolsList,searchValue,showInput} = this.state;
    return (
      <View className='school-vewport'>
        <View className='search-box'>
          <View className='inp-wrapper'>
            <AtInput className='inp' clear={true} placeholder='请输入学校关键字' value={searchValue} onChange={this.handleChange.bind(this)} placeholderClass='placehoder' confirmType='search' onConfirm={this.doSearch.bind(this)} />
            <Image src={ICONS.SEARCH} className='search-icon' />
          </View>
          <View className='cancel-btn' onClick={this.cancelSearch}>取消</View>
        </View>
        <View className='body-wrapper'>
          {
            schoolsList.length ?
            schoolsList.map((item,index) => {
              return (
              <View className='item'>{item.name}</View>
              )
            }) : <NoData></NoData>
          }
        </View>
        <View className='submit-btn-wrap'>
          <View className={['submit-btn']} onClick={this.submitOtherSchool.bind(this)}>提交其他学校</View>
        </View>
          {
            <AtModal isOpened={showInput} onCancel={this.cancelInput.bind(this)} >
              <AtModalHeader>提交新的学校</AtModalHeader>
              { showInput &&
                <AtInput placeholder="请输入学校名称" value={searchValue} onChange={this.handleInput.bind(this)}></AtInput>
              }
              
               
              
              <AtModalAction> <Button onClick={this.cancelInput.bind(this)}>取消</Button> <Button onClick={this.confirmInput.bind(this)} style={{color:'#FF473AFF'}}>确定</Button> </AtModalAction>
            </AtModal>
          }
       
        
      </View>
    )
  }
}