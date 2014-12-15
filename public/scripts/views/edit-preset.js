define([
    'underscore',
    'backbone',
    'marionette',
    'common/control-factory',
    'hbs!templates/edit-preset'
], function(_, Backbone, Marionette, controlFactory, itemTemplate) {

    var EditPresetView = Marionette.ItemView.extend({
        triggers: {
            'click .js-cancel': 'edit:cancel',
            'click .js-save': 'edit:save',
            'click .js-delete': 'edit:delete'
        },

        initialize: function(options) {
            console.log('options ', options);

            //listen to changes to type?
            this.listenTo(options.type, 'change', this.render);
        },

        render: function() {
            this.$el.html(itemTemplate(this.model.toJSON()));

            //console.log('rendering type fields');

            var html = "",
                values = this.model.get('settings');

            this.fields = _.extend({}, this.options.type.get('fields'));

            _.each(this.fields, function(field, index) {
                var template = controlFactory(field.type);

                field.input = field.label.toLowerCase()
                    .replace(/[\s\/]/gi, '-').replace(/[^\w-]/gi, '');

                if(values) {
                    field.value = values[field.label];
                }

                if(template) {
                    html += template(field);
                }
            });
            $('.js-preset-details', this.$el).append(html);
        },

        serializeForm: function() {
            console.log('serializeForm');
            var self = this,
                settings = this.model.get('settings') || {},
                name = $('input[name=\'name\']', self.$el).val();
            //set the name too!

            _.each(this.fields, function(field, index) {
                settings[field.label] =
                    $('input[name=\'' + field.input + '\']', self.$el).val();
            });

            return { name: name, settings: settings};
        },

        onDestroy: function() {
            this.stopListening();
        }
    });

    return EditPresetView;
});
