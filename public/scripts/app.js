define([
    'underscore',
    'backbone',
    'marionette',
    'radio',
    'hbs!templates/app'
], function(_, Backbone, Marionette, Radio, template) {

    Backbone.Model.prototype.idAttribute = '_id';

    var App = new Backbone.Marionette.Application();

    App.addRegions({
        appRegion: '.js-app'
    });

    function _setup(app) {
        app.models.user = new Backbone.Model();
        app.models.user.urlRoot = 'user';

        app.collections.presets = new Backbone.Collection();
        app.collections.presets.url = 'presets';
        app.collections.types = new Backbone.Collection();
        app.collections.types.url = 'types';
        app.appRegion.show(app.views.layoutView);

        app.dataChannel = new Backbone.Radio.channel('data');

        app.dataChannel.reply('presets', function() {
            return app.collections.presets;
        });
        app.dataChannel.reply('preset', function(id) {
            return app.collections.presets.get(id);
        });
        app.dataChannel.reply('types', function() {
            return app.collections.types;
        });
        app.dataChannel.reply('type', function(id) {
            return app.collections.types.get(id);
        });
        app.dataChannel.reply('user', function() {
            return app.models.user;
        });

        app.dataChannel.comply('update', function(which) {
            if(app.collections[which]) {
                app.collections[which].fetch();
            }
        })

        app.routeChannel = new Backbone.Radio.channel('route');

    }

    var pages = {
        'presets': { 'path': 'pages/edit-preset' },
        'home': { 'path': 'pages/home' }
    };

    App.viewPage = function(page, params) {
        var pageDef;

        console.log('viewPage ', arguments);

        if(!page) {
            page = 'home';
        }

        if(App.currentRoute == page) {
            App.routeChannel.trigger('route:' + page, {params: params});
            return;
        }
        App.currentRoute = page;

        pageDef = pages[page];

        if(App.currentPage) {
            App.currentPage.destroy();
            App.currentPage = null;
        }

        require([pageDef.path], function (Page) {
            console.log('Page loaded ', page);
            App.currentPage = new Page();
            App.currentPage.init({params: params});
            App.appRegion.show(App.currentPage.getView());
        });
    };

    App.viewPreset = function(id) {
        console.log('viewPreset');
        this.viewPage('home', id)
    }

    App.on('before:start', function() {
        console.log('App.before:start ', new Date().getTime());

        this.collections = this.models = this.views = {};

        _setup(this)
    });

    App.addInitializer(function() {
        console.log('App.initialize ', new Date().getTime());

        this.router = new Marionette.AppRouter({
            appRoutes: {
                ':page/:id': 'viewPage',
                ':id': 'viewPreset',
                '*other': 'viewPage'
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
                        app.collections.types.fetch();
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
