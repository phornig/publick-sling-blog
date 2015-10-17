module.exports = function (grunt) {
  return {
    options: {
      curly: true,
      eqeqeq: true,
      es3: true,
      immed: true,
      indent: 2,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      unused: false,
      boss: true,
      eqnull: true
    },
    grunt: {
      options: {
        node: true
      },
      src: ['Gruntfile.js', 'grunt/**/*.js']
    },
    js: {
      options: {
        browser: true,
        devel: true,
        globals: {
          $: true,
          window: true
        },
        globalstrict: true
      },
      src: ['<%= src %>/js/main/**/*.js']
    },
    server: {
      options: {
        node: true,
        globals: {
          JSON: true
        }
      },
      src: [
        'server/**/*.js'
      ]
    }
  };
};
