/**
 * Created by Andrei on 10/10/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.epoxy',
    'backbone.validation'
], function($, _, Backbone, Epoxy, Validation) {
    'use strict';

    var Model = Epoxy.Model.extend({

        idAttribute: 'UUID',

        initialize: function() {
            _.extend(this, Validation.mixin);
        },

        defaults: {
            objectState: 0,
            name: '',
            description: ''
        },

        computeds: {
            isNew: function() {
                return !this.id;
            }
        },

        validation: {
            name: [{
                required: true,
                msg: 'name-empty'
            }, {
                maxLength: 50,
                msg: 'name-too-long'
            }]
        }

    });

    var Collection = Backbone.Collection.extend({

        model: Model

    });

    return {
        Model: Model,
        Collection: Collection
    };

});
