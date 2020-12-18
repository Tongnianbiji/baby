import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components';
function getAvatarText(text, size='big') {
  const textCount = size == 'big' ? 8 : size == 'middle' ? 4 : 1; 
  let str = text || '';
  str = str.replace(/\s/g, '');
  const tagIndex = str.indexOf('市');
  if (tagIndex > -1 && tagIndex < str.length - 1) {
    str = str.substring(tagIndex + 1, tagIndex + 1 + textCount);
  } else {
    str = str.substring(0, textCount);
  }
  return str;
}
function getFontSize(text, size='big') {
  const textCount = getAvatarText(text).length;
  let fontSize;
  if (size !='big') {
    fontSize = 20;
  } else if (textCount > 5) {
    fontSize = 20
  } else if (textCount > 2) {
    fontSize = 24
  } else {
    fontSize = 28
  }
  return `${fontSize}rpx`;
}
function getAvatar(imgUrl, name, size='big') {
  return (
    <View className='avatar'>
      {imgUrl ? <Image src={imgUrl}></Image> : <Text style={{ fontSize: getFontSize(name, size) }}>{getAvatarText(name,size)}</Text>}
    </View>
  )
}

export default {
  getAvatarText,
  getFontSize,
  getAvatar,
}