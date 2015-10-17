module.exports = function (grunt) {
  'use strict';

  return {
    options: {
      clean: false
    },
    jquery: {
      files: {
        '<%= dist %>/js/vendor/jquery': 'jquery/dist'
      }
    },
    bootstrap_css: {
      files: {
        '<%= src %>/scss/vendor/bootstrap': 'bootstrap-sass/assets/stylesheets/*'
      }
    },
    bootstrap_js: {
      files: {
        '<%= dist %>/js/vendor/bootstrap/bootstrap.js': 'bootstrap-sass/assets/javascripts/bootstrap.js'
      }
    },
    bootstrap_fonts: {
      files: {
        '<%= dist %>/fonts/bootstrap': 'bootstrap-sass/assets/fonts/bootstrap/*'
      }
    },
    metisMenu_css: {
      files: {
        '<%= dist %>/css/vendor/metisMenu/metisMenu.css': 'metisMenu/dist/metisMenu.css',
        '<%= dist %>/css/vendor/metisMenu/metisMenu.min.css': 'metisMenu/dist/metisMenu.min.css'
      }
    },
    metisMenu_js: {
      files: {
        '<%= dist %>/js/vendor/metisMenu/metisMenu.js': 'metisMenu/dist/metisMenu.js'
      }
    },
    fontawesome_css: {
      files: {
        '<%= src %>/scss/vendor/fontawesome': 'font-awesome/scss/*'
      }
    },
    fontawesome_fonts: {
      files: {
        '<%= dist %>/fonts': 'font-awesome/fonts/*'
      }
    },
    startbootstrap_sb_admin_2_css: {
      files: {
        '<%= dist %>/css/vendor/sb-admin-2': 'startbootstrap-sb-admin-2/dist/css/*'
      }
    },
    startbootstrap_sb_admin_2_js: {
      files: {
        '<%= dist %>/js/vendor/sb-admin-2/sb-admin-2.js': 'startbootstrap-sb-admin-2/dist/js/sb-admin-2.js'
      }
    },
    summernote_css: {
      files: {
        '<%= src %>/scss/vendor/summernote': 'summernote/src/sass/*'
      }
    },
    summernote_js: {
      files: {
        '<%= dist %>/js/vendor/summernote/summernote.js': 'summernote/dist/summernote.js'
      }
    },
    angular: {
      files: {
        '<%= dist %>/js/vendor/angular/angular.js': 'angular/angular.js',
        '<%= dist %>/js/vendor/angular/angular.min.js': 'angular/angular.min.js',
        '<%= dist %>/js/vendor/angular/angular.min.js.map': 'angular/angular.min.js.map'
      }
    },
    angular_bootstrap: {
      files: {
        '<%= dist %>/js/vendor/angular-bootstrap/angular-bootstrap-tpls.js': 'angular-bootstrap/ui-bootstrap-tpls.js'
      }
    },
    ng_file_upload: {
      files: {
        '<%= dist %>/js/vendor/ng-file-upload/ng-file-upload.js': 'ng-file-upload/ng-file-upload.js'
      }
    }
  };
};
