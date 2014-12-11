/* global require */
require.config({
    baseUrl: 'scripts',
    waitSeconds: 60,

    paths: {
        // the HTML page.
        jquery: 'vendor/jquery/dist/jquery',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone',
        backbone_wreqr: 'vendor/backbone.wreqr/src/build/backbone.wreqr',
        backbone_babysitter: 'vendor/backbone.babysitter/src/build/' +
                             'backbone.babysitter',
        marionette: 'vendor/marionette/lib/backbone.marionette',
        hbs:   'vendor/require-handlebars-plugin/hbs',
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
    }
});