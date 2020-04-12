import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import NoticeCard from '../../../common/components/notice-card'
import './index.scss'

export default class QAListView extends Presenter {
  config = {
    navigationBarTitleText: '问答'
  }

  render() {
    return (
      <View className='qa-list-vewport'>
        {
          [
            {id: 1, name: '张三', msg: '同问', refrence: '济阳三村幼儿园什么时候开学啊', time: '04/11'},
            {id: 2, name: '李四', msg: '应该是明天吧', refrence: '济阳三村幼儿园什么时候开学啊', time: '04/08'},
            {id: 3, name: '赵老六', msg: '等疫情真过去再说吧', refrence: '济阳三村幼儿园什么时候开学啊', time: '04/11'}
          ].map(item => {
            return (
              <NoticeCard key={item.id} data={item} type='qa' />
            )
          })
        }
      </View>
    )
  }
}