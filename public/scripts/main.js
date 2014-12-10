/* global require */
require(['require-config'], function() {

    // require.config({
    //     urlArgs: 'cacheKiller=' + (new Date()).getTime()
    // });

    require([
      'app'
    ],

    function(App) {
        App.start();
    });
});
