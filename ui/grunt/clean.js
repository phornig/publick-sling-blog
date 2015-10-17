module.exports = function (grunt) {
  'use strict';

  return {
    'dist': ['<%= dist %>'],
    'vendor-scss': ['<%= src %>/scss/vendor']
  };
};
