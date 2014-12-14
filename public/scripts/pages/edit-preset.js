define([
    'underscore',
    'backbone',
    'marionette',
    'views/edit-preset',
    'hbs!templates/edit-preset-page'

], function(_, Backbone, Marionette, EditPresetView, template) {

    var LayoutView = Marionette.LayoutView.extend({
        template: template,

        regions: {
            presetView: '.js-preset-edit'
        }
    });

    var page = {
        views: {},
        collections: {},
        models: {}
    };

    _.extend(page, Backbone.Events)

    function EditPresetPage() {
        console.log("EditPresetPage")
    };

    function listen() {
        page.routeChannel = Backbone.Radio.channel('route');
    }

    function updateType() {
        page.models.type = page.dataChannel.request('type',
            page.models.preset.get('_type'));
    }

    function retrieveData() {
        page.dataChannel = Backbone.Radio.channel('data');

        page.models.preset = page.dataChannel.request('preset', page.currentPreset);

        page.listenTo(page.models.preset, 'change', updateType);

        if(page.models.preset.get('_type')) {
            updateType()
        }
    }

    function createViews() {
        page.views.layoutView = new LayoutView();
        page.views.editPresetView = new EditPresetView({
            model: page.models.preset,
            type: page.models.type
        });

        page.views.layoutView.on('show', function() {
            this.presetView.show(page.views.editPresetView);
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
        }
    }

    function destroyData() {
        page.stopListening();
        page.dataChannel = null;
    }

    EditPresetPage.prototype.getView = function() {
        return page.views.layoutView;
    }

    EditPresetPage.prototype.init = function(config) {
        console.log("EditPresetPage.init")
        var self = this;

        if(config && config.params) {
            page.currentPreset = config.params;
        }

        listen();
        retrieveData();
        createViews();
    }

    EditPresetPage.prototype.destroy = function() {
        console.log("EditPresetPage.destroy")
        ignore()
        destroyViews();
        destroyData();
    }
    return EditPresetPage;
});
