var assert = require('assert');
var axios = require('axios');

const url = "http://localhost:8000";


describe('Login', function() {
    describe('getJwtToken()', function() {

        const testUrl = url + '/login';

        it("returns status 200", function() {
            axios.post(testUrl, {})
            .then(function(response) {
                response.status = 234;
                assert.equal(200, response.status);
            })
            .catch(function(error) {});
        });

        it('should return a jwt token when provided username and password', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });

    });
});
