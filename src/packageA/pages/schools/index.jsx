import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button,Input } from '@tarojs/components'
import { AtInput,AtModal, AtModalHeader, AtModalContent, AtModalAction} from 'taro-ui'
import Presenter from './presenter'
import Preloading from '@components/preloading'
//import NoData from '@components/no-data'
import { ICONS } from '@common/constant'
import './index.scss'


export default class SchoolsView extends Presenter {
  render() {
    const {schoolsList,searchValue,showInput,inputValue,showLoading,isToBottom,noResult} = this.state;
    return (
      <View className='school-vewport'>
        <View className='search-box'>
          <View className='inp-wrapper'>
            <Input className='inp' autoFocus={true} clear={true} placeholder='请输入学校关键字' value={searchValue} placeholderClass='placehoder' confirmType='search' onInput={this.doSearch.bind(this)} />
            <Image src={ICONS.SEARCH} className='search-icon' />
          </View>
          <View className='cancel-btn' onClick={this.cancelSearch}>取消</View>
        </View>
        <View className='body-wrapper' style={{paddingBottom:schoolsList.length ? '295rpx' : '0'}}>
          {
            schoolsList.length ?
            <View>
              {
                schoolsList.map((item,index) => {
                  return (
                    <View className='item' onClick={this.selectItem.bind(this, item.name, item)}>{item.name}</View>
                  )
                }) 
              }
              <Preloading showLoading={showLoading} isToBottom={isToBottom}></Preloading>
            </View>
            : null
          }
        </View>
        {
           (!!schoolsList.length || noResult) && 
           <View className='submit-btn-wrap'>
            <View className={['submit-btn']} onClick={this.submitOtherSchool.bind(this)}>提交其他学校</View>
          </View>
        }
       
          {
            <AtModal isOpened={showInput} onCancel={this.cancelInput.bind(this)} >
              <AtModalHeader>提交新的学校</AtModalHeader>
              { showInput &&
                <Input placeholder="请输入学校名称" value={inputValue} onInput={this.handleInput.bind(this)}></Input>
              }
              <AtModalAction> <Button onClick={this.cancelInput.bind(this)}>取消</Button> <Button onClick={this.confirmInput.bind(this)} style={{color:'#FF473AFF'}}>确定</Button> </AtModalAction>
            </AtModal>
          }
      </View>
    )
  }
}