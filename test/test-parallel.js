var should = require('chai').should(),
    sp = require('../lib/sp');

describe('Parallel tests', function () {

    it('should test a parallel of three async functions without any parameters successfully', function (done) {
        "use strict";

        function fn1(callback) {
            setTimeout(function () {
                callback(null, 1);
            }, 100);
        }

        function fn2(callback) {
            setTimeout(function () {
                callback(null, 2);
            }, 200);
        }

        function fn3(callback) {
            setTimeout(function () {
                callback(null, 3);
            }, 300);
        }

        var fns = [fn1, fn2, fn3];

        sp.parallel(fns, function (err, res) {
            if (err) throw err;

            res.should.eql([1, 2, 3]);

            done();
        });

    });

    it('should test a parallel of three async functions with parameters successfully', function (done) {
        "use strict";

        function fn1(a, callback) {
            setTimeout(function () {
                callback(null, a);
            }, 100);
        }

        function fn2(b, callback) {
            setTimeout(function () {
                callback(null, b);
            }, 600);
        }

        function fn3(c, callback) {
            setTimeout(function () {
                callback(null, c);
            }, 200);
        }

        var fns = [
            [fn1, null, 1],
            [fn2, null, 2],
            [fn3, null, 3]
        ];

        sp.parallel(fns, function (err, res) {
            if (err) throw err;

            res.should.eql([1, 3, 2]);
            done();
        });
    });

    it('should fail as the first argument is not an array of functions but a null', function (done) {
        "use strict";

        var fns = null;

        sp.parallel(fns, function (err, res) {
            (err.message).should.equal('"fns" should be an array');
            done();
        });

    });

    it('should fail as the callback function is a string', function (done) {
        "use strict";

        var fns = 'test';

        sp.parallel(fns, function (err, res) {
            (err.message).should.equal('"fns" should be an array');
            done();
        });

    });

    it('should fail as the second element in the function array is null', function (done) {
        "use strict";

        function fn1(callback) {
            setTimeout(function () {
                callback(null, 1);
            }, 100);
        }

        function fn3(callback) {
            setTimeout(function () {
                callback(null, 2);
            }, 200);
        }

        var fns = [fn1, null, fn3];

        sp.parallel(fns, function (err, res) {
            (err.message).should.equal('An element should be either a function or an array. The element at index: 1 is neither');
            done();
        });
    });

    it('should fail on the second function and return', function (done) {
        "use strict";

        function fn1(callback) {
            setTimeout(function () {
                callback(null, 1);
            }, 100);
        }

        function fn2(callback) {
            setTimeout(function () {
                callback(new Error('Error test'));
            }, 200);
        }

        function fn3(callback) {
            setTimeout(function () {
                callback(null, 3);
            }, 300);
        }

        var fns = [fn1, fn2, fn3];

        sp.parallel(fns, function (err, res) {
            (err.message).should.equal('Error test');
            done();
        });
    });

    it('should return an empty array as there are no functions to execute', function (done) {
        "use strict";

        function fn1(callback) {
            setTimeout(function () {
                callback(null, 1);
            }, 100);
        }

        function fn3(callback) {
            setTimeout(function () {
                callback(null, 2);
            }, 200);
        }

        var fns = [];

        sp.parallel(fns, function (err, res) {
            if (err) throw err;
            res.should.eql([]);
            done();
        });
    });
});





