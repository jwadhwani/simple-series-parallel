"use strict";

var dns = require('dns'),//https://nodejs.org/dist/latest-v4.x/docs/api/dns.html
    sp = require('../lib/sp');

//bind in the arguments
var fns = [
    dns.lookup.bind(null, 'www.google.com'),
    dns.lookup.bind(null, 'www.yahoo.com'),
    dns.lookup.bind(null, 'www.bing.com')
];

sp.series(fns, function(err, res){
   if(err) throw err;

    //prints [ '74.125.239.148', '206.190.36.45', '204.79.197.200' ]
    console.log(res);
});
