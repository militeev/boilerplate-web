requirejs.config({
    deps: [
        'main'
    ],
    paths: {
        backbone: '../libs/backbone',
        'backbone.babysitter': '../libs/backbone.babysitter',
        'backbone.wreqr': '../libs/backbone.wreqr',
        backgrid: '../libs/backgrid',
        'backgrid.select.all': '../libs/backgrid-select-all',
        jquery: '../libs/jquery',
        'backbone.marionette': '../libs/backbone.marionette',
        requirejs: '../libs/require',
        text: '../libs/text',
        underscore: '../libs/underscore',
        'backbone.epoxy': '../libs/backbone.epoxy',
        'backbone.validation': '../libs/backbone-validation-amd',
        'jplayer': '../libs/jquery.jplayer',
        'tpl': '../templates'
    },
    shim: {
        'backgrid': {
            deps: ['backbone', 'underscore', 'jquery'],
            exports: 'Backgrid'
        },
        'backgrid.select.all': {
            deps: ['backgrid', 'backbone', 'underscore', 'jquery']
        }
    },
    packages: [

    ]
});
