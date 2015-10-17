module.exports = function (grunt) {
  'use strict';

  return {
    options: {
      quiet: true,
      sourcemap: 'inline',
      unixNewlines: true,
      trace: true
    },
    all: {
      options: {
        style: 'compressed'
      },
      files: {
        '<%= dist %>/css/style.css': '<%= src %>/scss/style.scss',
        '<%= dist %>/css/admin.css': '<%= src %>/scss/admin.scss'
      }
    }
  };
};
