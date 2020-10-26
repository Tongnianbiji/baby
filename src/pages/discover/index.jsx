import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image, ScrollView, Text } from '@tarojs/components'
import Presenter from './presenter'
import { ICONS } from '../../common/constant'
import CircleItem from './circle-item'
import { observer, inject } from 'mobx-react'
import './index.scss'

@inject('staticDataStore')
@observer
export default class Index extends Presenter {
  render() {
    const {isGuide} = this.props.staticDataStore
    return (
      <View className='discover-viewport'>
        <View className='search-box'>
          <View className='search-inp' onClick={this.toSearch.bind(this)}>
            <Image src={ICONS.SEARCH} className='search-icon'></Image>
          </View>
        </View>
        <View className='content-box'>
          <View className='left-wrapper'>
            <ScrollView style={{ height: '100%' }} scrollY>

              <View className={`menu-item${this.state.activedMenu.sid === 'r1' ? ' actived' : ''}`} onClick={this.menuClick.bind(this, this.state.r1Menu)}>
                      {'推荐'}
                      {this.state.activedMenu.sid === 'r1' ? <View className='actived-bar'></View> : null}
              </View>
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
            {
              this.state.activedMenu.sid !== 'r1' && 
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
            }
            <View className='list-layout'>
              <View className='data-list'>
                <ScrollView style={{ height: '100%' }} scrollY>
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
        {
          isGuide ?
          this.guide() : null
        }
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
