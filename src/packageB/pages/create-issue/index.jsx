import Taro from '@tarojs/taro'
import { View, Textarea, ScrollView, Image } from '@tarojs/components'
import PhotoPicker from '@components/photo-picker'
import Presenter from './presenter'

import './index.scss'

export default class CreateIssueView extends Presenter {
  config = {
    navigationBarTitleText: ''
  }

  render() {
    const { content, showTip, tagList, selectedTag, canSave } = this.state
    return (
      <View className='create-issue-view'>
        <View className='input-wrapper'>
          <Textarea
            value={content}
            onInput={this.contentInput}
            className='content'
            placeholder='热心家长们会帮你解答哦~'
          ></Textarea>
          {
            showTip &&
            <View className='tip'>
              <View>1.请尽量保持文字简洁</View>
              <View>2.高质量的提问，有利于尽快被解答</View>
              <View>3.确保问题没有被重复提问过</View>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png' className='btn-close' onClick={this.hideTip} />
            </View>
          }
        </View>
        <View className='photo-picker-wrapper'>
          <PhotoPicker />
        </View>
        <View className='tag-tips'>＋添加一个问题类别，可以确保问题被及时回复</View>
        <View className='tag-wrapper'>
          <View className='scroll-wrapper'>
            <View className='scroll-wrapper'>
            <ScrollView scrollX>
              <View className='tag-list'>
                {
                  tagList.map(item => (
                    <View key={item.tagId} className={`tag-item${selectedTag.includes(item.tagId) ? ' actived' : ''}`} onClick={this.tagClick.bind(this, item.tagId)}>{item.tagName}</View>
                  ))
                }
              </View>
            </ScrollView>
            <View className='right-arrow'>
              <Image className='arrow-icon' src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-b.png' />
            </View>
          </View>
          </View>
        </View>
        <View className='btn-wrapper'>
          <View className={`btn-save${canSave ? '' : ' can-not-save'}`} onClick={this.doSubmit.bind(this)}>提交</View>
        </View>
      </View>
    )
  }
}