define([
    'underscore',
    'backbone',
    'marionette',
    'views/presets',
    'views/preset-detail',
    'hbs!templates/home-page',
    'hbs!templates/profile'
], function(_, Backbone, Marionette, PresetsView, PresetDetail, template, profileTemplate) {


    var ProfileView = Marionette.ItemView.extend({
        template: profileTemplate,
        modelEvents: {
            'change': 'render'
        }
    });

    var LayoutView = Marionette.LayoutView.extend({
        template: template,

        regions: {
            profile: '.js-profile-container',
            presets: '.js-presets-list',
            presetView: '.js-preset-view'
        }
    });

    var page = {
        views: {},
        collections: {},
        models: {}
    };



    function Page() {}

    function hidePreset() {
        page.views.layoutView.presetView.empty();
    }

    function viewPreset(id) {
        var model = page.collections.presets.get(id)
        console.log('viewPreset ', id, ' model ', model);
        //page.currentPreset = id;
        page.views.layoutView.presetView.show(new PresetDetail({ model: model }));
    }

    function listen() {
        page.routeChannel = Backbone.Radio.channel('route');

        page.routeChannel.on('route:home', function(route) {
            //console.log('route:home', route)
            if(route && route.params) {
                page.currentPreset = route.params;
                viewPreset(route.params);
            } else {
                hidePreset();
            }
        });
    }

    function retrieveData() {
        page.dataChannel = Backbone.Radio.channel('data');
        page.collections.presets = page.dataChannel.request('presets');
        page.models.user = page.dataChannel.request('user');
    }

    function createViews() {
        page.views.presetsView = new PresetsView({ collection: page.collections.presets });
        page.views.profileView = new ProfileView({ model: page.models.user })

        page.views.layoutView = new LayoutView();

        page.views.layoutView.on('show', function() {
            //console.log(this.el)
            this.profile.show(page.views.profileView);
            this.presets.show(page.views.presetsView);

            if(page.currentPreset) {
                viewPreset(page.currentPreset);
            }
        });
    }

    function ignore() {
        page.routeChannel.off();
        page.routeChannel = null;
    }

    function destroyViews() {
        if(page.views.layoutView) {
            page.views.layoutView.remove();
            page.views.layoutView = null;
            page.views.presetsView = null;
            page.views.profileView = null;
        }
    }
    function destroyData() {
        page.collections.presets = null;
        page.models.user = null;
        page.dataChannel = null;
    }

    Page.prototype.getView = function() {
        return page.views.layoutView;
    }

    Page.prototype.init = function(config) {
        var self = this;

        if(config && config.params) {
            page.currentPreset = config.params;
        }

        listen();
        retrieveData();
        createViews();
    }

    Page.prototype.destroy = function() {
        console.log("Page.destroy")
        ignore()
        destroyViews();
        destroyData();

    }
    return Page;
});
