import request from 'request';
import assert from 'assert';

import '../index.js';

const url = "http://localhost:8000";

describe('Node Server', () => {

    describe('getReq()', () => {
        it('should return 200', done => {
            request.get(url, (err, res) => {
                assert.equal(200, res.statusCode);
                done();
            });
        });
    });

    describe('postReq()', () => {
        it('should return 200', done => {
            request.post(url, {}, (err, res) => {
                assert.equal(200, res.statusCode);
                done();
            });
        });
    });

});


describe('Login', function() {
    describe('getJwtToken()', function() {

        const testUrl = url + '/login';

        it("returns status 200", () => {
            request.post(testUrl, {
                username:'vfdv', password:'cd'
            }, (err, res) => {
                assert.equal(200, res.statusCode);
                done();
            });
        });

        it('should return a jwt token when provided username and password', function() {
            request.post(testUrl, (err, res) => {
                assert.equal(200, res.statusCode);
                done();
            });
            assert.equal(-1, [1,2,3].indexOf(4));
        });

    });
});
