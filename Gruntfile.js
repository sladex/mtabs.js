'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        bannerMin: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          'Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>' +
          '<%= pkg.homepage ? " - " + pkg.homepage + " */\\n" : "" %>',

        // Task configuration.
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= banner %>',
            },
            dist: {
                src: ['js/mtabs.js'],
                dest: 'js/mtabs.js',
            },
        },
        uglify: {
            options: {
                banner: '<%= bannerMin %>',
                preserveComments : false
            },
            dist: {
                src: ['js/mtabs.js'],
                dest: 'js/mtabs.min.js'
            }
        },
        watch: {
            js: {
                files: ['js/mtabs.js'],
                tasks: ['uglify']
            }
        },
        jshint: {
            all: ['js/mtabs.js']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
