module.exports = function(grunt) {

    // Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // Настройка для объединения файлов находится тут
             dist: {
                src: [
                    'js/libs/*.js', // Все JS в папке libs
                ],
                dest: 'js/scripts.js',
                }
        },
        uglify: {
                build: {
                    src: 'js/scripts.js',
                    dest: 'js/scripts.min.js'
                }
            },
        imagemin: {
                dynamic: {
                    files: [{
                        expand: true,
                        cwd: 'img/dev/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'img/'
                    }]
                }
            },
        watch: { 
                options: 
                        { 
                            livereload: true, 
                        },
                scripts: {
                    files: ['js/*.js'],
                    tasks: ['concat', 'uglify'],
                    options: {
                        spawn: false,
                    },
                },
                css: {
                    files: ['less/*.less'],
                    tasks: ['less'],
                    options: {
                        spawn: false,
                            }
                    },
                img: {
                    files: ['img/dev/*'],
                    tasks: ['imagemin'],
                    options: {
                        spawn: false,
                            }                    
                },
                html: {
                    files: ['*.html'],
                    tasks: ['watch'],
                    options: {
                        spawn: false,
                            }
                }
                },
        less: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/styles.css': 'less/global.less'
                }
            }
        }  
    });

    //Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    //Указываем, какие задачи выполняются при запуске grunt
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin','less','watch']);

};