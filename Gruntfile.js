var path = require('path');

module.exports = function(grunt) {
    'use strict';
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev(['grunt-*', '!grunt-template-*']).forEach(grunt.loadNpmTasks);

    // Configure Grunt 
    grunt.initConfig({

        // grunt-express will serve the files from the folders listed in `bases`
        // on specified `port` and `hostname`
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    bases: [path.resolve(__dirname, '../math-web'), 'app'], // Replace with the directory you want the files served from
                    // Make sure you don't use `.` or `..` in the path as Express
                    // is likely to return 403 Forbidden responses if you do
                    // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
                    livereload: true
                }
            }
        },

        bower: {
            target: {
                rjsConfig: 'app/scripts/config.js'
            }
        },

        // grunt-watch will monitor the projects files
        watch: {
            all: {
                // Replace with whatever file you want to trigger the update from
                // Either as a String for a single entry 
                // or an Array of String for multiple entries
                // You can use globing patterns like `css/**/*.css`
                // See https://github.com/gruntjs/grunt-contrib-watch#files
                files: ['index.html', 'styles/*.css'],
                options: {
                    livereload: true
                }
            },
            //            less: {
            //                files: "app/styles/*.less",
            //                tasks: ["less"]
            //            }
        },

        // grunt-open will open your browser at the project's URL
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.all.options.port%>'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/scripts/**/*.js',
                '!app/scripts/vendor/*',
                'test/spec/**/*.js'
            ]
        },

        jsbeautifier: {
            files: [
                'app/scripts/**/*.js',
                'test/spec/**/*.js',
                '!app/scripts/vendor/*',
                "Gruntfile.js"
            ],
            options: {
                mode: "VERIFY_AND_WRITE",
                //mode: "VERIFY_ONLY",
                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 4,
                    maxPreserveNewlines: 2,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 4
                },
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 2,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },

        jasmine: {
            src: 'app/scripts/**/*.js',
            options: {
                specs: 'test/spec/**/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'app/scripts/config.js',
                    requireConfig: {
                        baseUrl: 'app/scripts',
                        callback: function() {
                            window.doNotStartApp = true;
                            window.applicationName = 'mainApp';
                        }
                    }
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    appDir: "app",
                    baseUrl: "scripts",
                    mainConfigFile: "app/scripts/config.js",
                    skipDirOptimize: false,
                    removeCombined: true,
                    findNestedDependencies: true,
                    dir: "dist",
                    optimize: "uglify2",
                    optimizeCss: "standard",
                    modules: [{
                        name: "main",
                        include: []
                    }],
                    done: function(done, output) {
                        console.log(output);
                    }
                }
            }
        },

        bowercopy: {
            options: {
                // Task-specific options go here
            },
            'backbone.epoxy': {
                files: {
                    'app/libs': 'backbone.epoxy/backbone.epoxy.js'
                }
            },
            'requirejs-text': {
                files: {
                    'app/libs': 'requirejs-text/text.js'
                }
            },
            'jplayer': {
                files: {
                    'app/libs': 'jplayer/jquery.jplayer/*',
                    'app/libs/jplayer-skin': 'jplayer/skin/blue.monday'
                }
            },
            'tinymce': {
                options: {
                    destPrefix: "app/libs/tinymce"
                },
                files: {
                    'tinymce.min.js': 'tinymce/tinymce.min.js',
                    'skins': 'tinymce/skins',
                    'themes': 'tinymce/themes',
                    'plugins': 'tinymce/plugins'
                }
            },
            main: {
                src: ['backgrid:main',
                    'backbone:main',
                    'backbone:main',
                    'backbone.babysitter:main',
                    'backbone.wreqr:main',
                    'backgrid:main',
                    'backgrid-select-all:main',
                    'jquery:main',
                    'marionette:main',
                    'normalize-css:main',
                    'requirejs:main',
                    'underscore:main'
                ],
                dest: 'app/libs'
            }
        }

        //        less: {
        //            development: {
        //                options: {
        //                    paths: ["app/styles"]
        //                },
        //                files: {
        //                    "app/styles/main.css": "app/styles/main.less"
        //                }
        //            }
        //        }

    });

    // Creates the `server` task
    grunt.registerTask('server', [
        'express',
        'open',
        'watch'
    ]);

    grunt.registerTask('default', ['bowercopy', 'jshint']);

    grunt.registerTask('beauty', ['jsbeautifier']);

    grunt.registerTask('test', ['jshint', 'jasmine']);

    //    grunt.registerTask('bowercopy', ['bowercopy']);

};
