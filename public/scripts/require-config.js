/* global require */
require.config({
    baseUrl: 'scripts',
    waitSeconds: 60,

    paths: {
        // the HTML page.
        jquery: 'vendor/jquery/dist/jquery',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone',
        'backbone-poller': 'vendor/backbone-poller/backbone.poller',
        backbone_wreqr: 'vendor/backbone.wreqr/src/build/backbone.wreqr',
        // backbone_radio: 'vendor/backbone.radio/build/backbone.radio',
        backbone_babysitter: 'vendor/backbone.babysitter/src/build/' +
                             'backbone.babysitter',
        marionette: 'vendor/marionette/lib/backbone.marionette',
        // text:   'vendor/requirejs-text/text',
        hbs:   'vendor/require-handlebars-plugin/hbs',
        // select2: 'vendor/select2/select2',
        // d3:   'vendor/d3/d3',
        // dimple: 'vendor/dimple/dist/dimple.v2.1.0',

        //Unit testing
        // mocha: 'vendor/mocha/mocha',
        // chai: 'vendor/chai/chai',
        // 'chai-jquery': 'vendor/chai-jquery/chai-jquery',
        // 'sinon-chai': 'vendor/sinon-chai/lib/sinon-chai',
        //Test Specs go in here.
        // spec: '../tests/spec-chai'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        }
        // ,
        // backbone_radio: {
        //     deps: ['backbone'],
        //     exports: 'Backbone.Radio'
        // }
    }
});
