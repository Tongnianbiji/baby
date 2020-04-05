import Taro from '@tarojs/taro'
import {View, Input, Image} from '@tarojs/components'
import {AtTabs, AtTabsPane} from 'taro-ui'
import Presenter from './presenter'
import {ICONS} from '../../../common/constant'
import {SearchResultType} from '../../../common/enums'
import DefaultPanel from './default-panel'
import SearchResultCard from './result-group-card'
import CircleCard from '../../../common/components/circle-card'
import PostCard from '../../../common/components/post-card'
import TitleBarInCard from './title-bar-in-card'
import CreateCircle from './no-data-card'
import UserInfoCard from '../../../common/components/user-card'
import './styles.scss'

export default class HomeSearchView extends Presenter {
  config = {
    navigationBarTitleText: '搜索'
  }

  render() {
    const { currentTopTab } = this.state;
    return (
      <View className='home-search-viewport'>
        <View className='search-box'>
          <View className='inp-wrapper'>
            <Input className='inp' placeholder='请输入关键字' placeholderClass='placehoder' confirmType='search' onConfirm={this.onSearch} />
            <Image src={ICONS.SEARCH} className='search-icon' />
          </View>
          <View className='cancel-btn'>取消</View>
        </View>
        {
          this.state.searchData ?
          <AtTabs tabList={this.state.tabList} className='tabs' current={currentTopTab} onClick={this.topTabChange}>
            <AtTabsPane index={0} className='tabs-pane' current={currentTopTab}>
              {
                currentTopTab === 0 &&
                [
                  {type:SearchResultType.CIRCLE, id: '12423'},
                  {type:SearchResultType.POST, id: '34234'},
                  {type:SearchResultType.ANSWER, id: '54334'},
                ].map(item => {
                  return (<SearchResultCard type={item.type} key={item.id} onMore={this.onMore} />)
                })
              }
            </AtTabsPane>
            <AtTabsPane index={1} className='tabs-pane' current={currentTopTab}>
              {
                currentTopTab === 1 &&
                [1,2,3,4,5,6].map(n => {
                  return (
                    <PostCard closeRelease key={n}>
                      {
                        n === 1 ? <TitleBarInCard /> : null
                      }
                    </PostCard>
                  )
                })
              }
              <CreateCircle />
            </AtTabsPane>
            <AtTabsPane index={2} className='tabs-pane' current={currentTopTab}>
              {
                currentTopTab === 2 &&
                [1,2,3,4,5,6].map(n => {
                  return (
                    <PostCard needShared closeRelease key={n} isAnwser>
                      {
                        n === 1 ? <TitleBarInCard title='问答列表' /> : null
                      }
                    </PostCard>
                  )
                })
              }
              <CreateCircle />
            </AtTabsPane>
            <AtTabsPane index={3} className='tabs-pane' current={currentTopTab}>
              {
                currentTopTab === 3 &&
                [1,2,3,4,5,6].map(n => <CircleCard key={n} />)
              }
              <CreateCircle />
            </AtTabsPane>
            <AtTabsPane index={4} className='tabs-pane' current={currentTopTab}>
              {
                currentTopTab === 4 &&
                [1,2,3,4,5,6].map(n => <UserInfoCard key={n} />)
              }
            </AtTabsPane>
          </AtTabs> :
          <DefaultPanel />
        }
      </View>
    )
  }
}