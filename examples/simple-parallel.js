"use strict";

var sp = require('../lib/sp');
//tale of three timers

//delay 100ms
function simpleTimer1(callback) {
    setTimeout(function () {
        callback(null, 1);
    }, 100);
}

//delay 600ms
function simpleTimer2(callback) {
    setTimeout(function () {
        callback(null, 2);
    }, 600);
}


//delay 200ms
function simpleTimer3(callback) {
    setTimeout(function () {
        callback(null, 3);
    }, 200);
}

//array of three functions
//no callbacks
//callbacks will be inserted at run time with the
// node callback function signature function(err, res)
var fns = [
    simpleTimer1,
    simpleTimer2,
    simpleTimer3
];


sp.parallel(fns, function (err, res) {
    if (err)throw err;

    //result is an array of all results
    //[1, 3, 2]
    console.log(res);//will print [1, 3, 2]
});

