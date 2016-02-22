"use strict";

var dns = require('dns'),//https://nodejs.org/dist/latest-v4.x/docs/api/dns.html
    sp = require('../lib/sp');


dns.lookup('www.google.com', function(err, res1){
    if(err) throw err;

    dns.lookup('www.yahoo.com', function(err, res2) {
        if (err) throw err;

        dns.lookup('www.bing.com', function(err, res3) {
            if (err) throw err;
            console.log('Nested calls');
            console.log([res1, res2, res3]);
        });
    });

});

//passing in an array = [function, context, host name]
var fns = [
    [dns.lookup, null, 'www.google.com'],
    [dns.lookup, null, 'www.yahoo.com'],
    [dns.lookup, null, 'www.bing.com']
];


sp.series(fns, function(err, res){
    if(err) throw err;
    console.log(res);
});

