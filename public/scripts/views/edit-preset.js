define([
    'underscore',
    'backbone',
    'marionette',
    'common/control-factory',
    'hbs!templates/edit-preset'
], function(_, Backbone, Marionette, controlFactory, itemTemplate) {


    //Need a factory in here for rendering the "controls"
    //based on the type of the preset...
    var EditPresetView = Marionette.ItemView.extend({
        //template: itemTemplate,

        initialize: function(options) {
            console.log('options ', options);

            //listen to changes to type!
            this.listenTo(options.type, 'change', this.render);
        },

        render: function() {
            this.$el.html(itemTemplate(this.model.toJSON()));

            console.log('rendering type fields');

            var self = this,
                fields = this.options.type.get('fields');
            _.each(fields, function(field, index) {
                //factory?
                console.log('field ', field);
                var template = controlFactory(field.type);

                if(template) {
                    var html = template(field);
                    $('.js-preset-details', self.$el).append(html);

                }
            });
        },

        onDestroy: function() {
            this.stopListening();
        }
    });

    return EditPresetView;
});
