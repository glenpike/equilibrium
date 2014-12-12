define([
    'underscore',
    'backbone',
    'marionette',
    'hbs!templates/preset-detail',
    'hbs!templates/preset-detail-setting'

], function(_, Backbone, Marionette,
    detailTemplate, settingTemplate) {

    var PresetDetail = Marionette.ItemView.extend({
        template: detailTemplate,
        initialize: function() {
            console.log('initialize ', arguments)
        },
        render: function() {
            if(!this.model) {
                return;
            }
            console.log('this.model ', this.model)
            var data = this.model.toJSON();
            this.$el.html(detailTemplate(data));

            //render each item..
            var html = '';
            _.each(data.settings, function(value, key){
                //console.log('setting ', arguments);
                html += settingTemplate({key:key, value: value});
            });
            $('.js-preset-details', this.$el).append(html);
        }
    });

    return PresetDetail;
});
