define([
    'underscore',
    'backbone',
    'marionette',
    'hbs!templates/app',
    'hbs!templates/profile',
    'views/presets',
    'views/preset-detail'
], function(_, Backbone, Marionette, template, profileTemplate,
    PresetsView, PresetDetail) {

    var App = new Backbone.Marionette.Application();

    App.addRegions({
        appRegion: '.js-app'
    });

    var ProfileView = Marionette.ItemView.extend({
        template: profileTemplate,
        modelEvents: {
            'change': 'render'
        }
    });



    function _setup(app) {
        //No logic in here at the moment...
        app.models.user = new Backbone.Model();
        app.models.user.urlRoot = 'user';

        app.collections.presets = new Backbone.Collection();
        app.collections.presets.url = 'presets';

        var LayoutView = Marionette.LayoutView.extend({
            template: template,

            regions: {
                profile: '.js-profile-container',
                presets: '.js-presets-list',
                presetView: '.js-preset-view'
            }
        });

        app.views.presetsView = new PresetsView({ collection: app.collections.presets });
        app.views.profileView = new ProfileView({ model: app.models.user })

        app.views.layoutView = new LayoutView();

        app.views.layoutView.on('show', function() {
            //console.log(this.el)
            this.profile.show(app.views.profileView);
            this.presets.show(app.views.presetsView);
        });

        App.appRegion.show(app.views.layoutView);
    }

    App.viewPreset = function(id) {
        var model = this.collections.presets.get(id)
        console.log('viewPreset ', id, ' model ', model);

        this.views.layoutView.presetView.show(new PresetDetail({ model: model }));
    }

    App.defaultView = function() {
        console.log('defaultView ', arguments)
    }

    App.on('before:start', function() {
        console.log('App.before:start ', new Date().getTime());

        this.collections = this.models = this.views = {};

        _setup(this)
    });

    App.addInitializer(function() {
        console.log('App.initialize ', new Date().getTime());

        Backbone.Model.prototype.idAttribute = '_id';

        this.router = new Marionette.AppRouter({
            appRoutes: {
                // 'dashboard/:edit':'viewPage',
                'presets/:id': 'viewPreset',
                '*other': 'defaultView'
            },
            controller: this
        });

    });

    App.on('start', function() {
        console.log('App.start ', new Date().getTime());
        var app = this;
        app.models.user.fetch({
            success: function() {
                app.collections.presets.fetch({
                    success: function() {
                        console.log('success presets: ', arguments)
                        Backbone.history.start();
                    },
                    error: function() {
                        console.log('error presets: ', arguments)
                    }
                });
            },
            error: function() {
                console.log('error user: ', arguments)
            }
        });

    });

    return App;
});
