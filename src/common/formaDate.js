export default function formatDate(date) {
  let newTime = Date.parse(new Date());//获得当前时间，转化时间戳
  let oldTime = Date.parse(date.replace(/-/g, '/'))
  let interval = (newTime - oldTime) / 1000;
  if (interval < 0) {
    return "刚刚";
  }
  else if(interval > 24 * 3600 * 7 * 4 * 12){
    return Math.round((interval / 24 / 3600 / 7 / 4 / 12)) + "年前";
  }
  else if(interval > 24 * 3600 * 7 * 4){
    return Math.round((interval / 24 / 3600 / 7 / 4)) + "月前";
  }
  else if(interval > 24 * 3600 * 7){
    return Math.round((interval / 24 / 3600 / 7)) + "周前";
  }
  else if (interval > 24 * 3600) {
    return Math.round((interval / 24 / 3600)) + "天前";
  }
  else if (interval > 3600) {
    return Math.round((interval / 3600)) + "小时前";
  }
  else if (interval > 60) {
    return Math.round((interval / 60)) + "分钟前";
  }
  else {
    return "刚刚";
  }
}