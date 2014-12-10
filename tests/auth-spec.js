var superagent = require('superagent'),
    expect = require('expect.js'),
    _ = require('lodash'),
    utils = require('./utils');

describe('auth rest api tests', function() {
    var agent = superagent.agent();

    it('should start with empty session (set cookies)', function(done) {
        agent
            .get('http://localhost:3000/presets')
            .end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).to.eql(['http://localhost:3000/auth/login'])
                expect(res.status).to.eql(200);
                /* jshint  -W030 */
                expect(res.headers['set-cookie']).to.exist;
                /* jshint  +W030 */
                done();
            });
    });

    it('should gain a session (cookies already set)', function(done) {
        agent
            .get('http://localhost:3000/auth/login')
            .end(function(err, res) {
                expect(err).to.be(null);
                expect(res.status).to.eql(200);
                /* jshint  -W030 */
                expect(res.headers['set-cookie']).to.not.exist;
                /* jshint  +W030 */
                done();
            });
    });

    it('should have bad logins rejected', function(done) {
        agent
            .post('http://localhost:3000/auth/login')
                .send({
                    email: 'test@dummy.com',
                    password: 'wrong'
                })
                .end(onResponse);

            function onResponse(err, res) {
                expect(res.status).to.eql(200);
                expect(res.redirects).to.eql(['http://localhost:3000/auth/login'])
                expect(res.text).to.contain('type="password" name="password">')
                return done();
            }
    });

    it('should start with login', utils.loginUser(agent));

    it('should log the user out', function(done) {
        agent
            .get('http://localhost:3000/auth/logout')
            .end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).to.eql(['http://localhost:3000/auth/login'])
                expect(res.status).to.eql(200);
                done();
            });
    });

    it('should redirect the user to login', function(done) {
        agent
            .get('http://localhost:3000/presets')
            .end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).to.eql(['http://localhost:3000/auth/login'])
                expect(res.status).to.eql(200);
                done();
            });
    });
});
