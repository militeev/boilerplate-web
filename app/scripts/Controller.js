define([
    'underscore',
    'backbone.marionette',
    window.applicationName
], function(_, Marionette, app) {
    'use strict';

    return Marionette.Controller.extend({

        initialize: function() {
            console.log('Controller initialized');
        },

        onClose: function() {},

        home: function() {
            this.router.navigate("");
        },

        error: function(header, errorText) {
            this.router.navigate("error");
        }

    });

});
