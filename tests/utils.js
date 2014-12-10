var expect = require('expect.js')

module.exports = {

    loginUser: function (agent) {
        return function(done) {
            agent
                .post('http://localhost:3000/auth/login')
                .send({
                    email: 'george@monserrat.com',
                    password: 'george'
                })
                .end(onResponse);

            function onResponse(err, res) {
                expect(res.redirects).to.eql(['http://localhost:3000/'])
                expect(res.status).to.eql(200);
                return done();
            }
        };
    }
};
