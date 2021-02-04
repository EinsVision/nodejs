// 객체지향 array, object
var f = function (){
    console.log(1+1);
    console.log(1+2);
} // 함수 자체가 값이 될 수 있다.

console.log(f());

var a = [f];
a[0]();