import Taro from '@tarojs/taro'
import appSettings from '../../settings'
import localStorage from './localStorage'
import {
  EnvType
} from './enums'

const Hosts = {
  [EnvType.DEVELOPMENT]: 'https://www.tongnian.world',
  [EnvType.PRODUCTION]: 'https://xxx.prod.xxx.com'
}

const reg = /^\//;

const local = localStorage.getInstance()

export default class BaseRequest {
  /**
   * 构造函数
   * @param {*} virtual_path 虚拟目录, 设置之后. 这个实例下所有请求路径中无需再指定
   */
  constructor(virtual_path = 'tn-api') {
    this.host = Hosts[appSettings.ENV];
    this.path = (function () {
      let ret = '';
      if (virtual_path) {
        ret = reg.test(virtual_path) ? virtual_path : `/${virtual_path}`
      }
      return ret
    })()
  }

  _get_header(custom_header_obj, need_token) {
    const header = {
      'content-type': 'application/json'
    }

    if (need_token) {
      // take token by localStore tools
      header['X-TOKEN'] = local.getToken()
    }

    if (custom_header_obj) {
      for (let key in custom_header_obj) {
        header[key] = custom_header_obj[key];
      }
    }

    return header
  }

  _request(url, data, method, head, token) {
    const header = this._get_header(head, token);
    return Taro.request({
      url,
      data,
      method,
      header
    });
  }

  _build_url(schema) {
    let finalPath
    if (!reg.test(schema)) {
      finalPath = `/${schema}`;
    } else {
      finalPath = schema;
    }
    return /^http[s]?\:/.test(schema) ? schema : `${this.host}${this.path}${finalPath}`
  }

  get(path, params, header = {}) {
    let url = this._build_url(path);
    return this._request(url, params, "GET", header).then(res => {
      //do something log;
      return res;
    }).catch(err => {
      //do something log;
      return err;
    });
  }

  getWithToken(path, params, header) {
    let url = this._build_url(path);
    return this._request(url, params, "GET", header, !0).then(res => {
      //do something log;
      return res;
    }).catch(err => {
      //do something log;
      return err;
    });
  }

  post(path, params, header) {
    let url = this._build_url(path);
    return this._request(url, params, "POST", header).then(res => {
      //do something log;
      return res;
    }).catch(err => {
      //do something log;
      return err;
    });
  }

  postWithToken(path, params, header) {
    let url = this._build_url(path);
    return this._request(url, params, "POST", header, !0).then(res => {
      //do something log;
      return res;
    }).catch(err => {
      //do something log;
      return err;
    });
  }

  restfulCcode = 0

  okMsg = 'request:ok'

  standardResponse(wxResponse) {
    if (wxResponse.errMsg === 'request:ok') {
      return wxResponse.data
    }
    return { code: -1, errMsg: wxResponse.errMsg }
  }
}
