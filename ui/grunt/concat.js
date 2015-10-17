module.exports = function (grunt) {
  return {
    main: {
      src: '<%= src %>/js/main/**/*.js',
      dest: '<%= dist %>/js/main.js'
    },
    admin: {
      src: '<%= src %>/js/admin/**/*.js',
      dest: '<%= dist %>/js/admin.js'
    }
  };
};
