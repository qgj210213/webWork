// ecl_array.js（26.256KB）
// https://github.com/wealandwoe/ecl_array.js
// encoding.js（221.71KB）
// https://github.com/polygonplanet/encoding.js
//
// 上記のどちらかを使う
// 比較記事：http://qiita.com/weal/items/3b3ddfb8157047119554
//
// saveAs関数 は FileSaver.js
// https://github.com/eligrey/FileSaver.js/

var saveShiftJisCSV = function(csvStr, csvFileName){
  // encoding.js
  // var str_array = Encoding.stringToCode(csvStr);
  // var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
  // var uint8_array = new Uint8Array(sjis_array);
  
  // ecl_array.js
  var str_array = ECL.charset.Unicode.parse(csvStr);
  var sjis_array = ECL.charset.convert_array(str_array, "SJIS");
  var uint8_array = new Uint8Array(sjis_array);
  
  var blob = new Blob([uint8_array], { type: "text/csv;" });
  saveAs(blob, csvFileName);
};

var csv = 'id,name,comment\n1,あああ,いいい\n2,ううう,えええ';
saveShiftJisCSV(csv, "test.csv");

