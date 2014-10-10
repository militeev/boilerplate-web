define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.marionette'
], function($, _, Backbone, Marionette) {
    'use strict';

    var Application = Marionette.Application;
    var app = new Application();

    app.addRegions({
        layoutRegion: "#boilerplate-layout"
    });

    function initializeLayout() {
        console.log("Initializing layout");
    }

    // An init function for your main application object
    app.addInitializer(function() {
        this.root = '/';
    });

    // Add as many of these as you like
    app.addInitializer(function() {
        require(['Router', 'Controller'], function(Router, Controller) {
            app.controller = new Controller();
            app.router = new Router({
                controller: app.controller
            });
            app.controller.app = app;
            app.controller.router = app.router;
            app.router.on("route", app.controller.onRoute, app.controller);
            app.routerInitialized = true;
            app.trigger("router:initialized");
        });
    });

    app.on('router:initialized', initializeLayout);

    app.back = function() {
        window.history.back();
    };

    // Return the instantiated app (there should only be one)
    return app;

});
