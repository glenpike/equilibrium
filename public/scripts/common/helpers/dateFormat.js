define([
    'hbs/handlebars',
    'moment'
], function(Handlebars, moment) {

    function dateFormat(context, block) {
        var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
        return moment(context).format(f);
    }

    Handlebars.registerHelper('dateFormat', dateFormat);

    return dateFormat;
});
