module.exports = function (grunt) {
  return {
    options: {
      livereload: true,
      spawn: false
    },
    data: {
      files: ['data/**/*.json'],
      tasks: ['jsonlint:models']
    },
    express: {
      files: ['server/**/*.js'],
      tasks: ['jscs:server', 'jshint:server', 'express:dev']
    },
    grunt: {
      files: ['Gruntfile.js', 'grunt/**/*.js'],
      tasks: ['newer:jscs:grunt', 'newer:jshint:grunt']
    },
    js: {
      files: ['<%= src %>/js/main/**/*.js', '<%= src %>/js/admin/**/*.js'],
      tasks: ['newer:jscs:js', 'newer:jshint:js', 'concat', 'newer:uglify']
    },
    sass: {
      files: ['<%= src %>/scss/**/*.scss'],
      tasks: ['newer:scsslint', 'sass']
    },
    views: {
      files: ['src/main/resources/**/*.hbs']
    }
  };
};
