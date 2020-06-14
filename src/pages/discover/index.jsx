import Taro from '@tarojs/taro'
import { View, Image, ScrollView, Text } from '@tarojs/components'
import Presenter from './presenter'
import { ICONS } from '../../common/constant'
import CircleItem from './circle-item'
import './index.scss'

export default class Index extends Presenter {
  config = {
    navigationBarTitleText: '发现'
  }

  render() {
    return (
      <View className='discover-viewport'>
        <View className='search-box'>
          <View className='search-inp' onClick={this.toSearch}>
            <Image src={ICONS.SEARCH} className='search-icon'></Image>
          </View>
        </View>
        <View className='content-box'>
          <View className='left-wrapper'>
            <ScrollView style={{ height: '100%' }} scrollY>
              {
                this.state.menus.map(m => {
                  const isActived = m.sid === this.state.activedMenu.sid;
                  return (
                    <View key={m.sid} className={`menu-item${isActived ? ' actived' : ''}`} onClick={this.menuClick.bind(this, m)}>
                      {m.name}
                      {isActived ? <View className='actived-bar'></View> : null}
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
          <View className='right-wrapper'>
            <View className='tags-pane'>
              <ScrollView scrollX >
                <View className='targs-pane-view' >
                  {
                    this.state.tags.map(t => {
                      const isActive = t.sid === this.state.activedTag.sid;
                      return (
                        <View key={t.sid} className={`tag-item${isActive ? ' tag-actived' : ''}`} onClick={this.tagsClick.bind(this, t)}>{t.name}</View>
                      )
                    })
                  }
                </View>
              </ScrollView>
              <Image className='arrow-right-icon' src={ICONS.ARROW_RIGHT_B} />
            </View>

            <View className='list-layout'>
              <View className='data-list'>
                <ScrollView style={{ height: '100%' }}>
                  {
                    this.state.circles.map(n => {
                      return (
                        <CircleItem key={n.cid} {...n} />
                      )
                    })
                  }
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  /**
   * 分享
   */
  onShareAppMessage() {
    return this.setShareOptions()
  }
}
