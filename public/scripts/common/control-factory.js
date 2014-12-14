/* global define */
define([
    'underscore',
    'hbs!templates/controls/toggle',
    //'hbs!templates/controls/select',
    'hbs!templates/controls/range',
    //'hbs!templates/controls/logRange'
],
function (_, toggle, range/*, select, range, logRange*/) {

    var templates = {
        //Watch out for naming!
        toggle: toggle,
        select: toggle,
        range: range,
        'log-range': range
    },

    templateFactory = function(type) {
        return templates[type];
    };

    return templateFactory;
});
