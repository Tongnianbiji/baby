export default (type)=>{
  switch(type){
    case 3001:
      return '发布了帖子';
      break;
    case 4001:
      return '发布了提问';
      break;
    case 3005:
      return '收藏了帖子';
      break;
    case 4005:
      return '收藏了提问';
      break;
    case 3003:
      return '回复了帖子';
      break;
    case 4003:
      return '回答了提问';
      break;
    case 3008:
      return '赞同了回帖';
      break;
    case 4008:
      return '赞同了答案';
      break;
    case 1001:
      return '加入了圈子';
      break;
    case 2001:
      return '关注了账号';
      break;
  }
}