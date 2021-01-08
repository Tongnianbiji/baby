import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './style.scss'

const getMapContent = function (content) {
  console.log(1111, content)
  const p = /_\#\#_(.*?)_\#\#_/g;
  const nodeList = [];
  content.split(/_\#\#_.*?_\#\#_/).forEach(item => {
    if (!!item) {
      nodeList.push({
        value: item,
        type: 'text',
      })
    }
    const pExecRes = p.exec(content);
    if (pExecRes) {
      nodeList.push({
        value: `${JSON.parse(pExecRes[1]).name}`,
        cid: JSON.parse(pExecRes[1]).cid,
        type: 'circle',
      })
    }
  });
  console.log(222, nodeList)

  return nodeList;
}
const navToCircle = function (cid, cname, canNav) {
  if (!canNav) return;
  Taro.navigateTo({
    url: `/packageA/pages/circle-detail/index?cid=${cid}&cname=${cname}`,
  })
}

export const renderCircleReferContent = function (content, canNav = true) {
  return (
    <React.Fragment>
    {getMapContent(content|| '').map(item => (
      item.type == 'circle' ? <View className='item-circle-content' onClick={navToCircle.bind(null, item.cid, item.value, canNav)}>[{item.value}]</View> : <View className='item-text'>{item.value}</View>
    ))}
    </React.Fragment>
  )
}