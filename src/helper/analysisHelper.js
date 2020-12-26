import Taro from '@tarojs/taro'
class AnalysisHelper {
  exposure(trackData = {}) {
    // 事件名且事件类型相同将2秒内的调用合并为一条上报
    // 注：事件名相同时参数也要相同，否则只取第一个调用者的参数
    const queueKey = `trackList_${trackData.trackName}_${trackData.contentType}`;
    const queueIimerKey = `${queueKey}_timer`;
    this[queueKey] = this[queueKey] || [];
    this[queueKey].push(trackData);

    clearTimeout(this[queueIimerKey]); // 2秒内重复调用将清空定时器
    this[queueIimerKey] = setTimeout(() => {
      if (this[queueKey].length == 0) return;

      const contentIdList = [];
      this[queueKey].forEach(item => {
        contentIdList.push(...item.contentIdList);
      });

      // 合并上报
      Taro.getApp().sensors.track('exposure', {
        ...this[queueKey][0],
        contentIdList,
      });
      this.[queueKey] = []; // 清空队列
    }, 2000);
  }
  setCommonData(commonData = {}) {
    Taro.getApp().sensors.registerApp(commonData);
  }
}

const analysisHelper = new AnalysisHelper();
export default analysisHelper;
