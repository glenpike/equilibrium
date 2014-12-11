define([
    'underscore',
    'backbone',
    'marionette',
    'hbs!templates/presets',
    'hbs!templates/preset'
], function(_, Backbone, Marionette, listTemplate, itemTemplate) {

    var PresetItem = Marionette.ItemView.extend({
        template: itemTemplate
    });

    var PresetsList = Marionette.CompositeView.extend({
        template: listTemplate,
        childView: PresetItem,
        childViewContainer: '.js-list'
    });

    return PresetsList;
});
