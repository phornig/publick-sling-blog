module.exports = function (grunt) {
  'use strict';

  return {
    all: [
      '<%= src %>/scss/**/*.scss',
      '!<%= src %>/scss/vendor/**/*.scss'
    ],
    options: {
      config: '.scsslint.yml'
    }
  };
};
