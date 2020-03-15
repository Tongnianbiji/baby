import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Presenter from './presenter'
import './style.scss'

/**
 * this is view layer.
 * just jsx here, because we have presenter layer;
 */
export default class SplashView extends Presenter {
    render() {
        return (
            <View>我是开屏页</View>
        )
    }
}