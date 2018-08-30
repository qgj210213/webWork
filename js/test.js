// $(function(){});

// function test001(){
// 	var hello = "Hello Worrld";
// 	console.log(hello);
// }


/*
   文字列の右側に
   指定の文字,指定長さを埋めます
 */
function paddingright(val, char, n) {
    for (; val.length < n; val += char);
    return val;
}
/*
   「""」 の場false
   「null」 の場false
 */
function isNotEmpty(str) {
    if (str != null && str.length > 0) {
        console.log("not null");
        return true;
    }
    return false;
}

function getDate(){
  // var d =new Date(year, month, day, hours, minutes, seconds, milliseconds);
  var d =new Date();
  console.log(d.getFullYear()+""+d.getMonth()+""+d.getDate()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+""+d.getMilliseconds());
  console.log(d.getUTCMonth());
}
// test001();
// console.log(paddingright("楽天市場"," ",80));
//戻り　1000000000

// テスト文字列空
// console.log(isNotEmpty(null) ? "yes" : "not");

getDate();