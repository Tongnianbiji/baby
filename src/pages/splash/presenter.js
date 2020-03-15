import Taro from '@tarojs/taro'
import BaseComponent from '../../common/baseComponent'
// import Model from './model'

export default class SplashPresenter extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Taro.getSetting().then(res => {
      if (!res.authSetting['scope.userLocation']) {
        Taro.authorize({
          scope: 'scope.userLocation'
        }).then(() => {
          this.doLocation()
        }, reason => {
          console.log(reason, 'reason...')
        })
      } else {
        this.doLocation()
      }
    }, reason => {
      console.log(reason, 'rejected')
    })
  }

  doLocation() {
    Taro.getLocation().then(res => {
      console.log(res, 'location eded...')
    })
  }
}
