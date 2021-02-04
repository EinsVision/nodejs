var v1 = 'v1';
var v2 = 'v2';
function f1(){
    console.log(obj.v1);
}

function f2(){
    console.log(obj.v2);
}


var obj = {
    v1: 'v1',
    v2: 'v2',
    f1: function(){
        console.log(this.v1);
    },
    f2: function(){
        console.log(this.v2);
    }
}

module.exports = obj;

