import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button,Input } from '@tarojs/components'
import { AtInput,AtModal, AtModalHeader, AtModalContent, AtModalAction} from 'taro-ui'
import Preloading from '@components/preloading'
import Presenter from './presenter'
import { ICONS } from '@common/constant'
import './index.scss'


export default class HospitalsView extends Presenter {
  render() {
    const {hospitalsList,searchValue,showInput,inputValue,showLoading,isToBottom,noResult} = this.state;
    return (
      <View className='school-vewport'>
      <View className='search-box'>
        <View className='inp-wrapper'>
          <Input className='inp' autoFocus={true} clear={true} placeholder='请输入医院关键字' value={searchValue} placeholderClass='placehoder' confirmType='search' onInput={this.doSearch.bind(this)} />
          <Image src={ICONS.SEARCH} className='search-icon' />
        </View>
        <View className='cancel-btn' onClick={this.cancelSearch}>取消</View>
      </View>
      <View className='body-wrapper' style={{paddingBottom:hospitalsList.length ? '295rpx' : '0'}}>
        {
          hospitalsList.length ?
          <View>
            {
              hospitalsList.map((item,index) => {
                return (
                <View className='item' onClick={this.selectItem.bind(this,item.name)}>{item.name}</View>
                )
              }) 
            }
            <Preloading showLoading={showLoading} isToBottom={isToBottom}></Preloading>
          </View>
          : null
        }
      </View>
      {
        (!!hospitalsList.length || noResult) &&
        <View className='submit-btn-wrap'>
          <View className={['submit-btn']} onClick={this.submitOtherHospital.bind(this)}>提交其他医院</View>
        </View>
      }
        {
          <AtModal isOpened={showInput} onCancel={this.cancelInput.bind(this)} >
            <AtModalHeader>提交新的医院</AtModalHeader>
            { showInput &&
              <Input placeholder="请输入医院名称" value={inputValue} onInput={this.handleInput.bind(this)}></Input>
            }
            <AtModalAction> <Button onClick={this.cancelInput.bind(this)}>取消</Button> <Button onClick={this.confirmInput.bind(this)} style={{color:'#FF473AFF'}}>确定</Button> </AtModalAction>
          </AtModal>
        }
    </View>
    )
  }
}