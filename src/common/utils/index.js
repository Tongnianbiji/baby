export default {
  is(param, type) {
    let first, rest;
    type = type.toString();
    first = type.substring(0, 1).toUpperCase();
    rest = type.substring(1).toLocaleLowerCase();
    type = first + rest; //大写首字母
    return '[object ' + type + ']' === Object.prototype.toString.call(param);
  }
}