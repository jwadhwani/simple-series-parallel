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

//nested callbacks
simpleTimer1(function (err, res1) {
    if (err)throw err;

    simpleTimer2(function (err, res2) {
        if (err)throw err;

        simpleTimer3(function (err, res3) {
            if (err)throw err;
            console.log([res1, res2, res3]);
        });
    });
});


//array of three functions
//no callbacks
//callbacks will be inserted at run time with the
// node callback function signature function(err, res)
var fns = [
    simpleTimer1,
    simpleTimer2,
    simpleTimer3
];


sp.series(fns, function (err, res) {
    if (err)throw err;

    //result is an array of all results
    //[1, 2, 3]
    console.log(res);//will print [1, 2, 3]
});

