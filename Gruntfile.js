/*
 * grunt-ng2-inline
 * https://github.com/m-architek/grunt-ng2-inline
 *
 * Copyright (c) 2016 Marcin Architek
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        ng2_inline: {
            default: {
                expand: true,
                nonull: true,
                dest: 'tmp/default',
                cwd: 'test/fixtures',
                src: 'component.ts'
            },
            base: {
                expand: true,
                flatten: true,
                nonull: true,
                dest: 'tmp/base',
                cwd: 'test',
                src: 'fixtures/component.ts',
                options: {
                    base: 'test/fixtures'
                }
            },
            relative: {
                expand: true,
                nonull: true,
                dest: 'tmp/relative',
                cwd: 'test/fixtures',
                src: 'component.ts',
                options: {
                    relative: true
                }
            },
            compress: {
                expand: true,
                nonull: true,
                dest: 'tmp/compress',
                cwd: 'test/fixtures',
                src: 'component.ts',
                options: {
                    compress: true
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'ng2_inline', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};