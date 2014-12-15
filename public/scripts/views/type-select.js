define([
    'underscore',
    'backbone',
    'marionette',
    'hbs/handlebars',
    'hbs!templates/select-preset-type'
], function(_, Backbone, Marionette, Handlebars, listTemplate, itemTemplate) {

    var TypeOption = Marionette.ItemView.extend({
        template: Handlebars.compile('<option value="{{_id}}">{{name}}</option>'),

        render: function() {
            this.el = $(this.template(this.model.toJSON()))[0];
        }
    });

    var TypeSelectView = Marionette.CompositeView.extend({
        events: {
            'change .js-preset-select': 'onSelect'
        },

        template: listTemplate,
        childView: TypeOption,
        childViewContainer: '.js-preset-select',

        render: function() {
            Marionette.CompositeView.prototype.render.apply(this, arguments);
            var selected = '<option value="-1" selected>Please Select</option>';
            $('.js-preset-select', this.$el).prepend(selected)

        },
        onSelect: function() {
            this.trigger('select:type', $('.js-preset-select', this.$el).val())
        }
    });

    return TypeSelectView;
});
