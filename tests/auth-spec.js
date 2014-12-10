var superagent = require('superagent')
var expect = require('expect.js')
//var data = require('../data/test-data-1.js')
var _ = require('lodash')
var utils = require('./utils')

// //TODO - make into shared function.
// function loginUser(agent) {
//     return function(done) {
//         agent
//             .post('http://localhost:3000/login')
//             .send({
//                 email: 'george@monserrat.com',
//                 password: 'george'
//             })
//             .end(onResponse);

//         function onResponse(err, res) {
//             expect(res.redirects).to.eql(['http://localhost:3000/presets'])
//             expect(res.status).to.eql(200);
//             return done();
//         }
//     };
// }

describe('auth rest api tests', function() {
    var agent = superagent.agent();

    it('should start with empty session (set cookies)', function(done) {
        agent
            .get('http://localhost:3000/presets')
            .end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).to.eql(['http://localhost:3000/login'])
                expect(res.status).to.eql(200);
                expect(res.headers['set-cookie']).to.exist;
                done();
            });
    });

    it('should gain a session (cookies already set)', function(done) {
        agent
            .get('http://localhost:3000/login')
            .end(function(err, res) {
                expect(err).to.be(null);
                expect(res.status).to.eql(200);
                expect(res.headers['set-cookie']).to.not.exist;
                done();
            });
    });

    it('should have bad logins rejected', function(done) {
        agent
            .post('http://localhost:3000/login')
                .send({
                    email: 'test@dummy.com',
                    password: 'wrong'
                })
                .end(onResponse);

            function onResponse(err, res) {
                expect(res.status).to.eql(200);
                expect(res.redirects).to.eql(['http://localhost:3000/login'])
                expect(res.text).to.contain('No user found.')
                return done();
            }
    });

    it('should start with login', utils.loginUser(agent));
    it('should log the user out', function(done) {
        agent
            .get('http://localhost:3000/logout')
            .end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).to.eql(['http://localhost:3000/login'])
                expect(res.status).to.eql(200);
                done();
            });
    });
    it('should redirect the user to login', function(done) {
        agent
            .get('http://localhost:3000/presets')
            .end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).to.eql(['http://localhost:3000/login'])
                expect(res.status).to.eql(200);
                done();
            });
    });
});
