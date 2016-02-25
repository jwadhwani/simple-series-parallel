var should = require('chai').should(),
    sp = require('../lib/sp');

describe('series tests', function () {

    it('should test a series of three async functions without any parameters successfully', function (done) {
        "use strict";

        function fn1(callback) {
            setImmediate(function () {
                callback(null, 1);
            });
        }

        function fn2(callback) {
            setImmediate(function () {
                callback(null, 2);
            });
        }

        function fn3(callback) {
            setImmediate(function () {
                callback(null, 3);
            });
        }

        var fns = [fn1, fn2, fn3];

        sp.series(fns, function (err, res) {
            if (err) throw err;

            res.should.eql([1, 2, 3]);

            done();
        });

    });

    it('should test a series of three async functions using simple timers successfully', function (done) {
        "use strict";

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


        sp.series(fns, function (err, res) {
            if (err)throw err;

            //result is an array of all results
            //[1, 2, 3]
            //console.log(res);//will print [1, 2, 3]
            res.should.eql([1, 2, 3]);
            done();
        });

    });

    it('should test a series of three async functions with parameters successfully', function (done) {
        "use strict";

        function fn1(a, callback) {
            setImmediate(function () {
                callback(null, a);
            });
        }

        function fn2(b, callback) {
            setImmediate(function () {
                callback(null, b);
            });
        }

        function fn3(c, callback) {
            setImmediate(function () {
                callback(null, c);
            });
        }

        var fns = [
            [fn1, null, 1],
            [fn2, null, 2],
            [fn3, null, 3]
        ];

        sp.series(fns, function (err, res) {
            if (err) throw err;

            res.should.eql([1, 2, 3]);
            done();
        });

    });

    it('should fail as the first argument is not an array of functions but a null', function (done) {
        "use strict";


        var fns = null;

        sp.series(fns, function (err, res) {
            (err.message).should.equal('"fns" should be an array');
            done();
        });

    });

    it('should fail as the callback function is a string', function (done) {
        "use strict";

        var fns = 'test';

        sp.series(fns, function (err, res) {
            (err.message).should.equal('"fns" should be an array');
            done();
        });

    });

    it('should fail as the second element in the function array is null', function (done) {
        "use strict";

        function fn1(callback) {
            setImmediate(function () {
                callback(null, 1);
            });
        }

        function fn3(callback) {
            setImmediate(function () {
                callback(null, 2);
            });
        }

        var fns = [fn1, null, fn3];

        sp.series(fns, function (err, res) {
            (err.message).should.equal('An element should be either a function or an array. The element at index: 1 is neither');
            done();
        });
    });

    it('should fail on the second function and return', function (done) {
        "use strict";

        function fn1(callback) {
            setImmediate(function () {
                callback(null, 1);
            });
        }

        function fn2(callback) {
            setImmediate(function () {
                callback(new Error('Error test'));
            });
        }

        function fn3(callback) {
            setImmediate(function () {
                callback(null, 3);
            });
        }

        var fns = [fn1, fn2, fn3];

        sp.series(fns, function (err, res) {
            (err.message).should.equal('Error test');
            done();
        });
    });

    it('should return an empty array as there are no functions to execute', function (done) {
        "use strict";

        var fns = [];

        sp.series(fns, function (err, res) {
            if (err) throw err;
            res.should.eql([]);
            done();
        });
    });
    it('should fail as the callback is not a function', function (done) {
        "use strict";

        var fns = [],
            callback = "badCallback";

        try{
            sp.series(fns, callback);
        }catch(e){
            (e.message).should.equal('"callback" should be a function');
            done();
        }

    });
});





