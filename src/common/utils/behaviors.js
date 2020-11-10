export default (type,tip)=>{
  switch(type){
    case 3001:
      return '发布了帖子';
      break;
    case 4001:
      return '发布了提问';
      break;
    case 3005:
      if(tip){
        return '收藏了你的帖子';
      }else{
        return '收藏了帖子';
      }
      break;
    case 4005:
      if(tip){
        return '收藏了你的提问';
      }else{
        return '收藏了提问';
      }
      break;
    case 3003:
      if(tip){
        return '回复了你的帖子';
      }else{
        return '回复了帖子';
      }
      break;
    case 4003:
      if(tip){
        return '回答了你的提问';
      }else{
        return '回答了提问';
      }
      break;
    case 3008:
      if(tip){
        return '赞同了你的回帖';
      }else{
        return '赞同了回帖';
      }
      break;
    case 4008:
      if(tip){
        return '赞同了你的答案';
      }else{
        return '赞同了答案';
      }
      break;
    case 1001:
      return '加入了圈子';
      break;
    case 2001:
      return '关注了用户';
      break;
  }
}