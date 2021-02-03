function a(){
    console.log('A');
}

var b = function(){
    console.log('B');
}

// javascript에서 함수는 값이다.

function slowFunc(callback){
    callback(); // a();
}

slowFunc(b);

// a();
// b();