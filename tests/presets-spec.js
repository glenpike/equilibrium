var superagent = require('superagent')
var expect = require('expect.js')
var data = require('../data/test-data-1.js')
var _ = require('lodash')
var utils = require('./utils')

function getPresets(user) {
    var presets = [];
    for(var i = 0; i < data.presets.length;i++) {
        if(user == data.presets[i]._user) {
            presets.push(_.clone(data.presets[i]));
        }
    }
    console.log('countPresets = ', presets.length);
    return presets;
}

//Store preset to compare with other tests.
function createPreset(index) {
    var preset = _.clone(data.presets[index])

    delete preset.settings
    delete preset._id

    preset.settings = { A: 1, B: 'two', C: '3' }

    return preset
}

describe('presets rest api tests', function() {



    var id,
        agent = superagent.agent(),
        userPresets = getPresets('george@monserrat.com'),
        newPreset = createPreset(0),
        updateSettings = { 'D': 4, 'E': '5', 'F': 6};

    before(utils.loginUser(agent))

    it('retrieves a collection', function(done) {
        agent.get('http://localhost:3000/presets')
            .end(function(e, res) {
                //console.log('retrieve', res)
                expect(e).to.eql(null)
                expect(res.body.length).to.equal(userPresets.length)
                expect(res.body.map(function(item) { return item._id})).to.contain(userPresets[0]._id.toString())
                done()
            })
    })

    it('post object', function(done) {
        agent.post('http://localhost:3000/presets')
            .send(newPreset)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body.length).to.eql(1)
                expect(res.body[0]._id.length).to.eql(24)
                id = res.body[0]._id
                done()
            })
    })

    it('retrieves an object', function(done) {
        agent.get('http://localhost:3000/presets/' + id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body._id.length).to.eql(24)
                expect(res.body._id).to.eql(id)
                expect(res.body.settings).to.eql(newPreset.settings)
                done()
            })
    })



    it('updates an object', function(done) {
        var preset = createPreset(0);
        preset.settings = updateSettings;

        agent.put('http://localhost:3000/presets/' + id)
            .send(preset)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
    })

    it('checks an updated object', function(done) {
        agent.get('http://localhost:3000/presets/' + id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body._id.length).to.eql(24)
                expect(res.body._id).to.eql(id)
                expect(res.body.settings).to.eql(updateSettings)
                done()
            })
    })

    it('deletes an object', function(done) {
        agent.del('http://localhost:3000/presets/' + id)
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(typeof res.body).to.eql('object')
                expect(res.body.msg).to.eql('success')
                done()
            })
    })


})
