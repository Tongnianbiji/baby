import Taro from '@tarojs/taro'
import Utils from './utils'

const update = (key, data, success) => {
  Utils.is(success, 'function') ? Taro.setStorage({
    key,
    data,
    success
  }) : Taro.setStorageSync(key, data)
}

class Table {
  constructor(name) {
    this._name = name;
    this._data = Taro.getStorageSync(name) || [];
  }

  _maxId() {
    let lastOne = this._data[(this._data.length || 1) - 1];
    return lastOne ? +lastOne.id : 0
  }

  findById(id) {
    return this._data.filter(item => item.id === id)[0]
  }

  find(key, value) {
    return this._data.filter(item => item[key] === value)[0]
  }

  insert(obj, fn) {
    let id = this._maxId();
    if (Utils.is(obj, 'object')) {
      obj.id = ++id
      this._data.push(obj);
      update(this._name, this._data, fn)
    } else {
      throw new Error('insert obj must a json Object')
    }
  }

  update(id, obj, fn) {
    let found = false;
    if (Utils.is(obj, 'object')) {
      this._data.map(item => {
        if (item.id === id) {
          item = Object.assign(obj, {
            id
          });
          found = true;
        }
      })
      found && update(this._name, this._data, fn)
    } else {
      throw new Error('insert obj must a json Object')
    }
  }

  remove(id, fn) {
    let index;
    this._data.map((d, i) => {
      if (d.id === id) {
        index = i;
      }
      return null;
    })
    index !== undefined && this._data.splice(index, 1);
    update(this._name, this._data, fn)
  }

  removeAll(fn) {
    this._data = [];
    update(this._name, this._data, fn)
  }

  all() {
    return this._data
  }
}

const tableInstance = (() => {
  let _instance = {};
  return name => {
    if (!_instance[name]) {
      _instance[name] = new Table(name);
    }
    return _instance[name]
  }
})()

/**
 * import storage from 'localStorage'
 * const local = storage.getInstance();
 * 
 * #1.
 * const table = local.table('tablename')
 * table.all()
 * table.insert(xxx)
 * 
 * #2.
 * const val = local.getValue('myKey')
 * 
 * #3.
 * local.setValue('myKey', myData)
 * 
 * #4.
 * const val = local.once('myKey')
 */
class Storage {
  table(name) {
    return tableInstance(name)
  }

  once(key) {
    let ret = Taro.getStorageSync(key);
    Taro.removeStorageSync(key);
    return ret
  }

  getValue(key, defaultValue = undefined) {
    return Taro.getStorageSync(key) || defaultValue
  }

  setValue(key, value = '', fn) {
    update(key, value, fn)
  }
}

export default {
  getInstance: (() => {
    let _instance = null;
    return () => {
      if (!_instance) {
        _instance = new Storage();
      }
      return _instance
    }
  })()
}
