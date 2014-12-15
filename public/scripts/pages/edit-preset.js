define([
    'underscore',
    'backbone',
    'marionette',
    'views/edit-preset',
    'views/type-select',
    'hbs!templates/edit-preset-page'

], function(_, Backbone, Marionette, EditPresetView, TypeSelectView, template) {

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


    function handleSave() {
        //serialise form
        var values = page.views.editPresetView.serializeForm();

        console.log('serialize form ', values);

        console.log("_id? ", page.models.preset.idAttribute )

        page.models.preset.set('name', values.name, {silent: true});
        page.models.preset.set('settings', values.settings, {silent: true});

        page.models.preset.save({
            success: function(model, response, options) {
                console.log('model saved ', arguments)
            },
            error: function(model, response, options) {
                console.log('error saving model ', arguments)
            }
        })
    }

    function handleCancel() {
        Backbone.history.history.back();
    }
    function handleDelete() {
        page.models.preset.destroy({
            success: function(model, response, options) {
                console.log('model deleted ', arguments)
            },
            error: function(model, response, options) {
                console.log('error deleting model ', arguments)
            }
        });
    }

    function handleSelect(type) {
        console.log('handleSelect', arguments)
        //Swap the views around
        if("-1" != type) {
            //update the model.
            page.models.preset.set('_type', type);

            //Swap the views...
            page.stopListening(page.views.editPresetView);
            createEditView();
            page.views.layoutView.presetView.show(page.views.editPresetView);
        }
    }

    function listen() {
        page.routeChannel = Backbone.Radio.channel('route');
    }

    function updateType() {
        page.models.type = page.dataChannel.request('type',
            page.models.preset.get('_type'));
    }

    function retrieveData() {
        page.dataChannel = Backbone.Radio.channel('data');

        if('new' != page.currentPreset) {
            page.models.preset = page.dataChannel.request('preset', page.currentPreset);
        } else {
            //Add proper model later?
            page.collections.types = page.dataChannel.request('types');
            page.models.preset = new Backbone.Model();
            page.models.preset.urlRoot = 'presets';
            var user = page.dataChannel.request('user')
            //set the user!
            page.models.preset.set('_user', user.id);
        }

        page.listenTo(page.models.preset, 'change', updateType);

        if(page.models.preset.get('_type')) {
            updateType()
        }
    }

    function createEditView() {
        page.views.editPresetView = new EditPresetView({
            model: page.models.preset,
            type: page.models.type
        });
        page.listenTo(page.views.editPresetView, 'edit:save', handleSave);
        page.listenTo(page.views.editPresetView, 'edit:cancel', handleCancel);
        page.listenTo(page.views.editPresetView, 'edit:delete', handleDelete);
    }

    function createSelectView() {
        page.views.editPresetView = new TypeSelectView({
            collection: page.collections.types
        });
        page.listenTo(page.views.editPresetView, 'select:type', handleSelect);
    }

    function createViews() {
        page.views.layoutView = new LayoutView();

        if('new' != page.currentPreset) {
            createEditView();
        } else {
            createSelectView();
        }

        page.listenTo(page.views.editPresetView, 'edit:delete', handleDelete);

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
