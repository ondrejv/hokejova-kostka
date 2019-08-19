module.exports = function (grunt) {

    // Configuration goes here
    grunt.initConfig({
        // *************
        // LESS
        // *************
        less: {
            development: {
                files: {
                    '../assets/css/scoreboard-web.css': '../assets/css/src/scoreboard-web.less',
                }
            },
            live: {
                options: {
                    compress: true,
                    cleancss: true
                },
                files: {
                    '../assets/css/scoreboard-web.min.css': '../assets/css/scoreboard-web.css'
                }
            },
        },
        // *************
        // Watch
        // *************
        watch: {
            development: {
                files: ['../assets/css/src/*.less', '../assets/css/src/*/*.less'],
                tasks: ['less:development', 'less:live', 'csslint'],
            },
            justreload: {
                options: { livereload: true },
                files: ['../assets/js/*.js', '../assets/css/*.css', '../*.html', '../assets/svg/src/*.svg'],
            }
        },
        // *************
        // SVG Min - SVG optimization
        // *************
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: true,
                        removeUselessStrokeAndFill: false
                    }
                ]
            },
            scoreboard: {
                files: [{
                    expand: true,
                    cwd: "../assets/svg/src",
                    src: ['*.svg'],
                    dest: '../assets/svg/src/svgo/'
                }]
            }
        },
        // *************
        // SVG Store - all optimized resources are concatenation
        // *************
        svgstore: {
            options: {
                prefix: 'shape-', // This will prefix each <g> ID
                svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    version: '1.1'
                }
            },
            scoreboard: {
                files: {
                    '../assets/svg/svg-defs.svg': ['../assets/svg/src/svgo/*.svg']
                }
            }
        },
        // *************
        // CSS Linting
        // *************
        csslint: {
            src: ['../assets/css/scoreboard-web.css'],
            options: {
                csslintrc: '.csslintrc'
            }
        },
    });


    // *************
    // Loading tasks
    // *************
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-csslint');


    // *************
    // Tasks registration
    // *************
    grunt.registerTask('default', [
        'svgmin',
        'svgstore',
        'csslint',
        'watch',
    ]);
};
