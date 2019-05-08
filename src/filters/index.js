exports.formatters = (value) => {
  if(value!=null){
  var str1=value.toString();//截取后5位
  var _id=str1.substring(value.length-5,value.length)
  return _id
  }
};

exports.file_Cut = (str) => {
  var str1=str.toString();
  var _id=str1.substring(str.length-9,str.length)
  return _id;
}

exports.showdata_2 = (value) => {
  if(value!=null) {
    var str1 = value.toString();//截取小数后2位
    var _id = Math.round(str1*100)/100
    return _id;
  }
}
