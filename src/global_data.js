const __tn_global_data = {}

export function setGlobalData(key, value) {
  // console.log(key, value, 'set global daa')
  __tn_global_data[key] = value
}

export function getGlobalData(key) {
  // console.log(__tn_global_data[key], '__tn_global_data[key]')
  return __tn_global_data[key]
}