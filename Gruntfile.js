module.exports = function(grunt) {

  grunt.initConfig({
    appDir: 'src',
    distFolder: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'vendor/jquery/dist/jquery.js',
          '<%= appDir %>/js/{,*/}*.js'
        ],
        dest: '<%= distFolder %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= appDir %>/js/{,*/}*.js'
      ]
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
      options: {
        spawn: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};