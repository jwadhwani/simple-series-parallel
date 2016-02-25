"use strict";

var should = require('chai').should(),
    sp = require('../lib/sp');

describe('Recursive', function(){
    it('should test three series of 10 objects each called one after another', function(done){
        "use strict";

        var LettersNumbers = function(ln, quantity){
            this._ln = ln || 'L';
            this._quantity = quantity || 10;
            this._maxLetter = 26;
            this._maxNumber = 10;
        };

        LettersNumbers.prototype._getRandomArbitrary = function(r) {
            return Math.floor(Math.random() * r);
        };


        LettersNumbers.prototype._getOneChar = function() {

            var l = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                n = '0123456789',
                c = '';

            if (this._ln === 'L') {
                c = l.charAt(this._getRandomArbitrary(this._maxLetter));
            } else {
                c = n.charAt(this._getRandomArbitrary(this._maxNumber));
            }

            return c;
        };

        LettersNumbers.prototype.make = function(callback){
            var that = this;

            setTimeout(function(){
                var s = '';
                for(var i = 0; i < that._quantity; i++){
                    s += that._getOneChar();
                }
                callback(null, s.length);
            }, 0);
        };

        var objs1 = [],
            objs2 = [],
            objs3 = [],
            fns1 = [],
            fns2 = [],
            fns3 = [];

        for(var i = 1, j = 11, k = 21; i < 10; i++, j++, k++){
            objs1.push(new LettersNumbers('L', i++));
            objs1.push(new LettersNumbers('N', i));

            objs2.push(new LettersNumbers('L', j++));
            objs2.push(new LettersNumbers('N', j));

            objs3.push(new LettersNumbers('L', k++));
            objs3.push(new LettersNumbers('N', k));
        }

        for(var j = 0; j < objs1.length; j++){
            fns1.push(objs1[j].make.bind(objs1[j]));
            fns2.push(objs2[j].make.bind(objs2[j]));
            fns3.push(objs3[j].make.bind(objs3[j]));
        }


        sp.series(fns1, function(err, res1){
            if(err) throw err;
            //console.log(res1);
            sp.series(fns2, function(err, res2) {
                if (err) throw err;
                //console.log(res2);
                sp.series(fns3, function (err, res3) {
                    if (err) throw err;
                    //console.log(res3);

                    res1.should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                    res2.should.eql([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                    res3.should.eql([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
                    done();
                });
            });
        });
    });
    it('should test three parallel of 10 objects each called one after another', function(done){
        "use strict";

        var LettersNumbers = function(ln, quantity){
            this._ln = ln || 'L';
            this._quantity = quantity || 10;
            this._maxLetter = 26;
            this._maxNumber = 10;
        };

        LettersNumbers.prototype._getRandomArbitrary = function(r) {
            return Math.floor(Math.random() * r);
        };


        LettersNumbers.prototype._getOneChar = function() {

            var l = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                n = '0123456789',
                c = '';

            if (this._ln === 'L') {
                c = l.charAt(this._getRandomArbitrary(this._maxLetter));
            } else {
                c = n.charAt(this._getRandomArbitrary(this._maxNumber));
            }

            return c;
        };

        LettersNumbers.prototype.make = function(callback){
            var that = this;

            setTimeout(function(){
                var s = '';
                for(var i = 0; i < that._quantity; i++){
                    s += that._getOneChar();
                }
                callback(null, s.length);
            }, 0);
        };

        var objs1 = [],
            objs2 = [],
            objs3 = [],
            fns1 = [],
            fns2 = [],
            fns3 = [];

        for(var i = 1, j = 11, k = 21; i < 10; i++, j++, k++){
            objs1.push(new LettersNumbers('L', i++));
            objs1.push(new LettersNumbers('N', i));

            objs2.push(new LettersNumbers('L', j++));
            objs2.push(new LettersNumbers('N', j));

            objs3.push(new LettersNumbers('L', k++));
            objs3.push(new LettersNumbers('N', k));
        }

        for(var j = 0; j < objs1.length; j++){
            fns1.push(objs1[j].make.bind(objs1[j]));
            fns2.push(objs2[j].make.bind(objs2[j]));
            fns3.push(objs3[j].make.bind(objs3[j]));
        }


        sp.parallel(fns1, function(err, res1){
            if(err) throw err;
            //console.log(res1);
            sp.parallel(fns2, function(err, res2) {
                if (err) throw err;
                //console.log(res2);
                sp.parallel(fns3, function (err, res3) {
                    if (err) throw err;
                    //console.log(res3);

                    res1.should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                    res2.should.eql([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                    res3.should.eql([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
                    done();
                });
            });
        });
    });
    it('should test three parallel and three series of 10 objects each called one after another', function(done){
        "use strict";

        var LettersNumbers = function(ln, quantity){
            this._ln = ln || 'L';
            this._quantity = quantity || 10;
            this._maxLetter = 26;
            this._maxNumber = 10;
        };

        LettersNumbers.prototype._getRandomArbitrary = function(r) {
            return Math.floor(Math.random() * r);
        };


        LettersNumbers.prototype._getOneChar = function() {

            var l = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                n = '0123456789',
                c = '';

            if (this._ln === 'L') {
                c = l.charAt(this._getRandomArbitrary(this._maxLetter));
            } else {
                c = n.charAt(this._getRandomArbitrary(this._maxNumber));
            }

            return c;
        };

        LettersNumbers.prototype.make = function(callback){
            var that = this;

            setTimeout(function(){
                var s = '';
                for(var i = 0; i < that._quantity; i++){
                    s += that._getOneChar();
                }
                callback(null, s.length);
            }, 0);
        };

        var objs1 = [],
            objs2 = [],
            objs3 = [],
            fns1 = [],
            fns2 = [],
            fns3 = [];

        for(var i = 1, j = 11, k = 21; i < 10; i++, j++, k++){
            objs1.push(new LettersNumbers('L', i++));
            objs1.push(new LettersNumbers('N', i));

            objs2.push(new LettersNumbers('L', j++));
            objs2.push(new LettersNumbers('N', j));

            objs3.push(new LettersNumbers('L', k++));
            objs3.push(new LettersNumbers('N', k));
        }

        for(var j = 0; j < objs1.length; j++){
            fns1.push(objs1[j].make.bind(objs1[j]));
            fns2.push(objs2[j].make.bind(objs2[j]));
            fns3.push(objs3[j].make.bind(objs3[j]));
        }


        sp.parallel(fns1, function(err, res1){
            if(err) throw err;
            //console.log(res1);
            sp.series(fns2, function(err, res2) {
                if (err) throw err;
                //console.log(res2);
                sp.parallel(fns3, function (err, res3) {
                    if (err) throw err;
                    //console.log(res3);

                    res1.should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                    res2.should.eql([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                    res3.should.eql([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
                    done();
                });
            });
        });
    });
});






