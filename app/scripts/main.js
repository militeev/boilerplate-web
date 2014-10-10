require([
    'jquery',
    'backbone',
    'mainApp'
], function($, Backbone, app) {
    'use strict';

    window.beforeAppStarted && window.beforeAppStarted();

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    if (!window.doNotStartApp) {
        app.start();
    }

    console.log('app started!');

});
