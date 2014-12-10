/* jshint sub: true */
/* global require */
//'use strict';

var ObjectID = require('mongodb').ObjectID,
    DBRef = require('mongodb').DBRef,
    bcrypt   = require('bcrypt-nodejs'),

    getDBRef = function(collectionName, id) {
        return new DBRef(collectionName, id, 'music-group');
    };

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

module.exports = {
    users: [{
        _id: 'george@monserrat.com',
        name: 'George Martin',
        password: generateHash('george'),
        created: new Date('12, 01, 2014')
    },
    {
        _id: 'lee@theark.com',
        name: 'Lee Scratch Perry',
        password: generateHash('lee'),
        created: new Date('12, 02, 2014')
    }],

    types: [{
        _id: new ObjectID("200000000000000000000001"),
        name: '4 Band EQ',
        created: new Date('12, 01, 2014'),
        fields: {

        }
    },
    {
        _id: new ObjectID("200000000000000000000002"),
        name: 'Compressor',
        created: new Date('12, 01, 2014')
    },
    {
        _id: new ObjectID("200000000000000000000003"),
        name: 'Delay',
        created: new Date('12, 01, 2014')
    }],

    presets: [{
        _id: new ObjectID("300000000000000000000001"),
        name: 'Kick Drum EQ',
        _user: 'george@monserrat.com',
        _type: new ObjectID("200000000000000000000001"),
        created: new Date('12, 03, 2014'),
        settings: {
            'Low band' : 'On',
            'Low peak/shelf' : 'peak',
            'Low freq (Hz)' : '108',
            'Low gain' : '+4',
            'Low/Mid band' : 'On',
            'Low/Mid Hi/Low Q' : 'Hi',
            'Low/Mid freq (Hz)' : '290',
            'Low/mid gain' : '-4',
            'Hi/Mid band' : 'On',
            'Hi/Mid freq (kHz)' : '2.4',
            'Hi/Mid gain' : '+2',
            'Hi band' : 'On',
            'Hi peak/shelf' : 'peak',
            'Hi freq (kHz)' : '6.0',
            'Hi gain' : '+4'
        }
    },{
        _id: new ObjectID("300000000000000000000002"),
        name: 'Rock Male Vocals EQ',
        _user: 'george@monserrat.com',
        _type: new ObjectID("200000000000000000000001"),
        created: new Date('12, 04, 2014'),
        settings: {
            'Low band' : 'On',
            'Low peak/shelf' : 'peak',
            'Low freq (Hz)' : '155',
            'Low gain' : '+2',
            'Low/Mid band' : 'On',
            'Low/Mid Hi/Low Q' : 'Hi',
            'Low/Mid freq (Hz)' : '290',
            'Low/mid gain' : '-6',
            'Hi/Mid band' : 'On',
            'Hi/Mid freq (kHz)' : '2.4',
            'Hi/Mid gain' : '-2',
            'Hi band' : 'On',
            'Hi peak/shelf' : 'shelf',
            'Hi freq (kHz)' : '7.2',
            'Hi gain' : '+4'
        }
    },{
        _id: new ObjectID("300000000000000000000003"),
        name: 'Bass EQ',
        _user: 'lee@theark.com',
        _type: new ObjectID("200000000000000000000001"),
        created: new Date('12, 04, 2014'),
        settings: {
            'Low band' : 'On',
            'Low peak/shelf' : 'peak',
            'Low freq (Hz)' : '100',
            'Low gain' : '+2',
            'Low/Mid band' : 'Off',
            'Low/Mid Hi/Low Q' : 'Hi',
            'Low/Mid freq (Hz)' : '290',
            'Low/mid gain' : '0',
            'Hi/Mid band' : 'On',
            'Hi/Mid freq (kHz)' : '2.4',
            'Hi/Mid gain' : '-2',
            'Hi band' : 'On',
            'Hi peak/shelf' : 'shelf',
            'Hi freq (kHz)' : '7.2',
            'Hi gain' : '-4'
        }
    },{
        _id: new ObjectID("300000000000000000000004"),
        name: 'Vocal Compressor EQ',
        _user: 'lee@theark.com',
        _type: new ObjectID("200000000000000000000002"),
        created: new Date('12, 04, 2014'),
        settings: {
            'Mode' : 'creative',
            'Attack (ms)' : '20',
            'Release (ms)' : '10',
            'Threshold (dB)' : '-10',
            'Ratio' : '7:1',
            'Presence (dB)' : '-7',
            'Make up (dB)' : '8'
        }
    },{
        _id: new ObjectID("300000000000000000000005"),
        name: 'Dub delay',
        _user: 'lee@theark.com',
        _type: new ObjectID("200000000000000000000003"),
        created: new Date('12, 05, 2014'),
        settings: {
            'Delay' : '300ms',
            'Feedback (ms)' : '75',
            'Level' : '10',
            'Detune' : '0'
        }
    }]
};
