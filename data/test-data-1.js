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
        fields: [{
            label: "Low band",
            type: 'toggle',
            values: ['On', 'Off']
        },{
            label: "Low peak/shelf",
            type: 'toggle',
            values: ['peak', 'shelf']
        },{
            label: "Low freq (Hz)",
            type: 'log-range',
            values: ['20', '300']
        },{
            label: "Low gain (dB)",
            type: 'range',
            values: ['-12', '12']
        },{
            label: "Low/Mid band",
            type: 'toggle',
            values: ['On', 'Off']
        },{
            label: "Low//Mid Hi/Low Q",
            type: 'toggle',
            values: ['Low', 'Hi']
        },{
            label: "Low/Mid freq (Hz)",
            type: 'log-range',
            values: ['80', '1600']
        },{
            label: "Low/Mid gain (dB)",
            type: 'range',
            values: ['-12', '12']
        },{
            label: "Hi/Mid band",
            type: 'toggle',
            values: ['On', 'Off']
        },{
            label: "Hi//Mid Hi/Low Q",
            type: 'toggle',
            values: ['Low', 'Hi']
        },{
            label: "Hi/Mid freq (kHz)",
            type: 'log-range',
            values: ['0.3', '7']
        },{
            label: "Hi/Mid gain (dB)",
            type: 'range',
            values: ['-12', '12']
        },{
            label: "Hi band",
            type: 'toggle',
            values: ['On', 'Off']
        },{
            label: "Hi peak/shelf",
            type: 'toggle',
            values: ['peak', 'shelf']
        },{
            label: "Hi freq (kHz)",
            type: 'log-range',
            values: ['1.2', '25']
        },{
            label: "Hi gain (dB)",
            type: 'range',
            values: ['-12', '12']
        }]
    },
    {
        _id: new ObjectID("200000000000000000000002"),
        name: 'Square One Compressor',
        created: new Date('12, 01, 2014'),
        fields: [{
            label: "Mode",
            type: 'select',
            values: ['creative', 'vintage', 'hard knee']
        },{
            label: "Attack (ms)",
            type: 'log-range',
            values: ['0.1', '20']
        },{
            label: "Release (ms)",
            type: 'log-range',
            values: ['50', '2500']
        },{
            label: "Threshold (dBu)",
            type: 'range',
            values: ['-50', '25']
        },{
            label: "Ratio (ms)",
            type: 'log-range',
            values: ['infinity', '1:1']
        },{
            label: "Presence (dB)",
            type: 'range',
            values: ['0', '30']
        },{
            label: "Make up (dB)",
            type: 'range',
            values: ['0', '30']
        }]
    },
    {
        _id: new ObjectID("200000000000000000000003"),
        name: 'Analog Delay',
        created: new Date('12, 01, 2014'),
        fields: [{
            label: "Mode",
            type: 'toggle',
            values: ['short', 'long']
        },{
            label: "Delay time (ms)",
            type: 'range',
            values: ['40', '80']
        },{
            label: "Mix",
            type: 'range',
            values: ['0', '10']
        },{
            label: "Feedback",
            type: 'range',
            values: ['0', '10']
        },{
            label: "Loop Type",
            type: 'toggle',
            values: ['int. loop', 'ext. loop']
        },{
            label: "Loop Gain",
            type: 'range',
            values: ['0', '10']
        },{
            label: "Output Level",
            type: 'range',
            values: ['0', '10']
        }]
    },
    {
        _id: new ObjectID("200000000000000000000004"),
        name: 'Digital Delay',
        created: new Date('12, 01, 2014'),
        fields: [{
            label: "Delay time (ms)",
            type: 'range',
            values: ['40', '5000']
        },{
            label: "Mix",
            type: 'range',
            values: ['0', '10']
        },{
            label: "Feedback",
            type: 'range',
            values: ['0', '10']
        },{
            label: "LFO Rate (Hz)",
            type: 'log-range',
            values: ['0', '10']
        },{
            label: "LFO Depth",
            type: 'range',
            values: ['0', '10']
        },{
            label: "Output Level",
            type: 'range',
            values: ['0', '10']
        }]
    }],

    presets: [{
        _id: new ObjectID("300000000000000000000001"),
        name: 'Kick Drum EQ',
        _user: 'george@monserrat.com',
        _type: new ObjectID("200000000000000000000001"),
        created: new Date('12, 03, 2014'),
        description: 'This is a nice flappy bass drum.',
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
        description: 'W-Axl-yrical.',
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
        description: 'No worries.',
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
        description: 'Simple compressor for track x.',
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
        _type: new ObjectID("200000000000000000000004"),
        created: new Date('12, 05, 2014'),
        description: 'Rinse and repeat',
        settings: {
            'Delay time (ms)' : '300ms',
            'Mix' : '10',
            'Feedback' : '7.5',
            'LFO Rate (Hz)' : '0.5',
            'LFO Depth' : '1',
            'Output Level' : '6'
        }
    }]
};
