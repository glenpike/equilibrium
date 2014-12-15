define([
    'hbs/handlebars'
], function(Handlebars) {

    function isChecked(value, thisValue) {
        return value == thisValue ? ' checked="checked"' : '';
    }

    Handlebars.registerHelper('isChecked', isChecked);

    return isChecked;
});
