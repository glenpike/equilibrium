define([
    'underscore',
    'backbone',
    'marionette',
    'hbs!templates/app.hbs'
], function(_, Backbone, Marionette, template) {

    var App = new Backbone.Marionette.Application({
        views: {},
        collections: {}
    });

    App.addRegions({
        appRegion: '.js-app'
    });

    function createViews(views) {
        var LayoutView = Marionette.LayoutView.extend({
            template: template,

            regions: {
                profile: '.js-profile-container',
                presets: '.js-presets-list',
                presetView: '.js-preset-view'
            }
        });

        views.layoutView = new LayoutView();

        App.appRegion.show(views.layoutView);
    }

    App.viewPreset = function() {
        console.log('viewPreset ', arguments)
    }

    App.editProfile = function() {
        console.log('editProfile ', arguments)
    }
    App.defaultView = function() {
        console.log('defaultView ', arguments)
    }

    App.on('before:start', function() {
        console.log('App.before:start ', new Date().getTime());

        //createCollections(this.options.collections);
        //createViews(this.options.views);
    });

    App.addInitializer(function() {
        console.log('App.initialize ', new Date().getTime());
        var opts = this.options;

        //Simplest router of all, calls App.viewPage on any route
        //contrary to the Backbone Router idea, which we might need to do
        //for simplicity
        this.router = new Marionette.AppRouter({
            appRoutes: {
                // 'dashboard/:edit':'viewPage',
                'preset/:id': 'viewPreset',
                'profile/edit': 'editProfile',
                '*other': 'defaultView'
            },
            controller: this
        });

    });

    App.on('start', function() {
        console.log('App.start ', new Date().getTime());

        Backbone.history.start();
    });

    return App;
});
