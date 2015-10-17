/**
 * Logout of the system
 */
$(function () {
  var path;

  $('.logout').click(function (e) {
    e.preventDefault();

    path = this.href;
    $.post('j_security_check', {
      j_username: '-',
      j_password: '-',
      j_validate: true
    }).always(function (data) {
      if (data.status === 403 || data.status === 404) {
        window.location = path;
      }
    });
  });
});
