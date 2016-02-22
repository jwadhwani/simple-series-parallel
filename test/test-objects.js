"use strict";

const should = require('chai').should(),
    sp = require('../lib/sp');

describe('Test objects', function(){
    it('should test a series of 10 objects without any parameters', function(done){
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

            let l = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
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
            let that = this;

            setTimeout(function(){
                let s = '';
                for(let i = 0; i < that._quantity; i++){
                    s += that._getOneChar();
                }
                callback(null, s.length);
            }, 0);
        };

        var objs = [],
            fns = [];

        for(var i = 1; i < 10; i++){
            objs.push(new LettersNumbers('L', i++));
            objs.push(new LettersNumbers('N', i));
        }

        for(var j = 0; j < objs.length; j++){
            fns.push(objs[j].make.bind(objs[j]));
        }

        sp.series(fns, function(err, res){
            res.should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            //console.log(res);
            done();
        });
    });

    it('should test in parallel of 10 objects without any parameters', function (done) {
        "use strict";

        var LettersNumbers = function (ln, quantity) {
            this._ln = ln || 'L';
            this._quantity = quantity || 10;
            this._maxLetter = 26;
            this._maxNumber = 10;
        };

        LettersNumbers.prototype._getRandomArbitrary = function (r) {
            return Math.floor(Math.random() * r);
        };


        LettersNumbers.prototype._getOneChar = function () {

            let l = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                n = '0123456789',
                c = '';

            if (this._ln === 'L') {
                c = l.charAt(this._getRandomArbitrary(this._maxLetter));
            } else {
                c = n.charAt(this._getRandomArbitrary(this._maxNumber));
            }

            return c;
        };

        LettersNumbers.prototype.make = function (callback) {
            let that = this;

            setTimeout(function () {
                let s = '';
                for (let i = 0; i < that._quantity; i++) {
                    s += that._getOneChar();
                }
                callback(null, s.length);
            }, 0);
        };


        var objs = [],
            fns = [];

        for (var i = 1; i < 10; i++) {
            objs.push(new LettersNumbers('L', i++));
            objs.push(new LettersNumbers('N', i));
        }

        for (var j = 0; j < objs.length; j++) {
            fns.push([objs[j].make, objs[j]]);
        }

        sp.parallel(fns, function (err, res) {
            res.should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            //console.log(res);
            done();
        });
    });
});








