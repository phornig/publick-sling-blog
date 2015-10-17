module.exports = function (grunt) {
  return {
    options: {
      compress: {
        drop_console: false
      },
      preserveComments: 'some',
      report: 'gzip',
      sourceMap: true
    },
    main: {
      src: '<%= dist %>/js/main.js',
      dest: '<%= dist %>/js/main.min.js'
    },
    admin: {
      src: '<%= dist %>/js/admin.js',
      dest: '<%= dist %>/js/admin.min.js'
    },
    bootstrap: {
      src: '<%= dist %>/js/vendor/bootstrap/bootstrap.js',
      dest: '<%= dist %>/js/vendor/bootstrap/bootstrap.min.js'
    },
    metisMenu: {
      src: '<%= dist %>/js/vendor/metisMenu/metisMenu.js',
      dest: '<%= dist %>/js/vendor/metisMenu/metisMenu.min.js'
    },
    angular_bootstrap: {
      src: '<%= dist %>/js/vendor/angular-bootstrap/angular-bootstrap-tpls.js',
      dest: '<%= dist %>/js/vendor/angular-bootstrap/angular-bootstrap-tpls.min.js'
    },
    ng_file_upload: {
      src: '<%= dist %>/js/vendor/ng-file-upload/ng-file-upload.js',
      dest: '<%= dist %>/js/vendor/ng-file-upload/ng-file-upload.min.js'
    },
    sb_admin: {
      src: '<%= dist %>/js/vendor/sb-admin-2/sb-admin-2.js',
      dest: '<%= dist %>/js/vendor/sb-admin-2/sb-admin-2.min.js'
    },
    summernote: {
      src: '<%= dist %>/js/vendor/summernote/summernote.js',
      dest: '<%= dist %>/js/vendor/summernote/summernote.min.js'
    }
  };
};
