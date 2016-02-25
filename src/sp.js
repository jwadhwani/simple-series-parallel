"use strict";
/**
 * simple-series-parallel
 * A minimalist utility module for running async functions in series or parallel
 * Copyright(c) 2016 Jayesh Wadhwani
 * MIT Licensed
 */
const utils = require('util');

/*
fns is an array where each element can be:
1. a function and/or
2. an array with the following format: [function, context, arg0, arg1,...arg n]
sp - true for series, false for parallel
 */

var seriesParallel = function (fns, callback, sp) {

    //validation - callback needs to be a callable function
    if (typeof(callback) !== "function") {
        throw new Error('"callback" should be a function');
    }

    //should be an array
    if (!utils.isArray(fns)) {
        return callback(new Error('"fns" should be an array'));
    }

    //no functions just return an empty array
    if (fns.length === 0) {
        return callback(null, []);
    }

    //minor validation
    for(let i = 0; i < fns.length; i++){
        if(!utils.isArray(fns[i]) && (typeof(fns[i]) !== "function")){
            return callback(new Error('An element should be either a function or an array. The element at index: ' + i + ' is neither'));
        }
    }

    setImmediate((fns, callback) => {
        let results = [],
            count = fns.length;

        var next = () => {
            let fn = fns.shift();
            if (!fn) {
                return;
            }

            var cb = (err, res) => {
                if (!err) {
                    results.push(res);
                    if (results.length === count) {
                        return callback(null, results);
                    }
                    if(sp){
                        //next();
                        setImmediate(next);
                   }
                } else {
                    return callback(err);
                }
            };
            if(utils.isArray(fn)){
                let f = fn[0],
                    ctx = fn[1],
                    args = fn.slice(2);

                args.push(cb);
                f.apply(ctx, args);
            }else{
                fn(cb);
            }
            if(!sp){
                //next();
                setImmediate(next);
            }
        };

        next();

    }, fns, callback);
};


module.exports = {
    series: function(fns, callback){
        seriesParallel(fns, callback, true);
    },
    parallel: function(fns, callback){
        seriesParallel(fns, callback, false);
    }
};
