(function ($) {
  'use strict';

  // Headers mobile navigation menu that shows on click
  $(function () {
    var body = $('body');
    var nav = $('nav.td-navbar').first();
    var mobileMenuBtn = $(nav).find('.navbar-mobile-button').first();

    $(mobileMenuBtn).click(() => {
      mobileMenuBtn.toggleClass("open");

      if (mobileMenuBtn.hasClass("open")) {
        body.addClass('mobile-menu-open');
        nav.addClass('mobile-menu-open');
      } else {
        body.removeClass('mobile-menu-open');
        nav.removeClass('mobile-menu-open');
      }
    })
  });

}(jQuery));
