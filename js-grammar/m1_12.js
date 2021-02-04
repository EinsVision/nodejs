// 객체 Object
var members = ['jcdlove', 'japan man', 'zeiss'];
console.log(members[1]);

// 반목문 - 배열
var i = 0;
while(true){
    if(i<members.length){
        console.log('배열: ', members[i]);
    }
    else{
        break;
    }
    i++;
} 



var roles = {
    'programmer': 'jcdlove', // key value
    'designer' :'japan man',
    'manager' : 'zeiss'
};

// 반복문 - 객체
var d = 0;
for (var name in roles){ // key 를 얻는다. value를 얻는다.
    console.log('key: ',name, 'value: ', roles[name]);
}

// 객체는 고유한 이름을 넣어야 한다.
console.log(roles.designer);

