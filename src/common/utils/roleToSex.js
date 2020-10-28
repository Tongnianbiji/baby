const maleList = [
  '爸爸',
  '爷爷',
  '外公',
  '干爸',
  '舅舅',
  '其他',
];
const femaleList = [
  '妈妈',
  '奶奶',
  '外婆',
  '干妈',
  '舅妈',
  '其他',
];

export default (role)=>{
  if(maleList.includes(role)){
    return 'MALE'
  }else{
    return 'FEMALE'
  }
}