var superagent = require('superagent')
var expect = require('expect.js')
var data = require('../data/test-data-1.js')
var _ = require('lodash')

describe('presets rest api tests', function() {
    var id

    it('retrieves a collection', function(done) {
        superagent.get('http://localhost:3000/presets')
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body.length).to.equal(data.presets.length)
                expect(res.body.map(function(item) { return item._id})).to.contain('' + data.presets[0]._id)
                done()
            })
    })

    //Store preset to compare with other tests.
    function createPreset(index) {
        var preset = _.clone(data.presets[index])

        delete preset.settings

        preset.settings = { A: 1, B: 'two', C: '3' }

        return preset
    }

    it('post object', function(done) {
        superagent.post('http://localhost:3000/presets')
            .send(createPreset(1))
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body.length).to.eql(1)
                expect(res.body[0]._id.length).to.eql(24)
                id = res.body[0]._id
                done()
            })
    })

    it('retrieves an object', function(done) {
        superagent.get('http://localhost:3000/presets/' + id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body._id.length).to.eql(24)
                expect(res.body._id).to.eql(id)
                done()
            })
    })



    it('updates an object', function(done) {
        superagent.put('http://localhost:3000/presets/' + id)
            .send({ name: 'Peter',
                email: 'peter@yahoo.com'
            })
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
    })

    it('checks an updated object', function(done) {
        superagent.get('http://localhost:3000/presets/' + id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body._id.length).to.eql(24)
                expect(res.body._id).to.eql(id)
                expect(res.body.name).to.eql('Peter')
                done()
            })
    })

     it('deletes an object', function(done) {
        superagent.del('http://localhost:3000/presets/' + id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
    })


})
