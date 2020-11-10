var rad = (d)=> {
  return d * Math.PI / 180.0;
}
export default (lat1, lng1, lat2, lng2)=> {
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里

  var distance = s;
  var distance_str = "";

  if (parseInt(distance) >= 1) {
    distance_str = distance.toFixed(1) + "km";
  } else {
    distance_str = distance * 1000 + "m";
  }
  //s=s.toFixed(4);

  console.info('距离是', s);
  console.info('距离是', distance_str);
  return distance_str;
}

