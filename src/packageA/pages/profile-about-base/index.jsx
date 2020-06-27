import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Presenter from "./presenter";
import "./index.scss";

export default class ProfileAbout extends Presenter {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "隐私政策",
    navigationBarBackgroundColor: "#FFFFFF"
  };

  render() {
    return (
      <View>
        <View className='at-article__h1'>关于童年</View>
        <View className='at-article__p'>儿童成长路上会遇到很多路口或者节点，孕育、出生、百天、择校，升学、生病，补课，出行等等，我们也许不是第一次做父母，但孩子们一定是第一次成长，孩子成长过程中，我们会遇到很多茫然，无助，很多的不知所措，童年以社区为基础，聚焦0-18周岁儿童成长，我们本着真实、平等、善良、美好的价值观，为家长打造服务于美好童年的，一站式服务平台，提供包括且不限于成长记录、教育、健康、饮食、亲子游、家庭理财、购物等等服务，在童年，可以结识“志同道合”的盟友们，大家一起陪娃慢慢成长。</View>
        <View className='at-article__p'>即刻开始，加入童年，美好童年，翘首可及。</View>
      </View>
    )
  }
}
