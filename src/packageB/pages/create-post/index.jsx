import Taro from '@tarojs/taro'
import { View, Input, Textarea, ScrollView, Image } from '@tarojs/components'
import Presenter from './presenter'

import PhotoPicker from './components/photoPicker'

import './index.scss'

export default class CreatePostView extends Presenter {
  config = {
    navigationBarTitleText: ''
  }

  render() {
    const { canSave, name, content, tagList, selectedTag, showTip } = this.state
    return (
      <View className='create-post-view'>
        <View className='input-wrapper'>
          <Input className='title' value={name} placeholder='请输入标题(至少5个字)' onInput={this.nameInput} />
          <Textarea
            value={content}
            onInput={this.contentInput}
            className='content'
            placeholder='请输入高质量的帖子，可以更高效进行交流~(至少5个字)'
          ></Textarea>
          {
            showTip &&
            <View className='tip'>
              <View>1.请尽量保持文字简洁</View>
              <View>2.确保问题没有被重复提讨论过</View>
              <Image src='https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png' className='btn-close' onClick={this.hideTip} />
            </View>
          }
        </View>
        <View className='photo-picker-wrapper'>
          <PhotoPicker />
        </View>
        <View className='tag-tips'>＋添加至少一个帖子类别，可以确保问题被及时回复</View>
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