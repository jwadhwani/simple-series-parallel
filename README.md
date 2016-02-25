# Simple-Series-Parallel

A minimalist utility module for running async functions in series or parallel

[![Build Status](https://travis-ci.org/jwadhwani/simple-series-parallel.svg?branch=master)](https://travis-ci.org/jwadhwani/simple-series-parallel)
[![NPM version](http://img.shields.io/npm/v/simple-series-parallel.svg)](https://www.npmjs.org/package/simple-series-parallel)
[![Coverage Status](https://coveralls.io/repos/jwadhwani/simple-series-parallel/badge.svg)](https://coveralls.io/r/jwadhwani/simple-series-parallel)


> ***This module is currently supported only on NodeJS.***

## Installation

```bash
$ npm install simple-series-parallel
```

## Usage

Require the module

```js
var sp = require('simple-series-parallel');
```


### .series (array, callback)

* **@param** _{Array}_ array of functions or an array of arrays. Each array with the function, context and arguments. 
* **@param** _{Function}_ callback on complete with the results array or error

### .parallel (array, callback)

* **@param** _{Array}_ array of functions or an array of arrays. Each array with the function, context and arguments. 
* **@param** _{Function}_ callback on complete with results array or error

Executes an array of functions in series or parallel. The result of each function is pushed to the final results array. Each function is assumed to have a callback with standard nodeJS parameters of __error__ and __result__. 
If there is an error the program terminates and return with the error. 

If you just want to use the array of function then use the _bind_ function to pre-apply the context and arguments if any. You could also use a array for each function with the function, its context and arguments if any.
Please see the examples below for variosu usage patterns.

## Examples

__Tale of three timers - no arguments passed in. Running three timers in series.__

Example: _simple-series.js_:

```js
"use strict";

var sp = require('simple-series-parallel');
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
//node callback function signature function(err, res)
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

```


__Running three timers in parallel.__
 
Example: _simple-parallel.js_: 
```js
sp.parallel(fns, function (err, res) {
    if (err)throw err;

    //result is an array of all results
    //[1, 3, 2]
    console.log(res);//will print [1, 3, 2]
});
```


__IP Lookup of three sites - passing in the host names as arguments.__

Arguments pre-applied using bind

Example: _simple-series-args-1.js_: 
```js
"use strict";

var dns = require('dns'),//https://nodejs.org/dist/latest-v4.x/docs/api/dns.html
    sp = require('simple-series-parallel');

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
```

__IP Lookup of three sites - passing in the host names as arguments.__

Arguments passed in with function name and context

Example: _simple-series-args-2.js_: 
```js
"use strict";

var dns = require('dns'),//https://nodejs.org/dist/latest-v4.x/docs/api/dns.html
    sp = require('simple-series-parallel');

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
```


## Testing

```bash
$ npm test
```

## Compiling to ES5

```bash
$ npm run compile
```

## Authors

 - Jayesh Wadhwani

## License

(The MIT License)

Copyright (c) 2016 Jayesh Wadhwani

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.