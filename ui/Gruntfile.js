/*global module:false*/
module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    init: true,
    data: {
      name: 'publick-sling-blog',
      dist: 'src/main/resources/jcr_root/etc/clientlibs/publick',
      src: 'assets'
    }
  });

  grunt.registerTask('default', ['clean', 'bowercopy', 'scss', 'js', 'jsonlint:models']);

  grunt.registerTask('dev', ['default', 'express:dev', 'watch']);

  grunt.registerTask('scss', ['scsslint', 'sass']);
  grunt.registerTask('js', ['jscs', 'jshint', 'concat', 'uglify']);
};
