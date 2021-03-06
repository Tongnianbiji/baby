/**
 * 常量
 */
import ISFAVORITED from '@ass/img/favorited.png';
import COPY from '@ass/img/copy.png';
import WARNING from '@ass/img/warning.png'
import EDIT from '@ass/img/edit.png'
import IMG from '@ass/img/img.png'
import NODATA from '@ass/img/no-data.png'
import DELETE from '@ass/img/delete1.png'
import USER from '@ass/img/user.png'
import DROP from '@ass/img/drop.gif'
import ADD from '@ass/img/add.png'
import BACK from '@ass/img/back.png'
import BLOCK from '@ass/img/block.png'
import NETERROR from '@ass/img/neterror.svg'
import SYSTEM from '@ass/img/system_icon.png'
import SCHOOL from '@ass/img/school_icon.png'
import Link from '@ass/img/icon-link.png'

export const ICONS = {
  SHARE_BTN_GRAY: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/share-c.png',

  FEMALE_ICON: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/female.png',

  MALE_ICON: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/male.png',

  PREVIEW: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/preview.png',

  COMMENT: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/comment.png',

  FAVORITE: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/favorite.png',

  SEARCH: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/search.png',

  ARROW_DOWN: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/down.png',

  ARROW_UP: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/collapse.png',

  CLOSE_BTN: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/cancel-a.png',

  DELETE1: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/delete.png',

  ARROW_RIGHT_C: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-a.png',

  ARROW_RIGHT_B: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/right-b.png',

  ARROW_RIGHT_P: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/p-right.png',

  DISLIKE: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/dislike.png',

  FULLDISLIKE:'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/dislike_2.png',

  FULLLIKE: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/like_2.png',

  LIKE: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/like.png',


  PLOT: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/home_icon.png',
  ISFAVORITED: ISFAVORITED,
  COPY: COPY,
  WARNING: WARNING,
  EDIT:EDIT,
  IMG:IMG,
  NODATA:NODATA,
  DELETE:DELETE,
  USER:USER,
  DROP:DROP,
  ADD:ADD,
  BACK:BACK,
  BLOCK: BLOCK,
  NETERROR: NETERROR,
  SYSTEM,
  SCHOOL,
  Link,
}



/**
 * 分享信息
 */
export const SHAREOPTIONS = {
  title: '童年',
  path: 'pages/index/index', //转发的路径
  imageUrl: 'https://tongnian-image.oss-cn-shanghai.aliyuncs.com/logo-b.png',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
}

/**
 * 高德api key
 */
export const GMAP_API_KEY = 'ca2421a75ca2a312bbce4cdc9095e3d1'

/**
 * 当前正被选中的城市, 在LocalStoreage中的Key
 */
export const CURRENT_CITY_KEY = 'key_current_city'
export const CURRENT_LOCATION_INFO = 'key_current_location'
export const IS_COLLECT_MINI = 'is_collent_mini'

export const USER_INFO_KEY = '__TN_USER_INFO_'
export const USER_INFO_KEY_USERID = '__TN_USER_INFO_USERID'

export const ERR_MSG = '获取数据异常，请稍后再试';