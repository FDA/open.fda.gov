module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "static/css/style.css": "static/less/style.less"
        }
      }
    },
    minified : {
      files: {
        src: [
        'static/js/*.js'
        ],
        dest: 'static/js/min/'
      },
      options : {
        sourcemap: true,
        allinone: false
      }
    },
    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['static/less/*.less', 'static/bower_components/bootstrap/less/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      js: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['static/js/*.js'],
        tasks: ['minified'],
        options: {
          nospawn: true
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-minified');

  grunt.registerTask('default', ['watch']);
};
